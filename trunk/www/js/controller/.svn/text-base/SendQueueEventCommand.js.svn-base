includeJS("js/model/RAFProxy.js");

SendQueueEventCommand.prototype = new puremvc.SimpleCommand;

SendQueueEventCommand.QUEUE_COMMAND_DISPLAY = 1000;
SendQueueEventCommand.QUEUE_COMMAND_ADD_ENTITIES = 1001;
SendQueueEventCommand.QUEUE_COMMAND_REMOVE_ENTITIES = 1002;
SendQueueEventCommand.QUEUE_COMMAND_REMOVE_ALL_ENTITIES = 1003
SendQueueEventCommand.QUEUE_COMMAND_PLAY = 1004;
SendQueueEventCommand.QUEUE_RECORD_ENTITIES = 1005;

function SendQueueEventCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

SendQueueEventCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("SendQueueEventCommand.execute(): notification = " + notification);
    console.log("SendQueueEventCommand.execute(): type = " + notification.getType());
    console.log("SendQueueEventCommand.execute(): body = " + notification.getBody());  
    
    var inputProxy = this.facade.retrieveProxy(RAFInputProxy.NAME);
    
    if (notification.getType() == "init")
    {
        if (inputProxy)
            inputProxy.init();
    }
    else if (notification.getType() == "send")
    {
        if ((inputProxy != null) && notification.getBody())
        {
            var queueCommand = notification.getBody().queueCommand;
            var isForTV = notification.getBody().isForSecondScreen;
            
            console.log("SendQueueEventCommand.execute(): queueCommand = " + queueCommand);
            var queueProxy = this.facade.retrieveProxy(QueueProxy.NAME);
            var recordProxy = this.facade.retrieveProxy(RecordManagerProxy.NAME);
            
            if (queueCommand != null)
            {
                if (queueCommand == SendQueueEventCommand.QUEUE_COMMAND_DISPLAY)
                {
                    var queueMediator = this.facade.retrieveMediator(QueueMediator.NAME);
                    var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
                    
                    if (!isForTV)
                    {
                        shellMediator.showOnTV(false);
                        shellMediator.pushPane(queueMediator, {content: queueProxy.getAllContentItems(), recordProxy: recordProxy});
                    }
                    else
                    {
                        shellMediator.showOnTV(true);
                        inputProxy.sendQueueEventInputCommand_Display();
                    }
                }
                else if (queueCommand == SendQueueEventCommand.QUEUE_COMMAND_PLAY)
                {
                    console.log("SendQueueEventCommand.execute(): Sending PLAY event");
                    
                    inputProxy.sendQueueEventInputCommand_Play();
                }
                else if (queueCommand == SendQueueEventCommand.QUEUE_COMMAND_REMOVE_ALL_ENTITIES)
                {
                    queueProxy.clearAll();
                    recordProxy.clearAllRecordings();
                    console.log("SendQueueEventCommand.execute(): Sending REMOVE_ALL_ENTITIES event");
                    
                    inputProxy.sendQueueEventInputCommand_RemoveAllEntities();
                }
                else if (queueCommand == SendQueueEventCommand.QUEUE_COMMAND_ADD_ENTITIES)
                {
                    var entityArr = new Array();
                    for (var i in notification.getBody().recognizedEntities)
                    {
                        var entity = notification.getBody().recognizedEntities[i];
                        
                        /*  [JA] - HACKHACK - Had to substitue the correct ID for "Playback", as we are current matching the wrong one from Nuance.  */
                        if (new RegExp("play[\s]*back").test(entity.entityName.toLowerCase())) {
                            entity.entityId = "19906694";
                        }
                            entityArr.push(entity);
                            queueProxy.addContentItem(entity);
                    }
                    
                    console.log("SendQueueEventCommand.execute(): Sending ADD_ENTITIES event");
                    
                    inputProxy.sendQueueEventInputCommand_AddEntities(entityArr);
                }
                else if (queueCommand == SendQueueEventCommand.QUEUE_COMMAND_REMOVE_ENTITIES)
                {
                    var entityArr = new Array();
                    for (var i in notification.getBody().recognizedEntities)
                    {
                        entityArr.push(notification.getBody().recognizedEntities[i]);
                        queueProxy.removeContentItem(notification.getBody().recognizedEntities[i]);
                    }
                    
                    console.log("SendQueueEventCommand.execute(): Sending REMOVE_ENTITIES event");
                    
                    inputProxy.sendQueueEventInputCommand_RemoveEntities(entityArr);
                }
                else if (queueCommand == SendQueueEventCommand.QUEUE_RECORD_ENTITIES)
                {
                    var entityArr = new Array();
                    for (var i in notification.getBody().recognizedEntities)
                    {
                        entityArr.push(notification.getBody().recognizedEntities[i]);
                        if (!queueProxy.containsContentItem(notification.getBody().recognizedEntities[i]))
                        {
                            queueProxy.addContentItem(notification.getBody().recognizedEntities[i]);
                        }
                        recordProxy.recordEntity(notification.getBody().recognizedEntities[i]);
                    }
                    
                    //TODO [JA]: Add record remote command for Camilla
                    
                    //refresh screen
                    this.sendNotification(AppFacade.SEND_QUEUE_EVENT, {queueCommand: SendQueueEventCommand.QUEUE_COMMAND_DISPLAY, isForSecondScreen: isForTV}, "send");
                }
            }
            else
            {
                console.log("SendQueueEventCommand.execute(): ignored: Queue command not provided");
            }
        }
        else
        {
            console.log("SendQueueEventCommand.execute(): ignored: RAFInputProxy not available");
        }
    }
}
