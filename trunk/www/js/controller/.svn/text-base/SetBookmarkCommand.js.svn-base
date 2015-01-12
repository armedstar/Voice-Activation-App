includeJS("js/model/RAFProxy.js");

SetBookmarkCommand.prototype = new puremvc.SimpleCommand;

function SetBookmarkCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

SetBookmarkCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("SetBookmarkCommand.execute(): notification = " + notification);
    console.log("SetBookmarkCommand.execute(): type = " + notification.getType());
    console.log("SetBookmarkCommand.execute(): body = " + notification.getBody());  
    
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
            var recognizedText = notification.getBody().recognizedText.toLowerCase();
            var recognizedEntities = new Object();
            
            
            if (inputProxy != null)
            {
                var bookmarks = "";
                
                if (response.recognizedTitles)
                {
                    for (var i=0; i < response.recognizedTitles.length; i++)
                    {
                        var title = (response.recognizedTitles[i].name) ? (response.recognizedTitles[i].name.toLowerCase()) : "undefined";
                        if ((recognizedText.indexOf(title) != -1) && (recognizedEntities[title] == null))
                        {
                            /*  [JA] - HACKHACK - Had to substitue the correct ID for "Playback", as we are current matching the wrong one from Nuance.  */
                            if (new RegExp("play[\s]*back").test(title)) {
                                response.recognizedTitles[i].uid = "19906694";
                            }
                            
                            recognizedEntities[title] = {
                                entityType: response.recognizedTitles[i].mediaType,
                                entityId: response.recognizedTitles[i].uid,
                                entityName: response.recognizedTitles[i].name
                            };
                        }
                    }
                }
                
                
                for (var i in recognizedEntities)
                {
                    bookmarks += "<bookmark id='" + recognizedEntities[i].entityId + "' type='" + recognizedEntities[i].entityType + "' name='" + recognizedEntities[i].entityName + "' />";
                        
                }
                
                inputProxy.sendInputCommand("setBookmarks", bookmarks);
            }
        }
    }
}