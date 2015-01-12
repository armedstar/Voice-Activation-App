UIComponent.prototype = new Object();
UIComponent.prototype.constructor = UIComponent;
UIComponent.prototype.divElem = null;
UIComponent.prototype.eventDispatcher = null;


function UIComponent(divElem)
{
    this.divElem = divElem;
    this.eventDispatcher = new EventDispatcher();
}

UIComponent.prototype.dispatchEvent = function(event)
{
    event.target = this;
    this.eventDispatcher.dispatchEvent(event);
}

UIComponent.prototype.addEventListener = function(type, listener)
{
    this.eventDispatcher.addEventListener(type, listener);
}

UIComponent.prototype.enableDisplay = function(enable)
{
    if (this.divElem)
    {
        this.divElem.className = (enable) ? "animateIn" : "animateOut";
        this.divElem.style.display = (enable) ? "block" : "none";
    }
}
