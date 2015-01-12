
function GatewayService() 
{
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    
    this.ongetcelebrityhandler = null;
}


GatewayService.prototype.getOnDemandContent = function(success, fail)
{
    var args = {};
    PhoneGap.exec(success,fail,"GatewayService","getOnDemandContent",[args]);
}

GatewayService.prototype.getFavoritesContent = function(success, fail)
{
    var args = {};
    PhoneGap.exec(success,fail,"GatewayService","getFavoritesContent",[args]);
}

GatewayService.prototype.getCelebrityDetails = function(entityId, entityName)
{
    var args = {entityId:entityId,entityName:entityName};
    PhoneGap.exec("GatewayService.getCelebrityDetails", args);
}

GatewayService.prototype.getCelebrityCredits = function(entityId, entityName)
{
    var args = {entityId:entityId,entityName:entityName};
    PhoneGap.exec("GatewayService.getCelebrityCredits", args);
}

GatewayService.prototype.getMovieDetails = function(entityId)
{
    var args = {entityId:entityId};
    PhoneGap.exec("GatewayService.getMovieDetails", args);
}

GatewayService.prototype.getTVSeriesDetails = function(entityId)
{
    var args = {entityId:entityId};
    PhoneGap.exec("GatewayService.getTVSeriesDetails", args);
}

GatewayService.__getCelebrityDetailsCallback = function(entity)
{
    var gwyService = GatewayService();
    gwyService.ongetcelebrityhandler(entity);
}

GatewayService.__getCelebrityCreditsCallback = function(credits)
{
    var gwyService = GatewayService();
    gwyService.ongetcelebritycreditshandler(credits);
}

GatewayService.__getMovieDetailsCallback = function(entity)
{
    var gwyService = GatewayService();
    gwyService.ongetmoviehandler(entity);
}

GatewayService.__getTVSeriesDetailsCallback = function(entity)
{
    var gwyService = GatewayService();
    gwyService.ongettvserieshandler(entity);
}

PhoneGap.addConstructor(function() { 
                        if (!window.plugins) {
                            window.plugins = {};
                        }
                        window.plugins.GatewayService = GatewayService;
                        });
