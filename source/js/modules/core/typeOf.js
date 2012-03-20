/**
 * Function to return the type of the object supplied.
 * @version 2
 * @param  {[type]} obj [description]
 * @return {[type]}
 */
var fn = function (obj) {
	// types anything except undefined
	if(!obj) {
		/**
		 * Use this in situations like js5().typeof()
		 */
		return({}).toString.call(this).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	}
	if(typeof obj === "undefined") {
		return "undefined";
	}
	return({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
extend.push({
	name: "typeOf",
	target: js5,
	fn: fn,
	core: true,
	canChain: true,
	extensible: false
});
var fn = function (input) {
	if(js5.typeOf(input) === "function") {
		return true;
	} else {
		return false;
	}
};
extend.push({
	name: "isFunction",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false
});
var fn = function (input) {
	if(js5.typeOf(input) === "object") {
		return true;
	} else {
		return false;
	}
};
extend.push({
	name: "isObject",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false
});
var fn = function (input) {
	if(js5.typeOf(input) === "string") {
		return true;
	} else {
		return false;
	}
};
extend.push({
	name: "isString",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false
});
var fn = function (input) {
	if(js5.typeOf(input) === "array") {
		return true;
	} else {
		return false;
	}
};
extend.push({
	name: "isArray",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false
});
var fn = function (input) {
	if(js5.typeOf(input) === "nodelist") {
		return true;
	} else {
		return false;
	}
};
extend.push({
	name: "isNodelist",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false
});
var fn = function (input) {
	if(js5.typeOf(input) === "null") {
		return true;
	} else {
		return false;
	}
};
extend.push({
	name: "isNull",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false
});
var fn = function (input) {
	if(js5.typeOf(input) === "boolean") {
		return true;
	} else {
		return false;
	}
};
extend.push({
	name: "isBoolean",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false
});