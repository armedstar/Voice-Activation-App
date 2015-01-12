ShowNotificationsCommand.prototype = new puremvc.SimpleCommand;

function ShowNotificationsCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

ShowNotificationsCommand.prototype.execute = function(notification/*INotification*/)
{
    var shellMed = this.facade.retrieveMediator(ShellMediator.NAME);
    var delay = notification.getBody().delay
    var enable = notification.getBody().enable;
    if (delay)
    {
        setTimeout(Relegate.create(this, this.doShow, enable), delay);
    }
    else
    {
        this.doShow(enable);
    }
}

ShowNotificationsCommand.prototype.doShow = function(enable)
{
    var shellMed = this.facade.retrieveMediator(ShellMediator.NAME);
    shellMed.enableStatus(enable);
    
}
