includeJS("js/view/components/NotificationPanel.js");
includeJS("js/view/components/OnDemandPane.js");
includeJS("js/view/components/FavoritesPane.js");
includeJS("js/view/components/QueuePane.js");
includeJS("js/view/components/CelebDetailsPane.js");
includeJS("js/view/components/CelebCreditsPane.js");
includeJS("js/view/components/Drawer.js");

Shell.prototype = new UIComponent;
Shell.prototype.constructor = Shell;

Shell.CLICKRECORD = "click_record";

Shell.CLICK_REMOTE_CONTROL_RECONNECT_BUTTON = "CLICK_REMOTE_CONTROL_RECONNECT_BUTTON";
Shell.CLICK_REMOTE_CONTROL_OK_BUTTON = "CLICK_REMOTE_CONTROL_OK_BUTTON";
Shell.CLICK_REMOTE_CONTROL_LEFT_BUTTON = "CLICK_REMOTE_CONTROL_LEFT_BUTTON";
Shell.CLICK_REMOTE_CONTROL_RIGHT_BUTTON = "CLICK_REMOTE_CONTROL_RIGHT_BUTTON";
Shell.CLICK_REMOTE_CONTROL_UP_BUTTON = "CLICK_REMOTE_CONTROL_UP_BUTTON";
Shell.CLICK_REMOTE_CONTROL_DOWN_BUTTON = "CLICK_REMOTE_CONTROL_DOWN_BUTTON";
Shell.CLICK_REMOTE_CONTROL_A_BUTTON = "CLICK_REMOTE_CONTROL_A_BUTTON";
Shell.CLICK_REMOTE_CONTROL_B_BUTTON = "CLICK_REMOTE_CONTROL_B_BUTTON";
Shell.CLICK_REMOTE_CONTROL_C_BUTTON = "CLICK_REMOTE_CONTROL_C_BUTTON";
Shell.CLICK_REMOTE_CONTROL_PLAY_BUTTON = "CLICK_REMOTE_CONTROL_PLAY_BUTTON";
Shell.CLICK_REMOTE_CONTROL_PAUSE_BUTTON = "CLICK_REMOTE_CONTROL_PAUSE_BUTTON";
Shell.CLICK_REMOTE_CONTROL_STOP_BUTTON = "CLICK_REMOTE_CONTROL_STOP_BUTTON";
Shell.CLICK_REMOTE_CONTROL_RECORD_BUTTON = "CLICK_REMOTE_CONTROL_RECORD_BUTTON";
Shell.CLICK_REMOTE_CONTROL_NEXT_BUTTON = "CLICK_REMOTE_CONTROL_NEXT_BUTTON";
Shell.CLICK_REMOTE_CONTROL_PREVIOUS_BUTTON = "CLICK_REMOTE_CONTROL_PREVIOUS_BUTTON";
Shell.CLICK_REMOTE_CONTROL_EXIT_BUTTON = "CLICK_REMOTE_CONTROL_EXIT_BUTTON";
Shell.CLICK_REMOTE_CONTROL_BACK_BUTTON = "CLICK_REMOTE_CONTROL_BACK_BUTTON";
Shell.CLICK_REMOTE_CONTROL_MENU_BUTTON = "CLICK_REMOTE_CONTROL_MENU_BUTTON";
Shell.CLICK_REMOTE_CONTROL_GUIDE_BUTTON = "CLICK_REMOTE_CONTROL_GUIDE_BUTTON";
Shell.CLICK_REMOTE_CONTROL_INFO_BUTTON = "CLICK_REMOTE_CONTROL_INFO_BUTTON";
Shell.CLICK_REMOTE_CONTROL_DVR_BUTTON = "CLICK_REMOTE_CONTROL_DVR_BUTTON";
Shell.CLICK_REMOTE_CONTROL_RESET_BUTTON = "CLICK_REMOTE_CONTROL_RESET_BUTTON";

Shell.prototype.notificationPanel = null;
Shell.prototype.isRemoteDisplayed = false;

