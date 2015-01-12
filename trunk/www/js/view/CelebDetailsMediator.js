CelebDetailsMediator.prototype = new BasePaneMediator;

CelebDetailsMediator.NAME = "CelebDetailsMediator";

CelebDetailsMediator.prototype.parent = BasePaneMediator.prototype;

function CelebDetailsMediator(viewComponent)
{
    BasePaneMediator.apply(this, [CelebDetailsMediator.NAME, viewComponent]);
    var view = this.getView();
    view.addEventListener(CelebDetailsPane.ON_CREDITS_BUTTON_CLICK, Relegate.create(this, this.onCreditsButtonClick));
}

CelebDetailsMediator.prototype.onCreditsButtonClick = function()
{
    this.sendNotification(AppFacade.DISPLAY_CREDITS, {
                          isForSecondScreen: false,
                          entityType:"celebrity",
                          entityId:this.contextData.entityId,
                          entityName:this.contextData.name,
                          }, "send");
}