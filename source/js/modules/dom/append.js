/**
 * appends a node to the selected node.
 * @version 2
 * @param  {nodeObject} node [description]
 * @return {nodeList}
 */
var fn = function(node) {
	for(var i0=0;i0<this.length;i0++) {
		this[i0].appendChild(node);
	}
	return this
};
extend.push({
	name:"append",
	target:js5,
	fn:fn,
	core:false,
	canChain:true,
	extensible: false,
	type: "dom"
});