function Shell(divElem)
{
    UIComponent.apply(this, arguments);
    
    document.getElementById('micSlider').addEventListener('touchstart', Relegate.create(this, this.micTouchStart, 'micSlider'), false);
    document.getElementById('micSlider').addEventListener('touchend', Relegate.create(this, this.micTouchEnd, 'micSlider'), false);
    
    document.getElementById('remoteToggle').onclick = Relegate.create(this, this.remoteToggleClick, 'remoteToggle');
    document.getElementById('remoteControlReconnectBtn').onclick = Relegate.create(this, this.remoteControlReconnectBtnClick, 'remoteControlReconnectBtn');
    document.getElementById('remoteControlOKBtn').onclick = Relegate.create(this, this.remoteControlOKBtnClick, 'remoteControlOKBtn');
    document.getElementById('remoteControlLeftBtn').onclick = Relegate.create(this, this.remoteControlLeftBtnClick, 'remoteControlLeftBtn');
    document.getElementById('remoteControlRightBtn').onclick = Relegate.create(this, this.remoteControlRightBtnClick, 'remoteControlRightBtn');
    document.getElementById('remoteControlUpBtn').onclick = Relegate.create(this, this.remoteControlUpBtnClick, 'remoteControlUpBtn');
    document.getElementById('remoteControlDownBtn').onclick = Relegate.create(this, this.remoteControlDownBtnClick, 'remoteControlDownBtn');
    document.getElementById('remoteControlABtn').onclick = Relegate.create(this, this.remoteControlABtnClick, 'remoteControlABtn');
    document.getElementById('remoteControlBBtn').onclick = Relegate.create(this, this.remoteControlBBtnClick, 'remoteControlBBtn');
    document.getElementById('remoteControlCBtn').onclick = Relegate.create(this, this.remoteControlCBtnClick, 'remoteControlCBtn');
    document.getElementById('remoteControlPlayBtn').onclick = Relegate.create(this, this.remoteControlPlayBtnClick, 'remoteControlPlayBtn');
    document.getElementById('remoteControlPauseBtn').onclick = Relegate.create(this, this.remoteControlPauseBtnClick, 'remoteControlPauseBtn');
    document.getElementById('remoteControlStopBtn').onclick = Relegate.create(this, this.remoteControlStopBtnClick, 'remoteControlStopBtn');
    document.getElementById('remoteControlRecordBtn').onclick = Relegate.create(this, this.remoteControlRecordBtnClick, 'remoteControlRecordBtn');
    document.getElementById('remoteControlNextBtn').onclick = Relegate.create(this, this.remoteControlNextBtnClick, 'remoteControlNextBtn');
    document.getElementById('remoteControlPreviousBtn').onclick = Relegate.create(this, this.remoteControlPreviousBtnClick, 'remoteControlPreviousBtn');
    document.getElementById('remoteControlExitBtn').onclick = Relegate.create(this, this.remoteControlExitBtnClick, 'remoteControlExitBtn');
    document.getElementById('remoteControlBackBtn').onclick = Relegate.create(this, this.remoteControlBackBtnClick, 'remoteControlBackBtn');
    document.getElementById('remoteControlMenuBtn').onclick = Relegate.create(this, this.remoteControlMenuBtnClick, 'remoteControlMenuBtn');
    document.getElementById('remoteControlGuideBtn').onclick = Relegate.create(this, this.remoteControlGuideBtnClick, 'remoteControlGuideBtn');
    document.getElementById('remoteControlInfoBtn').onclick = Relegate.create(this, this.remoteControlInfoBtnClick, 'remoteControlInfoBtn');
    document.getElementById('remoteControlDVRBtn').onclick = Relegate.create(this, this.remoteControlDVRBtnClick, 'remoteControlDVRBtn');
    document.getElementById('remoteControlResetBtn').onclick = Relegate.create(this, this.remoteControlResetBtnClick, 'remoteControlResetBtn');
    
    
    this.notificationPanel = new NotificationPanel(document.getElementById('notifications'));
}

