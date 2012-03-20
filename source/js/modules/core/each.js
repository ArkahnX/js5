/**
 * simplified each function for use with or without dom selection.
 * @version 1
 * @param  {Function} callback [description]
 * @param  {[type]}   args     [description]
 * @return {[type]}
 */
var fn = function(callback,args) {
	return js5.forEach(this, callback, args);
};
extend.push({
	name:"each",
	target:js5,
	fn:fn,
	core:true,
	canChain:true,
	extensible: false,
	requires: "forEach",
	type: ["dom","array"]
});