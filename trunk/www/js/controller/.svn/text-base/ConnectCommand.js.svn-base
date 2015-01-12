includeJS("js/model/RAFProxy.js");

ConnectCommand.prototype = new puremvc.SimpleCommand;

function ConnectCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

ConnectCommand.prototype.execute = function(notification)
{
    console.log("ConnectCommand executing");
    
    var disconnectProxy = false;
    
    //initialize connection to RAF
    var descProxy = this.facade.retrieveProxy(RAFProxy.NAME);
    if (descProxy == null)
    {
        descProxy = new RAFProxy();
        this.facade.registerProxy(descProxy);
    }
    else
    {
        disconnectProxy = true;
    }
    
    var inputProxy = this.facade.retrieveProxy(RAFInputProxy.NAME);
    if (inputProxy == null)
    {
        this.facade.registerProxy(new RAFInputProxy());
    }
    
    if (disconnectProxy)
    {
        console.log("ConnectCommand.execute(): Attempting to disconnect RAFProxy");
        descProxy.onDisconnected = Relegate.create(this, this.onRAFProxyDisconnected);
        descProxy.disconnect();
    }
    else
    {
        console.log("ConnectCommand.execute(): Attempting to connect RAFProxy");
        this.connectRAFProxy();
    }
}

ConnectCommand.prototype.onRAFProxyDisconnected = function()
{
    console.log('ConnectCommand.onRAFProxyDisconnected(): RAFProxy disconnected');
    
    var descProxy = this.facade.retrieveProxy(RAFProxy.NAME);
    if (descProxy != null)
    {
        descProxy.onDisconnected = null;
    }
    
    this.connectRAFProxy();
}

ConnectCommand.prototype.connectRAFProxy = function()
{
    console.log('ConnectCommand.connectRAFProxy(): Triggering RAFProxy connection');
                            
    window.plugins.ApplicationPreferences.get('raf_addr', Relegate.create(this, this.getRAFAddrCallback), function() {console.log('Unable to get value for RAF Address from Application Preferences.')});
}

ConnectCommand.prototype.getRAFAddrCallback = function(result) 
{
    console.log('ConnectCommand.connectRAFProxy(): Triggering RAFProxy connection: connection info = ' + result);
                            
    var addr_arr = result.split(":");
    if (addr_arr && (addr_arr.length == 2)) {
        console.log('Attempting to connect to ' + addr_arr[0] + ':' + addr_arr[1]);
        var descProxy = this.facade.retrieveProxy(RAFProxy.NAME);
        descProxy.connect(addr_arr[0], addr_arr[1]);
    }
}