Shell.prototype.micTouchStart = function()
{
    var micSlider  = document.getElementById('micSlider');
    var micOn = document.getElementById('micBtn');
    micOn.src = 'images/micOn.png';
    micSlider.style.left = '0px';
    
    this.dispatchEvent( new EventS(Shell.CLICKRECORD) );
}

Shell.prototype.micTouchEnd = function()
{
    var slider  = document.getElementById('micSlider');
    var micOn = document.getElementById('micBtn');
    micOn.src = 'images/micOff.png';
    slider.style.left = '-145px';
    
    this.dispatchEvent( new EventS(Shell.CLICKRECORD) );
}

Shell.prototype.playInitSound = function()
{
    if (this.initAudio == null)
    {
        this.initAudio = new Media('VelvetFogHelloThere.wav');
    }
    this.initAudio.play();

}

Shell.prototype.remoteToggleClick = function()
{
    var remoteSlider  = document.getElementById('remoteSlider');
    
    if (this.isRemoteDisplayed)
    {
        remoteSlider.style.left = '963px';
    }
    else
    {
        remoteSlider.style.left = '720px';
    }
    
    this.isRemoteDisplayed = !this.isRemoteDisplayed;
}

Shell.prototype.remoteControlReconnectBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_RECONNECT_BUTTON) );
}

Shell.prototype.remoteControlOKBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_OK_BUTTON) );
}

Shell.prototype.remoteControlLeftBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_LEFT_BUTTON) );
}

Shell.prototype.remoteControlRightBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_RIGHT_BUTTON) );
}

Shell.prototype.remoteControlUpBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_UP_BUTTON) );
}

Shell.prototype.remoteControlDownBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_DOWN_BUTTON) );
}

Shell.prototype.remoteControlABtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_A_BUTTON) );
}

Shell.prototype.remoteControlBBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_B_BUTTON) );
}

Shell.prototype.remoteControlCBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_C_BUTTON) );
}

Shell.prototype.remoteControlPlayBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_PLAY_BUTTON) );
}

Shell.prototype.remoteControlPauseBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_PAUSE_BUTTON) );
}

Shell.prototype.remoteControlStopBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_STOP_BUTTON) );
}

Shell.prototype.remoteControlRecordBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_RECORD_BUTTON) );
}

Shell.prototype.remoteControlNextBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_NEXT_BUTTON) );
}

Shell.prototype.remoteControlPreviousBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_PREVIOUS_BUTTON) );
}

Shell.prototype.remoteControlExitBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_EXIT_BUTTON) );
}

Shell.prototype.remoteControlBackBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_BACK_BUTTON) );
}

Shell.prototype.remoteControlMenuBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_MENU_BUTTON) );
}

Shell.prototype.remoteControlGuideBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_GUIDE_BUTTON) );
}

Shell.prototype.remoteControlInfoBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_INFO_BUTTON) );
}

Shell.prototype.remoteControlDVRBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_DVR_BUTTON) );
}

Shell.prototype.remoteControlResetBtnClick = function()
{
    this.dispatchEvent( new EventS(Shell.CLICK_REMOTE_CONTROL_RESET_BUTTON) );
}

Shell.prototype.showOnTV = function(show)
{
    var tvDiv = document.getElementById('onTV');
    if (show)
    {
        tvDiv.className = 'fadeIn';
    }
    else
    {
        tvDiv.className = 'fadeOut';
    }
}

Shell.prototype.enableNotifications = function(enable)
{
    this.notificationPanel.enableDisplay(enable);
}

Shell.prototype.clearNotifications = function()
{
    this.notificationPanel.clearNotifications();
}

Shell.prototype.addNotification = function(msg, notificationStyle, delay)
{
    this.notificationPanel.addNotification(msg, notificationStyle, delay);
}

Shell.prototype.setStatus = function(status, notificationStyle)
{
    this.notificationPanel.clearNotifications();
    this.notificationPanel.addNotification(status, notificationStyle);
}


