includeJS("js/view/components/Shell.js");
includeJS("js/view/components/NotificationPanel.js");
includeJS("js/controller/SendQueueEventCommand.js");

ShellMediator.DEVICE_CONTEXT_HOST = 0;
ShellMediator.DEVICE_CONTEXT_SECOND_SCREEN = 1;

ShellMediator.prototype = new puremvc.Mediator;
ShellMediator.prototype.nvr = null;
ShellMediator.prototype.isRecording = false;
ShellMediator.prototype.curActorEntityContext = null;
ShellMediator.prototype.curContextManager = null;
ShellMediator.prototype.deviceContext = ShellMediator.DEVICE_CONTEXT_HOST;

ShellMediator.NAME = "ShellMediator";

function ShellMediator(viewComponent)
{
    puremvc.Mediator.apply(this, [ShellMediator.NAME, viewComponent]);
    
    var view = this.getView();
    view.addEventListener(Shell.CLICKRECORD, Relegate.create(this, this.onRecordClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_RECONNECT_BUTTON, Relegate.create(this, this.onRemoteControlReconnectClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_OK_BUTTON, Relegate.create(this, this.onRemoteControlOKClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_LEFT_BUTTON, Relegate.create(this, this.onRemoteControlLeftClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_RIGHT_BUTTON, Relegate.create(this, this.onRemoteControlRightClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_UP_BUTTON, Relegate.create(this, this.onRemoteControlUpClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_DOWN_BUTTON, Relegate.create(this, this.onRemoteControlDownClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_A_BUTTON, Relegate.create(this, this.onRemoteControlAClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_B_BUTTON, Relegate.create(this, this.onRemoteControlBClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_C_BUTTON, Relegate.create(this, this.onRemoteControlCClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_PLAY_BUTTON, Relegate.create(this, this.onRemoteControlPlayClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_PAUSE_BUTTON, Relegate.create(this, this.onRemoteControlPauseClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_STOP_BUTTON, Relegate.create(this, this.onRemoteControlStopClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_RECORD_BUTTON, Relegate.create(this, this.onRemoteControlRecordClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_NEXT_BUTTON, Relegate.create(this, this.onRemoteControlNextClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_PREVIOUS_BUTTON, Relegate.create(this, this.onRemoteControlPreviousClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_EXIT_BUTTON, Relegate.create(this, this.onRemoteControlExitClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_BACK_BUTTON, Relegate.create(this, this.onRemoteControlBackClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_MENU_BUTTON, Relegate.create(this, this.onRemoteControlMenuClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_GUIDE_BUTTON, Relegate.create(this, this.onRemoteControlGuideClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_INFO_BUTTON, Relegate.create(this, this.onRemoteControlInfoClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_DVR_BUTTON, Relegate.create(this, this.onRemoteControlDVRClick));
    view.addEventListener(Shell.CLICK_REMOTE_CONTROL_RESET_BUTTON, Relegate.create(this, this.onRemoteControlResetClick));
    
    this.eventDispatcher = new EventDispatcher();
    
    this.paneStack = new Array();
}

ShellMediator.prototype.getView = function()
{
    return this.viewComponent;
}

ShellMediator.prototype.playInitSound = function()
{
    this.getView().playInitSound();
}


/** Screen Stack functionality **/
ShellMediator.prototype.getCurrentPane = function()
{
    if (this.paneStack && this.paneStack.length > 0)
    {
        return this.paneStack[this.paneStack.length - 1];
    }
    else
        return undefined;
}

ShellMediator.prototype.popPane = function()
{
    var currMediator = this.paneStack.pop();
    if (currMediator)
        currMediator.hidePane();
    
    var newMediator = this.getCurrentPane();
    if (newMediator)
        newMediator.showPane();
}

ShellMediator.prototype.pushPane = function(paneMediator, dataObj)
{
    var currMediator = this.getCurrentPane();
    if (currMediator)
        currMediator.hidePane();
    
    this.paneStack.push(paneMediator);
    paneMediator.showPane(dataObj);
}

ShellMediator.prototype.clearAllPanes = function()
{
    var currMediator = this.getCurrentPane();
    if (currMediator)
        currMediator.hidePane();
    
    this.paneStack = new Array();
}

ShellMediator.prototype.manageContextSwitch = function(newDeviceContext)
{
    if (this.deviceContext != newDeviceContext)
    {
        this.deviceContext = newDeviceContext;
        
        if (this.deviceContext == ShellMediator.DEVICE_CONTEXT_SECOND_SCREEN)
        {
            var currMediator = this.getCurrentPane();
    
            this.showOnTV(true);
        
            if (currMediator)
            {
                currMediator.manageContextSwitch((this.deviceContext == ShellMediator.DEVICE_CONTEXT_SECOND_SCREEN));
            }
        }
        else
        {
            // TODO: Obtain currently displayed information from second screen.
            // HACK: [WK] For now we will simply go to the home screen.
            this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_EXIT}, "send");
            this.sendNotification(AppFacade.DISPLAY_HOME, this, "send");
        }
    }
}


ShellMediator.prototype.onintent = function(intent)
{
    console.log("ShellMediator.onintent(): intent = " + intent);
    console.log("ShellMediator.onintent(): intent.intent = " + intent.intent);
    console.log("ShellMediator.onintent(): intent.recognizedText = " + intent.recognizedText);
    console.log("ShellMediator.onintent(): intent.channel = " + intent.channel);
    console.log("ShellMediator.onintent(): intent.genre = " + intent.genre);
    console.log("ShellMediator.onintent(): intent.isForSecondScreen = " + intent.isForSecondScreen);
    
    var displayText = intent.recognizedText;
    
    // NOTE: [WK] We are hacking around a couple display issues from Nuance with displayed words here.
    if (displayText != null && displayText.toLowerCase() == "paws")
    {
        displayText = "pause";
    }
    
    this.getView().setStatus("<p>" + displayText + "</p>", NotificationPanel.NOTIFICATION_STYLE_RIGHT);
    
    
    try {
        
        // Manage context switching
        
        if (
            intent.recognizedText == "show on the big screen" || 
            intent.recognizedText == "show on big screen" ||
            intent.recognizedText == "switch to the big screen" || 
            intent.recognizedText == "switch to big screen" ||
            (intent.recognizedText == "switch screen" && this.deviceContext == ShellMediator.DEVICE_CONTEXT_HOST) ||
            (intent.recognizedText == "switch" && this.deviceContext == ShellMediator.DEVICE_CONTEXT_HOST))
        {
            console.log("ShellMediator.onintent(): changing device context to the big screen");
            
            this.manageContextSwitch(ShellMediator.DEVICE_CONTEXT_SECOND_SCREEN);
        }
        else if (
                 intent.recognizedText == "show on the small screen" || 
                 intent.recognizedText == "show on small screen" ||
                 intent.recognizedText == "switch to the small screen" || 
                 intent.recognizedText == "switch to small screen" ||
                 (intent.recognizedText == "switch screen" && this.deviceContext == ShellMediator.DEVICE_CONTEXT_SECOND_SCREEN) ||
                 (intent.recognizedText == "switch" && this.deviceContext == ShellMediator.DEVICE_CONTEXT_SECOND_SCREEN))
        {
            console.log("ShellMediator.onintent(): changing device context to the small screen");
            
            this.manageContextSwitch(ShellMediator.DEVICE_CONTEXT_HOST);
        }
        else
        {
            // If not context switching, manage requested command
            
            // Adjust device context unless explicitly specified
            if (!intent.isForSecondScreen)
            {
                intent.isForSecondScreen = (this.deviceContext == ShellMediator.DEVICE_CONTEXT_SECOND_SCREEN);
            }
            
            if (intent.intent == "command-actor_info-na")
            {
                // "Has he/she been in any movies?"
                if (this.curActorEntityContext != null)
                {
                    this.sendNotification(AppFacade.DISPLAY_CREDITS, {
                                          isForSecondScreen: intent.isForSecondScreen,
                                          entityType:"celebrity",
                                          entityId:this.curActorEntityContext.entityId,
                                          entityName:this.curActorEntityContext.entityName,
                                          }, "send");
                    
                }
            }
            else if (intent.recognizedText == "watch" || intent.recognizedText == "watch movie" || intent.recognizedText == "watch content")
            {   
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_PLAY_CONTENT}, "send");
            }
            else if (intent.intent == "queue-na-display")
            {
                if (intent.recognizedText == "stop the playlist" || intent.recognizedText == "stop playlist")
                {
                    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_STOP}, "send");
                }
                else
                {
                    this.sendNotification(
                                          AppFacade.SEND_QUEUE_EVENT, 
                                          {
                                            isForSecondScreen: intent.isForSecondScreen,
                                            queueCommand: SendQueueEventCommand.QUEUE_COMMAND_DISPLAY
                                          }, 
                                          "send");
                }
            }
            else if (intent.intent == "queue-na-play")
            {
                this.sendNotification(
                                      AppFacade.SEND_QUEUE_EVENT, 
                                      {
                                      queueCommand: SendQueueEventCommand.QUEUE_COMMAND_PLAY
                                      }, 
                                      "send");
            }
            else if (intent.intent == "queue-na-add")
            {
                var recognizedEntities = new Object();
                var recognizedText = intent.recognizedText.toLowerCase();
                if (intent.recognizedTitles)
                {
                    for (var i=0; i < intent.recognizedTitles.length; i++)
                    {
                        var title = (intent.recognizedTitles[i].name) ? (intent.recognizedTitles[i].name.toLowerCase()) : "undefined";
                        if ((recognizedText.indexOf(title) != -1) && (recognizedEntities[title] == null))
                        {
                            recognizedEntities[title] = {
                                                        entityType: intent.recognizedTitles[i].mediaType,
                                                        entityId: intent.recognizedTitles[i].uid,
                                                        entityName: intent.recognizedTitles[i].name
                                                        };
                        }
                    }
                }
                
                this.sendNotification(
                                      AppFacade.SEND_QUEUE_EVENT, 
                                      {
                                        queueCommand: SendQueueEventCommand.QUEUE_COMMAND_ADD_ENTITIES,
                                        recognizedEntities: recognizedEntities
                                      }, 
                                      "send");
            }
            else if (intent.intent == "queue-na-remove")
            {
                if (intent.recognizedText == "clear playlist")
                {
                    this.sendNotification(
                                          AppFacade.SEND_QUEUE_EVENT, 
                                          {
                                            queueCommand: SendQueueEventCommand.QUEUE_COMMAND_REMOVE_ALL_ENTITIES
                                          }, 
                                          "send");
                }
                else
                {
                    var recognizedEntities = new Object();
                    var recognizedText = intent.recognizedText.toLowerCase();
                    if (intent.recognizedTitles)
                    {
                        for (var i=0; i < intent.recognizedTitles.length; i++)
                        {
                            var title = (intent.recognizedTitles[i].name) ? (intent.recognizedTitles[i].name.toLowerCase()) : "undefined";
                            if ((recognizedText.indexOf(title) != -1) && (recognizedEntities[title] == null))
                            {
                                recognizedEntities[title] = {
                                                            entityType: intent.recognizedTitles[i].mediaType,
                                                            entityId: intent.recognizedTitles[i].uid,
                                                            entityName: intent.recognizedTitles[i].name
                                                            };
                            }
                        }
                    }
                    
                    
                     this.sendNotification(
                                          AppFacade.SEND_QUEUE_EVENT, 
                                          {
                                            queueCommand: SendQueueEventCommand.QUEUE_COMMAND_REMOVE_ENTITIES,
                                            recognizedEntities: recognizedEntities
                                          }, 
                                          "send");
                }
            }
            else if (new RegExp("record-.*").test(intent.intent))
            {
                var recognizedEntities = new Object();
                var recognizedText = intent.recognizedText.toLowerCase();
                var currentPane = this.getCurrentPane();
                if (intent.recognizedTitles)
                {
                    for (var i=0; i < intent.recognizedTitles.length; i++)
                    {
                        var title = (intent.recognizedTitles[i].name) ? (intent.recognizedTitles[i].name.toLowerCase()) : "undefined";
                        if ((recognizedText.indexOf(title) != -1) && (recognizedEntities[title] == null))
                        {
                            recognizedEntities[title] = {
                            entityType: intent.recognizedTitles[i].mediaType,
                            entityId: intent.recognizedTitles[i].uid,
                            entityName: intent.recognizedTitles[i].name
                            };
                        }
                    }
                }
                
                this.sendNotification(AppFacade.RECORD_ENTITIES, {entities: recognizedEntities, currentPane:currentPane}, "send");
            }
            else if (intent.intent == "command-play-trailer")
            {
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_PLAY_TRAILER}, "send");
            }
            else if (intent.intent == "play-na-na")
            {
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_PLAY}, "send");
            }
            else if (intent.intent == "command-pause-na")
            {
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_PAUSE}, "send");
            }
            else if (intent.intent == "unspecified-na-na" && intent.recognizedText == "stop")
            {
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_STOP}, "send");
            }
            else if (intent.intent == "command-next-na")
            {
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_NEXT}, "send");
            }
            else if ((intent.intent == "command-previous-na") || intent.intent == "unspecified-na-na" && intent.recognizedText == "previous")
            {
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_PREVIOUS}, "send");
            }
            else if (intent.intent == "command-channel-number")
            {
                this.sendNotification(AppFacade.CHANGE_CHANNEL, {receiveChannel: intent.channel}, "send");
            }
            else if (intent.intent == "command-channel-station")
            {   
                this.sendNotification(AppFacade.CHANGE_CHANNEL, {channelName: intent.stationCallLetters}, "send");
            }
            else if (new RegExp("[play|search]-.*-ondemand").test(intent.intent))
            {
                this.sendNotification(AppFacade.DISPLAY_ONDEMAND, intent, "send");
            }
            else if (intent.intent == "bookmark-bookmark-display")
            {
                this.sendNotification(AppFacade.DISPLAY_BOOKMARKS, intent, "send");
            }
            else if (intent.intent == "bookmark-favorites-display")
            {
                this.sendNotification(AppFacade.DISPLAY_FAVORITES, intent, "send");
            }
            else if (new RegExp("bookmark-.*-add").test(intent.intent))
            {
                intent.isForSecondScreen = true;
                this.sendNotification(AppFacade.SET_BOOKMARKS, intent, "send");
            }
            else if (new RegExp("bookmark-.*-remove").test(intent.intent))
            {
                intent.isForSecondScreen = true;
                this.sendNotification(AppFacade.REMOVE_BOOKMARKS, intent, "send");
            }
            else if (new RegExp(".*who plays.*").test(intent.recognizedText))
            {
                
                if (intent.recognizedActors && intent.recognizedActors.length > 0)
                {
                    
                    console.log("ShellMediator.onintent(): intent.recognizedActors.length = " + intent.recognizedActors.length);
                    console.log("ShellMediator.onintent(): intent.recognizedActors[0].name = " + intent.recognizedActors[0].name);
                    
                    var actor = intent.recognizedActors[0];
                    this.curActorEntityContext = { entityId:actor.uid, entityName:actor.name };
                                   
                    this.sendNotification(
                                          AppFacade.DISPLAY_ENTITY_DETAILS,
                                          {
                                          isForSecondScreen: intent.isForSecondScreen,
                                          entityType:"celebrity",
                                          entityId:actor.uid,
                                          entityName:actor.name,
                                          entityCharacterName:actor.characterName
                                          },
                                          "send");
                }
                else
                {
                    console.log("ShellMediator.onintent(): intent.recognizedActors NOT AVAILABLE");
                }
            }
            else if (intent.intent == "search-movie-na" || intent.intent == "search-na-na")
            {
                // NOTE: [WK] In the case of "na-na" we are temporarily assuming the content is a "movie".
                
                if (intent.recognizedTitles && intent.recognizedTitles.length > 0)
                {
                    console.log("ShellMediator.onintent(): intent.recognizedTitles.length = " + intent.recognizedTitles.length);
                    console.log("ShellMediator.onintent(): intent.recognizedTitles[0].mediaType = " + intent.recognizedTitles[0].mediaType);
                    console.log("ShellMediator.onintent(): intent.recognizedTitles[0].uid = " + intent.recognizedTitles[0].uid);
                    console.log("ShellMediator.onintent(): intent.recognizedTitles[0].name = " + intent.recognizedTitles[0].name);
                    
                    this.sendNotification(
                                          AppFacade.DISPLAY_ENTITY_DETAILS, 
                                          {
                                            isForSecondScreen: intent.isForSecondScreen,
                                            entityType: "movie",
                                            entityId: intent.recognizedTitles[0].uid,
                                            entityName: intent.recognizedTitles[0].name
                                          }, 
                                          "send");
                }
                else if (intent.recognizedActors && intent.recognizedActors.length > 0)
                {
                    var actor = intent.recognizedActors[0];
                    
                    this.curActorEntityContext = { entityId:actor.uid, entityName:actor.name };
                    this.sendNotification(
                                          AppFacade.DISPLAY_ENTITY_DETAILS,
                                          {
                                          isForSecondScreen: intent.isForSecondScreen,
                                          entityType:"celebrity",
                                          entityId:actor.uid,
                                          entityName:actor.name,
                                          entityCharacterName:actor.characterName
                                          },
                                          "send");
                }
                else
                {
                    console.log("ShellMediator.onintent(): intent.recognizedTitles.length NOT AVAILABLE!");
                } 
            }
            else if (intent.intent == "search-tv-na")
            {   
                if (intent.recognizedTitles && intent.recognizedTitles.length > 0)
                {
                    console.log("ShellMediator.onintent(): intent.recognizedTitles.length = " + intent.recognizedTitles.length);
                    console.log("ShellMediator.onintent(): intent.recognizedTitles[0].mediaType = " + intent.recognizedTitles[0].mediaType);
                    console.log("ShellMediator.onintent(): intent.recognizedTitles[0].uid = " + intent.recognizedTitles[0].uid);
                    console.log("ShellMediator.onintent(): intent.recognizedTitles[0].name = " + intent.recognizedTitles[0].name);
                    
                    this.sendNotification(
                                          AppFacade.DISPLAY_ENTITY_DETAILS, 
                                          {
                                            isForSecondScreen: intent.isForSecondScreen,
                                            entityType: "tvSeries",
                                            entityId: intent.recognizedTitles[0].uid,
                                            entityName: intent.recognizedTitles[0].name
                                          }, 
                                          "send");
                }
                else
                {
                    console.log("ShellMediator.onintent(): intent.recognizedTitles.length NOT AVAILABLE!");
                } 
            }
            else if (intent.intent == "command-exit-na")
            {   
                // TODO: [WK] Determine if we should leave this in or not.
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_EXIT}, "send");
            }
            else if (intent.intent == "command-menu-na")
            {   
                // TODO: [WK] Determine if we should leave this in or not.
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_MENU}, "send");
            }
            else if (intent.intent == "command-tv_guide-na")
            {   
                // TODO: [WK] Determine if we should leave this in or not.
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_GUIDE}, "send");
            }
            else if (intent.intent == "command-current_info-na")
            {   
                // TODO: [WK] Determine if we should leave this in or not.
                this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_INFO}, "send");
            }
            else if (intent.intent == "unspecified-na-na")
            {   
                if (intent.recognizedText == "go back" || intent.recognizedText == "back")
                {
                    // TODO: [WK] Determine if we should leave this in or not.
                    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_BACK}, "send");
                }
                else if (intent.recognizedText == "test")
                {
                    console.log("ShellMediator.onintent(): sending test");
                }
                else if (intent.recognizedText == "reset")
                {
                    this.deviceContext = ShellMediator.DEVICE_CONTEXT_HOST;
                    this.sendNotification(AppFacade.RESET_SYSTEM, intent, "send");
                }
                else if (intent.recognizedText == "go home" || intent.recognizedText == "home")
                {
                    this.deviceContext = ShellMediator.DEVICE_CONTEXT_HOST;
                    this.sendNotification(AppFacade.DISPLAY_HOME, intent, "send");
                }
            }
            else
            {
                //TODO: handle unmatched intent (unspecified)
            }
        }
        
        this.facade.sendNotification(AppFacade.ADD_COMMAND_TO_DRAWER, intent);
        this.sendNotification(AppFacade.SHOW_NOTIFICATIONS, {delay:1500, enable:false}, "send");
    }
    catch(e)
    {
        this.getView().setStatus("<p>[ERROR] " + e.message + "</p>", NotificationPanel.NOTIFICATION_STYLE_LEFT);
    }
}

