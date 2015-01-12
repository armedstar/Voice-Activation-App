includeJS("js/view/components/UIComponent.js");
includeJS("js/view/components/Shell.js");
includeJS("js/model/RAFInputProxy.js");
includeJS("js/model/RAFVO.js");

RAFProxy.prototype = new puremvc.Proxy;

RAFProxy.NAME = "rafProxy";
RAFProxy.REQUEST_ID_MAX = 64;

RAFProxy.prototype.vo = null;
RAFProxy.prototype.obj = null;
RAFProxy.prototype.request_map = null;
RAFProxy.prototype.callback_map = null;
RAFProxy.prototype.next_request_id = 0;
RAFProxy.prototype.connected = false;

RAFProxy.prototype.onConnected = null;
RAFProxy.prototype.onDisconnected = null;

function RAFProxy()
{
    puremvc.Proxy.apply(this, [RAFProxy.NAME, new Array()]);
    this.request_map = new Array();
    this.callback_map = new Array();
    this.next_request_id = 0;
    this.connected = false;
}

RAFProxy.prototype.connect = function(address, port)
{
    var url = "ws://" + address + ":" + port;
    var socket = new window.plugins.websocket(url);
    
    socket.onopen = Relegate.create(this, this.onSocketOpen, this);
    socket.onmessage = Relegate.create(this, this.onSocketMessage, this);
    socket.onclose = Relegate.create(this, this.onSocketClose);
    socket.onerror = Relegate.create(this, this.onSocketError);
    
    
    this.vo = new RAFVO(socket, address, port);
}

RAFProxy.prototype.disconnect = function()
{
    console.log("RAFProxy.disconnect():");
    
    if (this.vo != null && this.vo.socket != null && this.connected)
    {
        console.log("RAFProxy.disconnect(): attempting to disconnect socket");
        this.vo.socket.close();
    }
    else
    {
        this.cleanupSocket();
        
        if (this.onDisconnected != null)
        {
            this.onDisconnected();
        }
    }
}

RAFProxy.prototype.onSocketOpen = function()
{
    console.log("RAFProxy.onSocketOpen called with arguments length " + arguments.length);
    if (arguments.length < 1)
        return;
    
    var proxy = arguments[0];
    proxy.connected = true;
    
    if (proxy.onConnected != null)
    {
        proxy.onConnected();
    }
}

RAFProxy.prototype.onSocketClose = function()
{
    console.log("RAFProxy.onSocketClose: socket closed");
    
    var proxy = this;
    proxy.connected = false;
    
    proxy.cleanupSocket();
    
    if (proxy.onDisconnected != null)
    {
        proxy.onDisconnected();
    }
}

RAFProxy.prototype.cleanupSocket = function()
{
    console.log("RAFProxy.cleanupSocket: cleaning up socket");
    
    if (this.vo != null && this.vo.socket != null)
    {
        this.vo.socket.onopen = null;
        this.vo.socket.onmessage = null;
        this.vo.socket.onclose = null;
        this.vo.socket.onerror = null;
        
        this.vo.socket = null;
        this.vo = null;
    }
}

RAFProxy.prototype.onSocketMessage = function(evt)
{
    var received_msg = evt.data;
    var updated_msg = received_msg.replace('<?xml version="1.0" encoding="UTF-8"?>', "");
    
    console.log('RAFProxy.onmessage(): msg = ' + updated_msg);
    
    var msg_id = this.unmaskRequestId(this.getMsgId(updated_msg));
    
    console.log('RAFProxy.onmessage(): msg_id = ' + msg_id);
    
    // lookup the original request by id and then remove it from the map     
    var requestInfo = this.request_map[msg_id];
    if (requestInfo != null)
    {
        this.request_map[msg_id] = null;
        
        requestInfo.callback(updated_msg, requestInfo.context);
    }    
    else
    {
        var request = this.getRequest(updated_msg);
        for(var i=0;i<this.callback_map.length;i++)
        {
            if(this.callback_map[i].request == request)
            {
                this.callback_map[i].callback(updated_msg, this);
                break;
            }
        }
    }
}

RAFProxy.prototype.onSocketError = function()
{
    var proxy = this.obj;
    proxy.connected = false;
    console.log("Error connecting to RAF instance at " + this.vo.address + ":" + this.vo.port);
}

RAFProxy.prototype.sendRafMessage = function(type, msg, callback, context)
{
    var requestId = this.getNextRequestId();
    console.log('RAFProxy.sendRafMessage(): requestId = ' + requestId);
    var unmaskedRequestId = this.unmaskRequestId(requestId);
    console.log('RAFProxy.sendRafMessage(): unmaskedRequestId = ' + unmaskedRequestId);
    this.request_map[unmaskedRequestId] = { callback:callback, context:context };
    
    var request_str;
    if (type == "http_request")
    {
        request_str = "<system_request system_msg_id='" + requestId + "'> <http_request http_verb='GET' url='" + msg + "' http_headers='none' body='none' start_cookie_session='none'> </http_request> </system_request>";
    }
    else if(type == "command_service_request")
    {
        request_str = "<system_request system_msg_id='" + requestId + "'> <command_service_request>";
        request_str += msg;
        request_str += "</command_service_request> </system_request>";
    }
    this.vo.socket.send(request_str);
}

RAFProxy.prototype.getNextRequestId = function()
{
    var id = this.next_request_id;
    
    if (this.next_request_id++ > RAFProxy.REQUEST_ID_MAX)
        this.next_request_id = 0;
    
    return ( ((new Date()).getTime() & 0xFFFFC0) << 6) | id;
}

RAFProxy.prototype.unmaskRequestId = function(id)
{
    return (id & 0x3F);
}

RAFProxy.prototype.isConnected = function()
{
    return this.connected;
}

RAFProxy.prototype.getMsgId = function(msg)
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(msg, "text/xml");
    var xmlElement = xmlDoc.getElementsByTagName("system_response")[0];
    var msg_id = xmlElement.getAttribute('system_msg_id');
    if (parser) delete parser;
    return msg_id;
}

RAFProxy.prototype.registerCallback = function(requestType, callback)

{
    var i = 0;
    var found = false;
    for(i=0;i<this.callback_map.length;i++)
    {
        if(this.callback_map[i].request == requestType)
        {
            this.callback_map[i].callback = callback;
            found = true;
            break; 
        }
    }
    if (false == found)
    {
        this.callback_map.push({request:requestType, callback:callback});
    }
}

RAFProxy.prototype.getRequest = function(response)
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(response, "text/xml");
    var xmlElement = xmlDoc.getElementsByTagName("success_response")[0];
    var resItemNodes = xmlElement.childNodes;
    var request = resItemNodes.item(0).nodeName;
    if (parser) delete parser;
    return request;
}
