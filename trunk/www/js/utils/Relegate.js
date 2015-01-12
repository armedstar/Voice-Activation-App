
/**
 * An helper to redirect a method call to the specified target while retaining
 * original arguments of the call.
 */
function Relegate(){}
Relegate.create = function(t,f)
{
	var a = new Array();
	for(var i=2; i<arguments.length; i++)
		a.push(arguments[i]);

	return function()
	{
		var b = new Array();
		for(var i=0; i<arguments.length; i++)
			b.push(arguments[i]);

		return f.apply
		(
			t,
			b.concat(a)
		);
	};
}
