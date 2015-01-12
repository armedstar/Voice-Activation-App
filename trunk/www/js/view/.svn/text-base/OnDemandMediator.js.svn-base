OnDemandMediator.prototype = new BasePaneMediator;

OnDemandMediator.NAME = "OnDemandMediator";

OnDemandMediator.prototype.parent = BasePaneMediator.prototype;

function OnDemandMediator(viewComponent)
{
    BasePaneMediator.apply(this, [OnDemandMediator.NAME, viewComponent]);
}

OnDemandMediator.prototype._preprocessData = function(jsonData)
{
    return JSON.parse(jsonData);
}

OnDemandMediator.prototype.manageContextSwitch = function(isForSecondScreen)
{
    // TODO: [WK] Retain the genre through the architecture and pass it on.
    var intent = {isForSecondScreen: isForSecondScreen, genre: "action/adventure"};
    this.sendNotification(AppFacade.DISPLAY_ONDEMAND, intent, "send");
}