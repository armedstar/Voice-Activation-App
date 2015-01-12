
NotificationPanel.prototype = new UIComponent;
NotificationPanel.prototype.constructor = NotificationPanel;

NotificationPanel.NOTIFICATION_STYLE_LEFT = "left";
NotificationPanel.NOTIFICATION_STYLE_RIGHT = "right";

function NotificationPanel(divElem)
{
    UIComponent.apply(this, arguments);
    this.notifications = new Array();
}


NotificationPanel.prototype.addNotification = function(message, notificationStyle, delay)
{
    if (delay)
    {
        setTimeout(Relegate.create(this, this.doAddNotification, message, notificationStyle), delay);
    }
    else 
    {
        this.doAddNotification(message, notificationStyle);
    }
}

NotificationPanel.prototype.doAddNotification = function(message, notificationStyle)
{
    var msg = { "message":message, "notificationStyle":notificationStyle };
    this.notifications.push(msg);
    var msg_id = msg.notificationStyle + "Bubble";
    var subBubbleIdPrefix;
    if (msg.notificationStyle == NotificationPanel.NOTIFICATION_STYLE_RIGHT)
    {
        subBubbleIdPrefix = "r";
    }
    else
    {
        subBubbleIdPrefix = "l";
    }
    
    var html = "<div id='" + msg_id + "' style='display:block'><div id='" + subBubbleIdPrefix + "BubbleTop'></div><div id='" + subBubbleIdPrefix + "BubbleMain'>" + msg.message + "</div><div id='" + subBubbleIdPrefix + "BubbleBottom'></div></div>";
    
    this.divElem.innerHTML += html;
}


NotificationPanel.prototype.getNotifications = function()
{
    return this.notifications;
}

NotificationPanel.prototype.clearNotifications = function()
{
    this.notifications = new Array();
    this.divElem.innerHTML = "";
}


NotificationPanel.prototype.enableDisplay = function(enable)
{
    this.divElem.style.display = (enable) ? "block" : "none";
}