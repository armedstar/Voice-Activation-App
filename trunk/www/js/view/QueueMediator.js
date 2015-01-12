QueueMediator.prototype = new BasePaneMediator;

QueueMediator.NAME = "QueueMediator";

function QueueMediator(viewComponent)
{
    BasePaneMediator.apply(this, [QueueMediator.NAME, viewComponent]);
}

QueueMediator.prototype._updateView = function(view, data)
{
    view.update(data.content, data.recordProxy);
}