ShellMediator.prototype.onerror = function(error)
{
    console.error("ShellMediator.onerror(): ERROR: " + error);
    this.getView().setStatus('<p>Whoops, please try again...</p>', NotificationPanel.NOTIFICATION_STYLE_LEFT);
}

ShellMediator.prototype.onReadyForAudio = function()
{
    this.getView().setStatus('<p>Listening...</p>', NotificationPanel.NOTIFICATION_STYLE_LEFT);
}


ShellMediator.prototype.onCommandCallback = function(response)
{
    console.log("ShellMediator.onCommandCallback(): response = " + response);
}

ShellMediator.prototype.clearStatus = function()
{
    this.getView().clearNotifications();
}

ShellMediator.prototype.enableStatus = function(enable)
{
    this.getView().enableNotifications(enable);
}

ShellMediator.prototype.introStatus = function()
{
    this.getView().addNotification("<p style='padding-bottom:15px'>Hello there. What would you like to do?</p>", NotificationPanel.NOTIFICATION_STYLE_LEFT, 500);
}

ShellMediator.prototype.showOnTV = function(show)
{
    this.clearAllPanes();
    this.getView().showOnTV(show);
}


ShellMediator.prototype.onRecordClick = function()
{
    this.sendNotification(AppFacade.SHOW_NOTIFICATIONS, {delay:0, enable:true}, "send");
    
    if (this.nvr == null)
    {
        this.nvr = new window.plugins.nuanceVoiceRecognizer();
        this.nvr.onintent = Relegate.create(this, this.onintent, this);
        this.nvr.onerror = Relegate.create(this, this.onerror, this);
        this.nvr.onreadyforaudio = Relegate.create(this, this.onReadyForAudio, this);
    }
    
    if (!this.isRecording)
    {
        this.getView().setStatus('<p>Initializing...<img id="loadingAnimation" src="images/loadingAnimation.gif"></p>', NotificationPanel.NOTIFICATION_STYLE_LEFT);
        this.isRecording = true;
        this.nvr.startRecording();
    } else {
        this.getView().setStatus('<p>Processing...</p>', NotificationPanel.NOTIFICATION_STYLE_LEFT);
        this.isRecording = false;
        this.nvr.stopRecording();
    }
}

