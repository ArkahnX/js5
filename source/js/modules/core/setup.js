/**
 * Setup function for js5
 * @version 2
 * @param  {Object} options Options to use to set up js5
 */
var fn = function(options) {
	if(options.$) {
		if(window.$ === undefined) {
			window.$ = js5;
		} else {
			if(options.$ === true) {
				window.$ = js5;
			}
		}
	}
	Object.preventExtensions(js5);
};
extend.push({
	name:"setup",
	target:js5,
	fn:fn,
	core:true,
	canChain:false,
	extensible: false,
	type: "dom"
});