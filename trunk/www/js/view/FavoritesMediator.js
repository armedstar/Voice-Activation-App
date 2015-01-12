FavoritesMediator.prototype = new BasePaneMediator;

FavoritesMediator.NAME = "FavoritesMediator";

FavoritesMediator.prototype.parent = BasePaneMediator.prototype;

function FavoritesMediator(viewComponent)
{
    BasePaneMediator.apply(this, [FavoritesMediator.NAME, viewComponent]);
}

FavoritesMediator.prototype._preprocessData = function(jsonData)
{
    return JSON.parse(jsonData);
}