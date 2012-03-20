/**
 * Function to test if string is in an array
 * @version 2
 * @param  {[type]} value [description]
 * @param  {[type]} array [description]
 * @return {[type]}
 */
var fn = function(value,array) {
	if(array === undefined) {
		var array = this;
	}
	if(array.indexOf) {
		return array.indexOf(value)
	}
	return Array.prototype.indexOf(array, value);
};
extend.push({
	name:"inArray",
	target:js5,
	fn:fn,
	core:true,
	canChain:true,
	extensible: false,
	type: "array",
	requires: "typeOf"
});