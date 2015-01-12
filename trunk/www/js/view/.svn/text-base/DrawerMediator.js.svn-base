DrawerMediator.prototype = new puremvc.Mediator;

DrawerMediator.NAME = "DrawerMediator";

function DrawerMediator(viewComponent)
{
    puremvc.Mediator.apply(this, [DrawerMediator.NAME, viewComponent]);
}

DrawerMediator.prototype.getView = function()
{
    return this.viewComponent;
}

DrawerMediator.prototype.addCommand = function(command /*NMSPResponse*/)
{
    this.getView().addCommand(command);
}

DrawerMediator.prototype.clearCommands = function()
{
    this.getView().clearCommands();
}