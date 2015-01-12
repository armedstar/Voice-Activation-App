includeJS("js/model/RAFProxy.js");

DisplayOnDemandCommand.prototype = new puremvc.SimpleCommand;

function DisplayOnDemandCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

DisplayOnDemandCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("DisplayOnDemandCommand.execute(): notification = " + notification);
    console.log("DisplayOnDemandCommand.execute(): type = " + notification.getType());
    console.log("DisplayOnDemandCommand.execute(): body = " + notification.getBody());  
    
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
                        
            if ((inputProxy) && notification.getBody().isForSecondScreen)
            {
                var genre = (notification.getBody().genre != null) ? notification.getBody().genre : "";
                
                shellMediator.showOnTV(true);
                inputProxy.sendInputCommand("displayOnDemand", "<genre>" + genre + "</genre>");
            }
            else
            {
                new window.plugins.GatewayService().getOnDemandContent(Relegate.create(this, this.getVODCallback, this), function() {});
            }
        }
    }
}

DisplayOnDemandCommand.prototype.getVODCallback = function(vodData)
{
    var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
    var onDemandMediator = this.facade.retrieveMediator(OnDemandMediator.NAME);
    
    shellMediator.showOnTV(false);
    shellMediator.pushPane(onDemandMediator, vodData);
}

