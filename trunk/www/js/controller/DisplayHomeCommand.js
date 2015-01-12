includeJS("js/model/RAFProxy.js");

DisplayHomeCommand.prototype = new puremvc.SimpleCommand;

function DisplayHomeCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayHomeCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("DisplayHomeCommand.execute(): notification = " + notification);
    console.log("DisplayHomeCommand.execute(): type = " + notification.getType());
    console.log("DisplayHomeCommand.execute(): body = " + notification.getBody());  
    
    if (notification.getType() == "init")
    {
        // Noop
    }
    else if (notification.getType() == "send")
    {
        console.log("DisplayHomeCommand.execute(): Resetting to 'home' view");
        
        var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
        shellMediator.showOnTV(false);
    }
}

