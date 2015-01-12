
RecordManagerProxy.prototype = new puremvc.Proxy;
RecordManagerProxy.prototype.constructor = RecordManagerProxy;

RecordManagerProxy.NAME = "recordManagerProxy";

function RecordManagerProxy()
{
    puremvc.Proxy.apply(this, [RecordManagerProxy.NAME, new Array()]);
    this.idsToRecord = new Object();
}

RecordManagerProxy.prototype.recordEntity = function(entity)
{
    this.idsToRecord[entity.entityId] = entity;
}

RecordManagerProxy.prototype.isEntityToBeRecorded = function(entity)
{
    return (this.idsToRecord[entity.entityId] != null);
}

RecordManagerProxy.prototype.removeRecordedEntity = function(entity)
{
    this.idsToRecord[entity.entityId] = null;
}

RecordManagerProxy.prototype.clearAllRecordings = function()
{
    this.idsToRecord = new Object();
}


