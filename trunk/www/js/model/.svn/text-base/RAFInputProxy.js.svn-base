RAFInputProxy.prototype = new puremvc.Proxy;
RAFInputProxy.NAME = "RAFInputProxy";

RAFInputProxy.NAVIGATION_COMMAND_NONE = -1;
RAFInputProxy.NAVIGATION_COMMAND_SELECT = 0;
RAFInputProxy.NAVIGATION_COMMAND_LEFT = 37;
RAFInputProxy.NAVIGATION_COMMAND_RIGHT = 39;
RAFInputProxy.NAVIGATION_COMMAND_UP = 38;
RAFInputProxy.NAVIGATION_COMMAND_DOWN = 40;
RAFInputProxy.NAVIGATION_COMMAND_A = 1003;
RAFInputProxy.NAVIGATION_COMMAND_B = 1004;
RAFInputProxy.NAVIGATION_COMMAND_C = 1005;
RAFInputProxy.NAVIGATION_COMMAND_PLAY = 1006;
RAFInputProxy.NAVIGATION_COMMAND_PAUSE = 1007;
RAFInputProxy.NAVIGATION_COMMAND_STOP = 1008;
RAFInputProxy.NAVIGATION_COMMAND_RECORD = 1009;
RAFInputProxy.NAVIGATION_COMMAND_NEXT = 1010;
RAFInputProxy.NAVIGATION_COMMAND_PREVIOUS = 1011;
RAFInputProxy.NAVIGATION_COMMAND_EXIT = 1012;
RAFInputProxy.NAVIGATION_COMMAND_BACK = 1001;
RAFInputProxy.NAVIGATION_COMMAND_MENU = 1000;
RAFInputProxy.NAVIGATION_COMMAND_GUIDE = 1014;
RAFInputProxy.NAVIGATION_COMMAND_INFO = 1002;
RAFInputProxy.NAVIGATION_COMMAND_DVR = 1015;

RAFInputProxy.NAVIGATION_COMMAND_PLAY_TRAILER = 2000;
RAFInputProxy.NAVIGATION_COMMAND_PLAY_CONTENT = 2001;

function RAFInputProxy()
{
    puremvc.Proxy.apply(this, [RAFInputProxy.NAME, new Array()] );
}

RAFInputProxy.prototype.init = function()
{
    this.facade.retrieveProxy(RAFProxy.NAME).registerCallback("command_service_response", this.onInputCommandReceived);
}

RAFInputProxy.prototype.sendInputCommand = function(inputCommand, data)
{
    var rafProxy = this.facade.retrieveProxy(RAFProxy.NAME);
    
    if (rafProxy && rafProxy.connected)
    {
        var request;
        if (data)
        {
            request = "<input command='" + inputCommand + "'>" + data + "</input>";
        }
        else
        {
            request = "<input command='" + inputCommand + "'></input>";
        }
        rafProxy.sendRafMessage("command_service_request", request, this.onInputCommandResponse, this);
    }
    else
    {
        console.log("RAFInputProxy.sendInputCommand(): RAFProxy unavailable or not connected");
    }
}

RAFInputProxy.prototype.onInputCommandReceived = function(msg, obj)
{
    console.log("RAFInputProxy.onInputCommandReceived():");
    console.log("RAFInputProxy.onInputCommandReceived(): msg = " + msg);
}

RAFInputProxy.prototype.onInputCommandResponse = function(msg, obj)
{
    console.log("RAFInputProxy.onInputCommandResponse():");
    console.log("RAFInputProxy.onInputCommandResponse(): msg = " + msg);
}

RAFInputProxy.prototype.sendResetEventInputCommand = function()
{
    console.log("RAFInputProxy.sendResetEventInputCommand()");
    
    this.sendInputCommand("resetEvent", "<resetAll />");
}

RAFInputProxy.prototype.sendNavigationEventInputCommand = function(eventCode)
{
    console.log("RAFInputProxy.sendNavigationEventInputCommand(): eventCode = " + eventCode);
            
    if ((eventCode != null) && (eventCode != RAFInputProxy.NAVIGATION_COMMAND_NONE))
    {
        this.sendInputCommand("navEvent", "<eventCode>" + eventCode + "</eventCode>");
    }
}

RAFInputProxy.prototype.sendChangeChannelInputCommand_ChangeChannelByReceiveChannel = function(receiveChannel)
{
    console.log("RAFInputProxy.sendChangeChannelInputCommand_ChangeChannelByReceiveChannel(): receiveChannel = " + receiveChannel);
    
    if ((receiveChannel != null) && (receiveChannel.length > 0))
    {
        this.sendInputCommand("changeChannel", "<receiveChannel>" + receiveChannel + "</receiveChannel>");
    }
}

