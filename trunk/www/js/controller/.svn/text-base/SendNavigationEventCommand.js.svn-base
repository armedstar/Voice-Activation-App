includeJS("js/model/RAFProxy.js");

SendNavigationEventCommand.prototype = new puremvc.SimpleCommand;

function SendNavigationEventCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

SendNavigationEventCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("SendNavigationEventCommand.execute(): notification = " + notification);
    console.log("SendNavigationEventCommand.execute(): type = " + notification.getType());
    console.log("SendNavigationEventCommand.execute(): body = " + notification.getBody());  
    
    var inputProxy = this.facade.retrieveProxy(RAFInputProxy.NAME);
    
    if (notification.getType() == "init")
    {
        if (inputProxy)
            inputProxy.init();
    }
    else if (notification.getType() == "send")
    {
        if (notification.getBody())
        {
            var eventCode = notification.getBody().eventCode;
            
            console.log("SendNavigationEventCommand.execute(): eventCode = " + eventCode);
            
            if (inputProxy != null)
            {
                inputProxy.sendNavigationEventInputCommand(eventCode);
            }
        }
    }
}

