/**
 * Function to create a DOM node.
 * @version 3
 * @param  {String} nodeName   node to create.
 * @param  {Object} attributes (optional) attributes to apply to the node.
 * @return {node}
 */
var fn = function(nodeName,attributes) {
	if(!attributes) {
		return document.createElement(nodeName);
	}
	var node = document.createElement(nodeName);
	for(var attributeName in attributes) {
		if(attributeName === "text" || attributeName === "html") {
			if(attributeName === "text") {
				node.innerText = attributes[attributeName];
			} else {
				node.innerHTML = attributes[attributeName];
			}
		} else {
			node.setAttribute(attributeName,attributes[attributeName]);
		}
	}
	return node;
};
extend.push({
	name:"create",
	target:js5,
	fn:fn,
	core:true,
	canChain:false,
	extensible: false,
	type: "dom",
	requires: "typeOf"
});