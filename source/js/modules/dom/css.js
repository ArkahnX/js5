/**
 * CSS function to cover modification of element inline styles.
 * @version 2
 * @param  {[type]} element     [description]
 * @param  {[type]} type        [description]
 * @param  {[type]} styleObject [description]
 * @return {[type]}
 */
var fn = function(element, type, styleObject) {
	// types nodeList, string, object
	// array for containing values from the query.
	var valArray = [];

	for(var i0=0;i0<element.length;i0++) {
		if(!styleObject && type === "get") {
			valArray.push(element[i0].style.cssText);
		} else if(js5.typeOf(styleObject) === "string") {
			valArray.push(element[i0].style[styleObject]);
		} else {
			for(var attr in styleObject) {
				if(type === "has") {
					if(element[i0].style[attr] === "") {
						valArray.push(false);
					} else {
						valArray.push(true);
					}
				} else if(type === "set") {
					element[i0].style.setProperty(attr,[styleObject[attr]]);
				} else if(type === "remove") {
					if(element[i0].style[attr]) {
						element[i0].style.removeProperty(attr);
					}
				} else if(type === "get") {
					valArray.push(element[i0].style[attr]);
				}
			}
		}
	}
	if(valArray.length > 0) {
		return valArray;
	} else {
		return element;
	}
};
extend.push({
	name:"css",
	target:js5,
	fn:fn,
	core:true,
	canChain:false,
	extensible: false,
	type: "dom"
});
/**
 * Set shortcuts to CSS functions
 */
var fn = function(styleObject) {
	return js5.css(this,"set",styleObject);
};
extend.push({
	name:"setStyle",
	target:js5,
	fn:fn,
	core:false,
	canChain:true,
	extensible: false,
	type: "dom",
	requires: "css"
});
var fn = function(styleObject) {
	return js5.css(this,"remove",styleObject);
};
extend.push({
	name:"removeStyle",
	target:js5,
	fn:fn,
	core:false,
	canChain:true,
	extensible: false,
	type: "dom",
	requires: "css"
});
var fn = function(styleObject) {
	return js5.css(this,"get",styleObject);
};
extend.push({
	name:"getStyle",
	target:js5,
	fn:fn,
	core:false,
	canChain:true,
	extensible: false,
	type: "dom",
	requires: "css"
});
var fn = function(styleObject) {
	return js5.css(this,"has",styleObject);
};
extend.push({
	name:"hasStyle",
	target:js5,
	fn:fn,
	core:false,
	canChain:true,
	extensible: false,
	type: "dom",
	requires: "css"
});