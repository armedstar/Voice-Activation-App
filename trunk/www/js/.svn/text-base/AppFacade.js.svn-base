includeJS("js/controller/ConnectCommand.js");
includeJS("js/controller/StartupCommand.js");
includeJS("js/controller/DisplayHomeCommand.js");
includeJS("js/controller/DisplayOnDemandCommand.js");
includeJS("js/controller/DisplayFavoritesCommand.js");
includeJS("js/controller/DisplayBookmarksCommand.js");
includeJS("js/controller/DisplayEntityDetailsCommand.js");
includeJS("js/controller/DisplayCreditsCommand.js");
includeJS("js/controller/SetBookmarkCommand.js");
includeJS("js/controller/RemoveBookmarkCommand.js");
includeJS("js/controller/SendNavigationEventCommand.js");
includeJS("js/controller/SendQueueEventCommand.js");
includeJS("js/controller/ChangeChannelCommand.js");
includeJS("js/controller/ShowNotificationsCommand.js");
includeJS("js/controller/AddToDrawerCommand.js");
includeJS("js/controller/ResetSystemCommand.js");
includeJS("js/controller/RecordEntitiesCommand.js");

AppFacade.prototype = new puremvc.Facade;

AppFacade.STARTUP = "startup";
AppFacade.CONNECT = "connect";
AppFacade.DISPLAY_HOME = "displayHome";
AppFacade.DISPLAY_ONDEMAND = "displayOnDemand";
AppFacade.DISPLAY_FAVORITES = "displayFavorites";
AppFacade.DISPLAY_BOOKMARKS = "displayBookmarks";
AppFacade.DISPLAY_ENTITY_DETAILS = "displayEntityDetails";
AppFacade.DISPLAY_CREDITS = "displayCredits";
AppFacade.SET_BOOKMARKS = "setBookmarks";
AppFacade.REMOVE_BOOKMARKS = "removeBookmarks";
AppFacade.RECORD_ENTITIES = "recordEntities";
AppFacade.SEND_NAVIGATION_EVENT = "navEvent";
AppFacade.SEND_QUEUE_EVENT = "queueEvent";
AppFacade.CHANGE_CHANNEL = "changeChannel";
AppFacade.SHOW_NOTIFICATIONS = "showNotifications";
AppFacade.ADD_COMMAND_TO_DRAWER = "addCommandToDrawer";
AppFacade.RESET_SYSTEM = "resetSystem";


function AppFacade(key)
{
    puremvc.Facade.apply(this, arguments);
}

AppFacade.prototype.startup = function()
{
    this.sendNotification(AppFacade.CONNECT, this);
    
    var appDiv = document.getElementById('application');
    appDiv.shell = new Shell(document.getElementById('shell'));
    
    this.sendNotification(AppFacade.STARTUP, appDiv);
}

AppFacade.prototype.initializeController = function()
{
    puremvc.Facade.prototype.initializeController.call(this);
    this.registerCommand(AppFacade.CONNECT, ConnectCommand);
    this.registerCommand(AppFacade.STARTUP, StartupCommand);
    this.registerCommand(AppFacade.DISPLAY_HOME, DisplayHomeCommand);
    this.registerCommand(AppFacade.DISPLAY_ONDEMAND, DisplayOnDemandCommand);
    this.registerCommand(AppFacade.DISPLAY_FAVORITES, DisplayFavoritesCommand);
    this.registerCommand(AppFacade.DISPLAY_BOOKMARKS, DisplayBookmarksCommand);
    this.registerCommand(AppFacade.DISPLAY_ENTITY_DETAILS, DisplayEntityDetailsCommand);
    this.registerCommand(AppFacade.DISPLAY_CREDITS, DisplayCreditsCommand);
    this.registerCommand(AppFacade.SET_BOOKMARKS, SetBookmarkCommand);
    this.registerCommand(AppFacade.REMOVE_BOOKMARKS, RemoveBookmarkCommand);
    this.registerCommand(AppFacade.SEND_NAVIGATION_EVENT, SendNavigationEventCommand);
    this.registerCommand(AppFacade.SEND_QUEUE_EVENT, SendQueueEventCommand);
    this.registerCommand(AppFacade.CHANGE_CHANNEL, ChangeChannelCommand);
    this.registerCommand(AppFacade.SHOW_NOTIFICATIONS, ShowNotificationsCommand);
    this.registerCommand(AppFacade.ADD_COMMAND_TO_DRAWER, AddToDrawerCommand);
    this.registerCommand(AppFacade.RECORD_ENTITIES, RecordEntitiesCommand);
    this.registerCommand(AppFacade.RESET_SYSTEM, ResetSystemCommand);
}



AppFacade.prototype.isConnectedToRAF = function()
{
    if (this.retrieveProxy(RAFProxy.NAME))
    {
        return this.retrieveProxy(RAFProxy.NAME).connected;
    }
    return false;
}

AppFacade.getInstance = function(key)
{
    if (!puremvc.Facade.hasCore(key))
    {
        new AppFacade(key);
    }
    var retVal = puremvc.Facade.getInstance(key);
    return retVal;
}