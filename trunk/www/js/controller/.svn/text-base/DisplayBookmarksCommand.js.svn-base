includeJS("js/model/RAFProxy.js");

DisplayBookmarksCommand.prototype = new puremvc.SimpleCommand;

function DisplayBookmarksCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayBookmarksCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("DisplayBookmarksCommand.execute(): notification = " + notification);
    console.log("DisplayBookmarksCommand.execute(): type = " + notification.getType());
    console.log("DisplayBookmarksCommand.execute(): body = " + notification.getBody());  
    
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
            var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
            
            if ((inputProxy != null) && notification.getBody().isForSecondScreen)
            {
                shellMediator.showOnTV(true);
                inputProxy.sendInputCommand("displayBookmarks", null);
            }
        }
    }
}

