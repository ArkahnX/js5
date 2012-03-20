/**
 * [fn description]
 * @version 1
 * @param  {[type]} parameters   [description]
 * @return {[type]}
 */
var fn = function(callback) {
	return /in/.test(document.readyState)
		?setTimeout(function() {
			return js5.ready(callback);
		},9)
		:callback();
};
extend.push({
	name: "ready",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false,
	requires: []
});