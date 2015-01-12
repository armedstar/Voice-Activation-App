includeJS("js/model/RAFProxy.js");

DisplayCreditsCommand.prototype = new puremvc.SimpleCommand;

function DisplayCreditsCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayCreditsCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("DisplayCreditsCommand.execute(): notification = " + notification);
    console.log("DisplayCreditsCommand.execute(): type = " + notification.getType());
    console.log("DisplayCreditsCommand.execute(): body = " + notification.getBody());  
    
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
            
            
            var entityId = notification.getBody().entityId;
            var entityType = notification.getBody().entityType;
            var entityName = notification.getBody().entityName;
            
            console.log("DisplayCreditsCommand.execute(): entityId = " + entityId);
            console.log("DisplayCreditsCommand.execute(): entityType = " + entityType);
            console.log("DisplayCreditsCommand.execute(): entityName = " + entityName);
            
            if ((inputProxy != null) && notification.getBody().isForSecondScreen)
            {
                shellMediator.showOnTV(true);
                inputProxy.sendInputCommand("displayCredits", "<entity id='" + entityId + "' type='" + entityType + "' name='" + entityName + "' />");
            }
            else
            {
                if (entityType == "celebrity")
                {
                    var gwyServer = new window.plugins.GatewayService();
                    gwyServer.ongetcelebrityhandler = Relegate.create(this, this.getCelebrityDetailsCallback, this);
                    gwyServer.getCelebrityDetails(entityId, entityName);
                }
                else
                {
                    console.log("Bad entityType = " + entityType + ". Cannot show credits screen.");
                }
            }
        }
    }
}

DisplayCreditsCommand.prototype.getCelebrityDetailsCallback = function(entity)
{
    var entityImage = (entity && entity.primaryImage && entity.primaryImage.imageSource) ? entity.primaryImage.imageSource : undefined;
    //hack for andrew lincoln image
    if (entity.entityId == '578300')
    {
        entityImage = 'images/celebImgSm.png';
    }
    var gwyServer = new window.plugins.GatewayService();
    gwyServer.ongetcelebritycreditshandler = Relegate.create(this, this.getCelebrityCreditsCallback, entity.name, entityImage, entity.entityId);
    gwyServer.getCelebrityCredits(entity.entityId, entity.name);
}

DisplayCreditsCommand.prototype.getCelebrityCreditsCallback = function(credits, entityName, entityImage, entityId)
{
    var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
    var celebCreditsMediator = this.facade.retrieveMediator(CelebCreditsMediator.NAME);
    var recordProxy = this.facade.retrieveProxy(RecordManagerProxy.NAME);
    
    shellMediator.showOnTV(false);
    shellMediator.pushPane(celebCreditsMediator, {actorId: entityId, actorName: entityName, actorImage:entityImage, credits: credits, recordProxy:recordProxy});
}