CelebCreditsMediator.prototype = new BasePaneMediator;

CelebCreditsMediator.NAME = "CelebCreditsMediator";

CelebCreditsMediator.prototype.parent = BasePaneMediator.prototype;

function CelebCreditsMediator(viewComponent)
{
    BasePaneMediator.apply(this, [CelebCreditsMediator.NAME, viewComponent]);
    
    var view = this.getView();
    view.addEventListener(CelebCreditsPane.ON_OVERVIEW_BUTTON_CLICK, Relegate.create(this, this.onOverviewButtonClick));
}

CelebCreditsMediator.prototype.onOverviewButtonClick = function()
{
    this.sendNotification(AppFacade.DISPLAY_ENTITY_DETAILS, {
                          isForSecondScreen: false,
                          entityType:"celebrity",
                          entityId:this.contextData.actorId,
                          entityName:this.contextData.actorName,
                          }, "send");
}

//CelebCreditsMediator.prototype.record = function(
