BasePaneMediator.prototype = new puremvc.Mediator;

BasePaneMediator.NAME = "BasePaneMediator";

BasePaneMediator.prototype.parent = puremvc.Mediator.prototype;

function BasePaneMediator(mediatorName, viewComponent)
{
    puremvc.Mediator.apply(this, [mediatorName, viewComponent]);
}

BasePaneMediator.prototype.getView = function()
{
    return this.viewComponent;
}

BasePaneMediator.prototype.showPane = function(data)
{
    try
    {
        this.contextData = this._preprocessData(data);
        this._updateView(this.getView(), this.contextData);
        this.getView().enableDisplay(true);  
    }
    catch (e)
    {
        alert(e);
    }
}

BasePaneMediator.prototype._preprocessData = function(data)
{
    return data;
}

BasePaneMediator.prototype._updateView = function(view, data)
{
    view.update(data);
}

BasePaneMediator.prototype.hidePane = function()
{
    this.getView().enableDisplay(false);
}

BasePaneMediator.prototype.refresh = function()
{
    this.hidePane();
    this.showPane(this.contextData);
}

BasePaneMediator.prototype.manageContextSwitch = function(isForSecondScreen)
{
    // Noop: To be overidden...
}