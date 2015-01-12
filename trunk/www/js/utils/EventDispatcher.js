
/**
* Provides a browser independent generic but simple EventDispatcher class.		
*/
function EventDispatcher()
{
	this.listenerMap = new Object();
}

/**
* Prefix pattern used on map items to prevent name collisions.
*/
EventDispatcher.QUEUE_PATTERN = '@_@';

var o = EventDispatcher.prototype;

/**
* @private
*/
o.listenerMap = null;

/**
* Dispatches an event into the event flow.
*/
o.dispatchEvent = function(event/*EventS*/)
{
	if(typeof event == 'undefined')
		return;

	if(typeof event.type == 'undefined')
		return;

	var queue;
	try{ queue = this.listenerMap[EventDispatcher.QUEUE_PATTERN + event.type].slice(0);}
	catch(e){return};

	var len = queue.length;
	for(var i=0; i<len; i++)
	{
		var listener = queue[i];

		if(typeof event.target == 'undefined')
			event.target = this;

		if(typeof listener == 'function')
			listener.call(this,event);
		else
		{
			if(typeof listener.handleEvent != 'undefined')
				listener.handleEvent.call(listener,event);

			var handler = listener[event.type + 'Handler'];
			if(typeof handler != 'undefined')
				handler.call(listener,event);
		}
	}
}

/**
* Registers an event listener object with an EventDispatcher object so that
* the listener receives notification of an event.
*/
o.addEventListener = function(type/*String*/, listener/*Object*/)
{
	var queue;
	try{ queue = this.listenerMap[EventDispatcher.QUEUE_PATTERN + type]} catch(e){};
	if(typeof queue == 'undefined')
		queue = this.listenerMap[EventDispatcher.QUEUE_PATTERN + type] = new Array();

	var len = queue.length;
	for(var i=0; i<len; i++)
		if(queue[i] == listener)
			return;

	queue.push(listener);
}

/**
* Removes a listener from the EventDispatcher object.
*/
o.removeEventListener = function(type/*String*/, listener/*Object*/)
{
	var queue;
	try{ queue = this.listenerMap[EventDispatcher.QUEUE_PATTERN + type]} catch(e){};
	if(typeof queue == 'undefined')
		return;

	var len = queue.length;
	for(var i=0; i<len; i++)
		if(queue[i] == listener)
		{
			queue.splice(i,1);
			return;
		}
}
