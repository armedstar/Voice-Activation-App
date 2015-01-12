includeJS("js/view/ShellMediator.js");
includeJS("js/view/BasePaneMediator.js");
includeJS("js/view/OnDemandMediator.js");
includeJS("js/view/FavoritesMediator.js");
includeJS("js/view/QueueMediator.js");
includeJS("js/view/CelebDetailsMediator.js");
includeJS("js/view/CelebCreditsMediator.js");
includeJS("js/view/BaseContextManager.js");
includeJS("js/view/OnDemandContextManager.js");
includeJS("js/model/RAFInputProxy.js");
includeJS("js/model/GatewayProxy.js");
includeJS("js/model/QueueProxy.js");
includeJS("js/model/RecordManagerProxy.js");


StartupCommand.prototype = new puremvc.SimpleCommand;

function StartupCommand()
{
    puremvc.SimpleCommand.apply(this, arguments);
}

StartupCommand.prototype.execute = function(notification/*INotification*/)
{
    console.log("StartupCommand executed");
    
    //create and register mediators
    var app = notification.getBody();
    var shellMediator = new ShellMediator(app.shell);
    this.facade.registerMediator(shellMediator);
    
    var onDemand = new OnDemandPane(document.getElementById('onDemandContent'));
    var onDemandMediator = new OnDemandMediator(onDemand);
    this.facade.registerMediator(onDemandMediator);
    
    var favorites = new FavoritesPane(document.getElementById('favoritesContent'));
    var favoritesMediator = new FavoritesMediator(favorites);
    this.facade.registerMediator(favoritesMediator);
    
    var celebDetails = new CelebDetailsPane(document.getElementById('castOverview'));
    var celebDetailsMediator = new CelebDetailsMediator(celebDetails);
    this.facade.registerMediator(celebDetailsMediator);
    
    var celebCredits = new CelebCreditsPane(document.getElementById('castFilmography'));
    //var scrollCredits = new iScroll('castFilmographyWrapper', { hScroll:false, vScroll:true });
    var celebCreditsMediator = new CelebCreditsMediator(celebCredits);
    this.facade.registerMediator(celebCreditsMediator);
    
    var drawer = new Drawer(document.getElementById('drawer'), document.getElementById('drawerWrapper'), document.getElementById('bottomNotBubble'));
    var scrollDrawer = new iScroll('drawer', { hScroll: true, vScroll: false });
    var drawerMediator = new DrawerMediator(drawer);
    this.facade.registerMediator(drawerMediator);
    
    var gatewayProxy = new GatewayProxy();
    this.facade.registerProxy(gatewayProxy);
    
    var queue = new QueuePane(document.getElementById('queueContent'));
    var queueMediator = new QueueMediator(queue);
    this.facade.registerMediator(queueMediator);
    
    var queueProxy = new QueueProxy();
    this.facade.registerProxy(queueProxy);
    
    var recordProxy = new RecordManagerProxy();
    this.facade.registerProxy(recordProxy);
    
    this.seedQueue();
    shellMediator.clearAllPanes();
    
    window.plugins.ApplicationPreferences.get('play_sounds', Relegate.create(this, this.getIsSoundsActiveCallback), function() {console.log('Unable to get play_sounds setting');});
    
    shellMediator.introStatus();
    
}

StartupCommand.prototype.getIsSoundsActiveCallback = function(result)
{
    var isSoundsActive = (result == "1") ? true : false;
    if (isSoundsActive)
    {
        var shellMediator = this.facade.retrieveMediator(ShellMediator.NAME);
        shellMediator.playInitSound();
    }
}

StartupCommand.prototype.seedQueue = function()
{
    /*
    var queueProxy = this.facade.retrieveProxy(QueueProxy.NAME);
    
    var entityType = "tvSeries";
    var entityId = "14946527";
    var entityName = "The Walking Dead";
    var entitySynopsis = "A horror drama following the survivors of an apocalyptic holocaust who are searching for a safe haven while being tracked and menaced by zombies. Adapted from a comic-book series.";
    var imageSource = "http://cps-static.rovicorp.com/2/Open/AMC/The%20Walking%20Dead/Season%201/_derived_jpg_q90_410x410_m0/TheWalkingDead-Season1-BoxArt.jpg?partner=cpsTVGRome_p4@tvguide.com";
    
    
    queueProxy.addContentItem({"entityType":entityType, "entityId":entityId, "entityName":entityName, "entitySynopsis":entitySynopsis, "iconImage":imageSource});
     */
    
}