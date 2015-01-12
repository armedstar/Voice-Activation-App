includeJS("js/model/RAFProxy.js");

ResetSystemCommand.prototype = new puremvc.SimpleCommand;

ResetSystemCommand.INITIAL_RECEIVE_CHANNEL = "55";

function ResetSystemCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

ResetSystemCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("ResetSystemCommand.execute(): notification = " + notification);
    console.log("ResetSystemCommand.execute(): type = " + notification.getType());
    console.log("ResetSystemCommand.execute(): body = " + notification.getBody());  
    
    var inputProxy = this.facade.retrieveProxy(RAFInputProxy.NAME);
    
    if (notification.getType() == "init")
    {
        if (inputProxy)
            inputProxy.init();
    }
    else if (notification.getType() == "send")
    {
        console.log("ResetSystemCommand.execute(): Resetting system [START]");
        
        var queueProxy = this.facade.retrieveProxy(QueueProxy.NAME);
        var recordProxy = this.facade.retrieveProxy(RecordManagerProxy.NAME);
        var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
        var drawerMediator = this.facade.retrieveMediator(DrawerMediator.NAME);
        var inputProxy = this.facade.retrieveProxy(RAFInputProxy.NAME);
        
        // TODO: [WK] Clear other system items, as necessary (i.e. queue, etc.)
            
        console.log("ResetSystemCommand.execute():    Resetting client UI [START]");
        
        shellMediator.showOnTV(false);
        drawerMediator.clearCommands();
        shellMediator.clearStatus();
        queueProxy.clearAll();
        recordProxy.clearAllRecordings();
        
        console.log("ResetSystemCommand.execute():    Resetting client UI [END]");
        
        console.log("ResetSystemCommand.execute():    Resetting server UI [START]");
        
        // Clear server-side content
        if (inputProxy != null)
        {
            //inputProxy.sendNavigationEventInputCommand(RAFInputProxy.NAVIGATION_COMMAND_EXIT);
            //inputProxy.sendQueueEventInputCommand_RemoveAllEntities();
            //inputProxy.sendRemoveBookmarkInputCommand_RemoveAllBookmarks();
            //inputProxy.sendChangeChannelInputCommand_ChangeChannelByReceiveChannel(ResetSystemCommand.INITIAL_RECEIVE_CHANNEL);
            
            inputProxy.sendResetEventInputCommand();
        }
        
        console.log("ResetSystemCommand.execute():    Resetting server UI [END]");
        
        console.log("ResetSystemCommand.execute(): Resetting system [END]");
    }
}