ShellMediator.prototype.onRemoteControlReconnectClick = function()
{
    this.sendNotification(AppFacade.CONNECT, this);
}

ShellMediator.prototype.onRemoteControlOKClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_SELECT}, "send");
}

ShellMediator.prototype.onRemoteControlLeftClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_LEFT}, "send");
}

ShellMediator.prototype.onRemoteControlRightClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_RIGHT}, "send");
}

ShellMediator.prototype.onRemoteControlUpClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_UP}, "send");
}

ShellMediator.prototype.onRemoteControlDownClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_DOWN}, "send");
}

ShellMediator.prototype.onRemoteControlAClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_A}, "send");
}

ShellMediator.prototype.onRemoteControlBClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_B}, "send");
}

ShellMediator.prototype.onRemoteControlCClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_C}, "send");
}

ShellMediator.prototype.onRemoteControlPlayClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_PLAY}, "send");
}

ShellMediator.prototype.onRemoteControlPauseClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_PAUSE}, "send");
}

ShellMediator.prototype.onRemoteControlStopClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_STOP}, "send");
}

ShellMediator.prototype.onRemoteControlRecordClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_RECORD}, "send");
}

ShellMediator.prototype.onRemoteControlNextClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_NEXT}, "send");
}

ShellMediator.prototype.onRemoteControlPreviousClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_PREVIOUS}, "send");
}

ShellMediator.prototype.onRemoteControlExitClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_EXIT}, "send");
}

ShellMediator.prototype.onRemoteControlBackClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_BACK}, "send");
}

ShellMediator.prototype.onRemoteControlMenuClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_MENU}, "send");
}

ShellMediator.prototype.onRemoteControlGuideClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_GUIDE}, "send");
}

ShellMediator.prototype.onRemoteControlInfoClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_INFO}, "send");
}

ShellMediator.prototype.onRemoteControlDVRClick = function()
{
    this.sendNotification(AppFacade.SEND_NAVIGATION_EVENT, {eventCode:RAFInputProxy.NAVIGATION_COMMAND_DVR}, "send");
}

ShellMediator.prototype.onRemoteControlResetClick = function()
{
    this.sendNotification(AppFacade.RESET_SYSTEM, {}, "send");
}