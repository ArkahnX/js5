/**
 * Function to remove a dom node from it's parent without needing to know the parent.
 * @version 2
 * @return {[type]}
 */
// Remove function (Removing dom Nodes)
var fn = function () {
	for (var i0 = 0, elem;(elem = this[i0]) != null; i0++) {
		if (elem.parentNode) {
			elem.parentNode.removeChild(elem);
		}
	}

	return this;
};
extend.push({
	name:"remove",
	target:js5,
	fn:fn,
	core:false,
	canChain:true,
	extensible: false,
	type: "dom"
});