includeJS("js/model/RAFProxy.js");

ChangeChannelCommand.prototype = new puremvc.SimpleCommand;

function ChangeChannelCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

ChangeChannelCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("ChangeChannelCommand.execute(): notification = " + notification);
    console.log("ChangeChannelCommand.execute(): type = " + notification.getType());
    console.log("ChangeChannelCommand.execute(): body = " + notification.getBody()); 
    console.log("ChangeChannelCommand.execute(): body.receiveChannel = " + notification.getBody().receiveChannel);
    console.log("ChangeChannelCommand.execute(): body.channelName = " + notification.getBody().channelName);
    
    var inputProxy = this.facade.retrieveProxy(RAFInputProxy.NAME);
    
    if (notification.getType() == "init")
    {
        inputProxy.init();
    }
    else if (notification.getType() == "send")
    {
        if (!notification.getBody())
        {
            console.error("ChangeChannelCommand.execute(): channel data not present");
        }
        else if (notification.getBody().receiveChannel)
        {
            inputProxy.sendChangeChannelInputCommand_ChangeChannelByReceiveChannel(notification.getBody().receiveChannel);
        }
        else if (notification.getBody().channelName)
        {
            var channelName = notification.getBody().channelName;
            
            // HACK: [WK] Nuance currently returns "STARZ", rather than the full call letter.
            //       We are temporarily overriding that value here to get a matchable result.
            //       We are also matching "stars", just in case.
            if (channelName.toLowerCase() == "starz" || channelName.toLowerCase() == "stars")
            {
                channelName = "STARZ-W";
            }
            
            inputProxy.sendChangeChannelInputCommand_ChangeChannelByChannelName(channelName);        
        }
        else
        {
            console.error("ChangeChannelCommand.execute(): channel details not present");
        }        
    }
}