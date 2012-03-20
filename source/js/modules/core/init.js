/**
 * Initialization function for js5, detects the type of input and maps relevant functions to it.
 * @version  7
 * @param  {Object} context  context init was called from.
 * @param  {Many}   selector Input.
 * @return {js5}
 */
var fn = function(context,selector) {
	if(!selector) {
		return Object.create(js5.fn);
	}
	if (selector === "body" && document.body) {
		var result = Object.create(js5.fn.dom);
		return js5.merge(result,document.body);
	} else if(selector.nodeType) {
		var result = Object.create(js5.fn.dom);
		return js5.merge(result,[selector]);
	} else if(js5.isString(selector) && js5.inArray(selector,js5.tagNames) !== -1) {
		var result = Object.create(js5.fn.dom);
		return js5.merge(result,document.getElementsByTagName(selector));
	} else if(js5.isString(selector)) {
		var result = Object.create(js5.fn.dom);
		if (selector.charAt(0) === "#" && selector.indexOf(" ") === -1) {
			return js5.merge(result,[document.getElementById(selector.substr(1))]);
		}
		return js5.merge(result,document.querySelectorAll(selector));
	} else if(selector.constructor === js5) {
		return selector;
	} else if(js5.isArray(selector)) {
		var result = Object.create(js5.fn.array);
		return js5.merge(result,selector);
	} else if(js5.isObject(selector)) {
		var result = Object.create(js5.fn.object);
		return js5.merge(result,selector);
	}
	return result;
};

extend.push({
	name:"init",
	target:js5,
	fn:fn,
	core:true,
	canChain:false,
	extensible: false,
	requires: ["isString","isObject","tagNames","inArray","merge","isArray"]
});