RAFInputProxy.prototype.sendChangeChannelInputCommand_ChangeChannelByChannelName = function(channelName)
{
    console.log("RAFInputProxy.sendChangeChannelInputCommand_ChangeChannelByChannelName(): channelName = " + channelName);
    
    if ((channelName != null) && (channelName.length > 0))
    {
        this.sendInputCommand("changeChannel", "<channelName>" + channelName + "</channelName>"); 
    }
}

RAFInputProxy.prototype.sendRemoveBookmarkInputCommand_RemoveBookmarks = function(entityList)
{
    console.log("RAFInputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks():");
    
    if (entityList)
    {
        console.log("RAFInputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks(): Removing bookmarks: [START]");
        
        var bookmarks = "";
        
        for (var i in entityList)
        {
            var entityData = entityList[i];
            
            var entityId = entityData.entityId;
            var entityType = entityData.entityType;
            var entityName = entityData.entityName;
            
            console.log("RAFInputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks():    Removing bookmark: [START]");
            console.log("RAFInputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks():       entityId = " + entityId);
            console.log("RAFInputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks():       entityType = " + entityType);
            console.log("RAFInputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks():       entityName = " + entityName);
            console.log("RAFInputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks():    Removing bookmark: [END]");
            
            bookmarks += "<bookmark id='" + entityId + "' type='" + entityType + "' name='" + entityName + "' />";
        }
        
        this.sendInputCommand("removeBookmarks", bookmarks);
        
        console.log("RAFInputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks(): Removing bookmarks: [END]");
    }
}

RAFInputProxy.prototype.sendRemoveBookmarkInputCommand_RemoveAllBookmarks = function()
{
    this.sendInputCommand("removeBookmarks", "<removeAll />");
}

RAFInputProxy.prototype.sendQueueEventInputCommand_Display = function()
{
    console.log("RAFInputProxy.sendQueueEventInputCommand_Display():");
    
    this.sendInputCommand("queueEvent", "<display />");
}

RAFInputProxy.prototype.sendQueueEventInputCommand_Play = function()
{
    console.log("RAFInputProxy.sendQueueEventInputCommand_Play():");
    
    this.sendInputCommand("queueEvent", "<play />");
}

RAFInputProxy.prototype.sendQueueEventInputCommand_RemoveAllEntities = function()
{
    console.log("RAFInputProxy.sendQueueEventInputCommand_RemoveAllEntities():");
    
    this.sendInputCommand("queueEvent", "<removeAllEntities />");
}

RAFInputProxy.prototype.sendQueueEventInputCommand_AddEntities = function(entityList)
{
    console.log("RAFInputProxy.sendQueueEventInputCommand_AddEntities():");
    
    if (entityList && entityList.length > 0)
    {
        console.log("RAFInputProxy.sendQueueEventInputCommand_AddEntities(): Adding entities: [START]");
        
        this.sendInputCommand("queueEvent", this.__generateQueueChangeEventXML("addEntities", "Adding entity", entityList));
        
        console.log("RAFInputProxy.sendQueueEventInputCommand_AddEntities(): Adding entities: [END]");
    }
}

RAFInputProxy.prototype.sendQueueEventInputCommand_RemoveEntities = function(entityList)
{
    console.log("RAFInputProxy.sendQueueEventInputCommand_RemoveEntities():");
    
    if (entityList && entityList.length > 0)
    {
        console.log("RAFInputProxy.sendQueueEventInputCommand_RemoveEntities(): Removing entities: [START]");
        
        this.sendInputCommand("queueEvent", this.__generateQueueChangeEventXML("removeEntities", "Removing entity", entityList));
        
        console.log("RAFInputProxy.sendQueueEventInputCommand_RemoveEntities(): Removing entities: [END]");
    }
}

RAFInputProxy.prototype.__generateQueueChangeEventXML = function(eventName, logText, entityList)
{
    var eventXML = "<" + eventName + ">";
    
    for (var i=0; i < entityList.length; i++)
    {
        var entityData = entityList[i];
        
        var entityId = entityData.entityId;
        var entityType = entityData.entityType;
        var entityName = entityData.entityName;
        
        console.log("RAFInputProxy.__generateQueueChangeEventXML():    " + logText + ": [START]");
        console.log("RAFInputProxy.__generateQueueChangeEventXML():       entityId = " + entityId);
        console.log("RAFInputProxy.__generateQueueChangeEventXML():       entityType = " + entityType);
        console.log("RAFInputProxy.__generateQueueChangeEventXML():       entityName = " + entityName);
        console.log("RAFInputProxy.__generateQueueChangeEventXML():    " + logText + ": [END]");
        
        eventXML += "<entity id='" + entityId + "' type='" + entityType + "' name='" + entityName + "' />";
    }
    
    eventXML += "</" + eventName + ">";
    
    return eventXML;
}
