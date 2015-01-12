includeJS("js/model/RAFProxy.js");

RemoveBookmarkCommand.prototype = new puremvc.SimpleCommand;

function RemoveBookmarkCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

RemoveBookmarkCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("RemoveBookmarkCommand.execute(): notification = " + notification);
    console.log("RemoveBookmarkCommand.execute(): type = " + notification.getType());
    console.log("RemoveBookmarkCommand.execute(): body = " + notification.getBody());  
    
    var inputProxy = this.facade.retrieveProxy(RAFInputProxy.NAME);
    
    if (notification.getType() == "init")
    {
        if (inputProxy)
            inputProxy.init();
    }
    else if (notification.getType() == "send")
    {
        if (notification.getBody())
        {
            var response = notification.getBody();
            var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
            var onDemandMediator = this.facade.retrieveMediator(OnDemandMediator.NAME);
            
            if (inputProxy != null)
            {
                if (response.recognizedText == "remove all bookmarks" || response.recognizedText == "clear bookmarks")
                {
                    inputProxy.sendRemoveBookmarkInputCommand_RemoveAllBookmarks();
                }
                else if (response.recognizedTitles)
                {
                    var recognizedEntities = new Object();

                    for (var i=0; i < response.recognizedTitles.length; i++)
                    {
                            var title = (response.recognizedTitles[i].name) ? (response.recognizedTitles[i].name.toLowerCase()) : "undefined";
                            console.log("RemoveBookmarkCommand.execute(): title = " + title);
                            console.log("RemoveBookmarkCommand.execute(): response.recognizedText = " + response.recognizedText);
                            console.log("RemoveBookmarkCommand.execute(): response.recognizedText.indexOf(title) = " + response.recognizedText.indexOf(title));
                            if ((response.recognizedText.indexOf(title) != -1) && (recognizedEntities[title] == null))
                            {
                                console.log("RemoveBookmarkCommand.execute(): adding title = " + title);
                                recognizedEntities[title] = {
                                entityType: response.recognizedTitles[i].mediaType,
                                entityId: response.recognizedTitles[i].uid,
                                entityName: response.recognizedTitles[i].name
                                };
                            }
                            else
                            {
                                console.log("RemoveBookmarkCommand.execute(): ignoring title = " + title);
                            }
                    }
                    
                    inputProxy.sendRemoveBookmarkInputCommand_RemoveBookmarks(recognizedEntities);
                }
            }
        }
    }
}