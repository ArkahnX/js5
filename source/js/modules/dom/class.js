/**
 * Class function to cover modification of element classes.
 * @version 2
 * @param  {[type]} element   [description]
 * @param  {[type]} type      [description]
 * @param  {[type]} classList [description]
 * @return {[type]}
 */
var fn = function (element, type, classList) {
	// types nodeList, string, array
	if(type === "has") {
		return element[0].classList.contains(classList[0]);
	}
	for(var i0 = 0; i0 < element.length; i0++) {
		for(var i1 = 0; i1 < classList.length; i1++) {
			if(type === "add") {
				if(!element[i0].classList.contains(classList[i1])) {
					element[i0].classList.add(classList[i1]);
				}
			} else if(type === "remove") {
				if(element[i0].classList.contains(classList[i1])) {
					element[i0].classList.remove(classList[i1]);
				}
			} else if(type === "toggle") {
				element[i0].classList.toggle(classList[i1]);
			}
		}
	}
	return element;
};
extend.push({
	name: "classFunction",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false,
	type: "dom"
});
/**
 * Add shorthand ClassList functions.
 */
var fn = function(classList) {
	var element = this;
	if(classList) {
		return js5.classFunction(element,"add",arguments);
	}
};
extend.push({
	name: "addClass",
	target: js5,
	fn: fn,
	core: false,
	canChain: true,
	extensible: false,
	type: "dom"
});
var fn = function(classList) {
	var element = this;
	if(classList) {
		return js5.classFunction(element,"remove",arguments);
	}
};
extend.push({
	name: "removeClass",
	target: js5,
	fn: fn,
	core: false,
	canChain: true,
	extensible: false,
	type: "dom"
});
var fn = function(classList) {
	var element = this;
	if(classList) {
		return js5.classFunction(element,"toggle",arguments);
	}
};
extend.push({
	name: "toggleClass",
	target: js5,
	fn: fn,
	core: false,
	canChain: true,
	extensible: false,
	type: "dom"
});
var fn = function(classList) {
	var element = this;
	if(classList) {
		return js5.classFunction(element,"has",arguments);
	}
};
extend.push({
	name: "hasClass",
	target: js5,
	fn: fn,
	core: false,
	canChain: true,
	extensible: false,
	type: "dom"
});