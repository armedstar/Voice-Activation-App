includeJS("js/model/RAFProxy.js");

DisplayEntityDetailsCommand.prototype = new puremvc.SimpleCommand;

function DisplayEntityDetailsCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayEntityDetailsCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("DisplayEntityDetailsCommand.execute(): notification = " + notification);
    console.log("DisplayEntityDetailsCommand.execute(): type = " + notification.getType());
    console.log("DisplayEntityDetailsCommand.execute(): body = " + notification.getBody());  
    
    var inputProxy = this.facade.retrieveProxy(RAFInputProxy.NAME);
    var gwyServer = new window.plugins.GatewayService();
    gwyServer.ongetcelebrityhandler = Relegate.create(this, this.getCelebrityDetailsCallback, this);
    
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
            
            var entityId = notification.getBody().entityId;
            var entityType = notification.getBody().entityType;
            var entityName = notification.getBody().entityName;
            var entityCharacterName = notification.getBody().entityCharacterName;
            
            console.log("DisplayEntityDetailsCommand.execute(): entityId = " + entityId);
            console.log("DisplayEntityDetailsCommand.execute(): entityType = " + entityType);
            console.log("DisplayEntityDetailsCommand.execute(): entityName = " + entityName);
            console.log("DisplayEntityDetailsCommand.execute(): entityCharacterName = " + entityCharacterName);
            
            if ((inputProxy != null) && notification.getBody().isForSecondScreen)
            {
                shellMediator.showOnTV(true);
                inputProxy.sendInputCommand("displayEntityDetails", "<entity id='" + entityId + "' type='" + entityType + "' name='" + entityName + "' />");
            }
            else
            {
                if (entityType == "celebrity")
                {
                    gwyServer.getCelebrityDetails(entityId, entityName);
                }
                else if (entityType == "movie")
                {
                    gwyServer.getMovieDetails(entityId, entityName);
                }
                else if (entityType == "tvSeries")
                {
                    gwyServer.getTVSeriesDetails(entityId, entityName);
                }
                else
                {
                    console.log("Bad entityType = " + entityType + ". Cannot show details screen.");
                }
            }
        }
    }
}

DisplayEntityDetailsCommand.prototype.getCelebrityDetailsCallback = function(entity)
{
    var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
    var celebDetailsMediator = this.facade.retrieveMediator(CelebDetailsMediator.NAME);
    
    shellMediator.showOnTV(false);
    shellMediator.pushPane(celebDetailsMediator, entity);
}