
QueueProxy.prototype = new puremvc.Proxy;
QueueProxy.prototype.constructor = QueueProxy;

QueueProxy.NAME = "queueProxy";

function QueueProxy()
{
    puremvc.Proxy.apply(this, [QueueProxy.NAME, new Array()]);
    this.content = new Object();  //assoc array of entities
    this.gatewayEntities = new Object();  //assoc array of entities from the gateway
    this.ids = new Array();  //keeps track of order (queue)
    this.offset = 0;
    
    // NOTE: [WK] This will be an issue, since the current mechanism for gateway access only allows
    //       for a single callback handler on the service.  In the case of multiple calls in parallel,
    //       we would either be blowing away the callback from other locations or getting extraneous 
    //       calls ourselves.  At the moment, this is the only thing accessing the movie and tvSeries
    //       methods, so we should be safe, but if that changes, this will break.  It should get fixed.
    var gwyServer = new window.plugins.GatewayService();
    gwyServer.ongetmoviehandler = Relegate.create(this, this.__getMovieDetailsCallback, this);
    gwyServer.ongettvserieshandler = Relegate.create(this, this.__getTVSeriesDetailsCallback, this);
}

QueueProxy.prototype.getNumItems = function()
{
    return (this.ids.length - this.offset);
}

QueueProxy.prototype.isEmpty = function()
{
    return (this.ids.length == 0);
}

QueueProxy.prototype.containsContentItem = function(contentItem)
{
    return (this.content[contentItem.entityId] != null);
}

QueueProxy.prototype.addContentItem = function(contentItem)
{
    if (this.content[contentItem.entityId] == null)
    {
        this.ids.push(contentItem.entityId);
        this.content[contentItem.entityId] = contentItem;
    }
    
    var gwyServer = new window.plugins.GatewayService();
    //  Asynchronously obtain item from gateway
    if (contentItem.entityType == "movie")
    {
        gwyServer.getMovieDetails(contentItem.entityId);
    }
    else if (contentItem.entityType == "tvSeries")
    {
        gwyServer.getTVSeriesDetails(contentItem.entityId);
    }
}

QueueProxy.prototype.__getMovieDetailsCallback = function(entity)
{
    if (entity && entity.entityId)
    {
        var entityType = "movie";
        var entityId = entity.entityId;
        var entityName = entity.title;
        var entitySynopsis = entity.synopsis;
        var imageSource = (entity.primaryImage) ? entity.primaryImage.imageSource : "";
        
        console.log("QueueProxy.__getMovieDetailsCallback(): entityType = " + entityType);
        console.log("QueueProxy.__getMovieDetailsCallback(): entityId = " + entityId);
        console.log("QueueProxy.__getMovieDetailsCallback(): entityName = " + entityName);
        console.log("QueueProxy.__getMovieDetailsCallback(): entitySynopsis = " + entitySynopsis);
        console.log("QueueProxy.__getMovieDetailsCallback(): imageSource = " + imageSource);
        
        this.gatewayEntities[entityId] = {"entityType":entityType, "entityId":entityId, "entityName":entityName, "entitySynopsis":entitySynopsis, "iconImage":imageSource};
    }
}

QueueProxy.prototype.__getTVSeriesDetailsCallback = function(entity)
{
    if (entity && entity.entityId)
    {
        var entityType = "tvSeries";
        var entityId = entity.entityId;
        var entityName = entity.title;
        var entitySynopsis = entity.synopsis;
        var imageSource = (entity.primaryImage) ? entity.primaryImage.imageSource : "";
        
        console.log("QueueProxy.__getTVSeriesDetailsCallback(): entityType = " + entityType);
        console.log("QueueProxy.__getTVSeriesDetailsCallback(): entityId = " + entityId);
        console.log("QueueProxy.__getTVSeriesDetailsCallback(): entityName = " + entityName);
        console.log("QueueProxy.__getTVSeriesDetailsCallback(): entitySynopsis = " + entitySynopsis);
        console.log("QueueProxy.__getTVSeriesDetailsCallback(): imageSource = " + imageSource);
        
        this.gatewayEntities[entityId] = {"entityType":entityType, "entityId":entityId, "entityName":entityName, "entitySynopsis":entitySynopsis, "iconImage":imageSource};
    }
}

QueueProxy.prototype.dequeueContentItem = function()
{
    if (this.ids.length == 0) return undefined;
    
    var id = this.ids[this.offset];
    var item = this.content[id];
    delete this.content[id];
    delete this.gatewayEntities[id];
    if (++this.offset * 2 >= this.ids.length) {
        this.ids = this.ids.slice(this.offset);
        this.offset = 0;
    }
    
    return item;
}

QueueProxy.prototype.removeContentItem = function(contentItem)
{
    var contentId = contentItem.entityId;
    if (this.content[contentId])
    {
        this.ids.splice(this.ids.indexOf(contentId),1);
        delete this.content[contentId];
    }
    delete this.gatewayEntities[contentId];
}

QueueProxy.prototype.peekContentItem = function()
{
    return (this.ids.length > 0 ? this.content[this.ids[this.offset]] : undefined);
}

QueueProxy.prototype.getAllContentItems = function()
{
    var tmpArr = new Array();
    for (var i = 0; i < this.ids.length; i++)
    {
        var id = this.ids[i];
        tmpArr.push((this.gatewayEntities[id] != null) ? this.gatewayEntities[id] : this.content[id]);
    }
    return tmpArr;
}

QueueProxy.prototype.getGatewayEntityForContentItem = function(contentItem)
{
    if (contentItem.entityId != null)
    {
        return this.gatewayEntities[contentItem.entityId];
    }
    else
    {
        return null;
    }
}

QueueProxy.prototype.clearAll = function()
{
    this.content = new Object();
    this.gatewayEntities = new Object();
    this.ids = new Array();
    this.offset = 0;
}