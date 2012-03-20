/**
 * get the previous sibling node.
 * @version 1
 * @return {[type]}
 */
var fn = function() {
	var previous = this[0].previousSibling;
	while ( previous.nodeType > 1 ) {
		previous = previous.previousSibling;
	}
	return previous;
};
extend.push({
	name: "previous",
	target: js5,
	fn: fn,
	core: false,
	canChain: true,
	extensible: false,
	type: "dom",
	requires: []
});