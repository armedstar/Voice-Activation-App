
/**
* Provides a browser independent generic but simple Event object.		
*/
function EventS
(
	type,
	target
)
{
	this.type = type;
	this.target = target;
}

/**
* The type of event.
*
* Theorically readonly, it must not be modified after the
* <code>EventS</code> object is constructed.
*
* @readonly
*/
EventS.prototype.type/*String*/ = null;

/**
* The event target.
*
* Theorically readonly, it must not be modified after the
* <code>EventS</code> object is constructed.
*
* @readonly
*/
EventS.prototype.target/*Object*/ = null;

/**
* @override
*/
EventS.prototype.toString = function()
{
	return '[EventS] '
	+	'{ type:"' + (this.type || '') + '"'
	+	', target:' + (this.target || '')
	+	'}';
}
