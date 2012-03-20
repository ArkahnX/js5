/**
 * isEmpty checks if an element has children.
 * @version 1
 * @return {Boolean}
 */
var fn = function() {
	if(!this[0].hasChildNodes()) {
		return true;
	} else {
		return false;
	}
};
extend.push({
	name: "isEmpty",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false,
	type: "dom",
	requires: []
});