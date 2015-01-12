includeJS("js/model/RAFProxy.js");

RecordEntitiesCommand.prototype = new puremvc.SimpleCommand;

function RecordEntitiesCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

RecordEntitiesCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("RecordEntitiesCommand.execute(): notification = " + notification);
    console.log("RecordEntitiesCommand.execute(): type = " + notification.getType());
    console.log("RecordEntitiesCommand.execute(): body = " + notification.getBody());  
    
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
            var currentPane = notification.getBody().currentPane;
            var recordProxy = this.facade.retrieveProxy(RecordManagerProxy.NAME);
            
            if ((inputProxy != null) && notification.getBody().isForSecondScreen)
            {
                //TODO [JA]: add remote call for record to be handled by Camilla (later).
            }
            else
            {
                // HACK HACK [JA]
                // Heartbreaker (14208873) is not the first movie returned by Nuance (it's actually in the middle of a list of 4).
                // The other films for Andrew Lincoln are unreliable, so we are hardcoding Heartbreaker if we are looking at
                // Andrew Lincoln's credits.
                if (currentPane.contextData.actorId == "578300")
                {
                    recordProxy.recordEntity({entityId:"14208873"});
                }
                else
                {
                    for (var i in notification.getBody().entities)
                    {
                        console.log("Recording: " + notification.getBody().entities[i].mediaTitle);
                        recordProxy.recordEntity(notification.getBody().entities[i]);
                    }
                }
                
                //refresh current pane
                shellMediator.showOnTV(false);
                shellMediator.pushPane(currentPane, currentPane.contextData);
            }
        }
    }
    
    
}
