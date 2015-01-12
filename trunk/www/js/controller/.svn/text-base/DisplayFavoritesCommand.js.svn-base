includeJS("js/model/RAFProxy.js");

DisplayFavoritesCommand.prototype = new puremvc.SimpleCommand;

function DisplayFavoritesCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayFavoritesCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("DisplayFavoritesCommand.execute(): notification = " + notification);
    console.log("DisplayFavoritesCommand.execute(): type = " + notification.getType());
    console.log("DisplayFavoritesCommand.execute(): body = " + notification.getBody());  
    
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
                inputProxy.sendInputCommand("displayFavorites", null);
            }
            else
            {
                new window.plugins.GatewayService().getFavoritesContent(Relegate.create(this, this.getFavoritesCallback, this), function() {});
            }
        }
    }
}

DisplayFavoritesCommand.prototype.getFavoritesCallback = function(vodData)
{
    var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
    var favoritesMediator = this.facade.retrieveMediator(FavoritesMediator.NAME);
    
    shellMediator.showOnTV(false);
    shellMediator.pushPane(favoritesMediator, vodData);
}