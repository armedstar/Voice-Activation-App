includeJS("js/view/DrawerMediator.js");


AddToDrawerCommand.prototype = new puremvc.SimpleCommand;

function AddToDrawerCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

AddToDrawerCommand.prototype.execute = function(notification)
{
    var drawerMediator = this.facade.retrieveMediator(DrawerMediator.NAME);
    drawerMediator.addCommand(notification.getBody());
}