/**
 * Get the next sibling node.
 * @version 1
 * @return {node}
 */
var fn = function() {
	var next = this[0].nextSibling;
	while ( next.nodeType > 1 ) {
		next = next.nextSibling;
	}
	return next;
};
extend.push({
	name: "next",
	target: js5,
	fn: fn,
	core: false,
	canChain: true,
	extensible: false,
	type: "dom",
	requires: []
});