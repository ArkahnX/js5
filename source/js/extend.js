/**
 * Extend function to add objects to a target.
 * @param  {Array}        name        names to attach the function to.
 * @param  {!falsey}      target      Target to attach the parameter to.
 * @param  {Function}     fn          Parameter definition, typically a function.
 * @param  {Boolean}   	  core        Is a core method? js5.fn()
 * @param  {Boolean}	  canChain    Is a chainable method? js5().fn()
 * @param  {Boolean}  	  extensible  Can this parameter be extended?
 * @param  {String}  	  type        Type of function to attach parameter to. Type is irrelevant for core objects.
 * @param  {Object}  	  js5         Include js5 to make sure we use the right function.
 * @return {JS5}
 */
var extend = function(name,target,fn,core,canChain,extensible,type,js5) {
	"use strict";
	var create = function(name,target,extensible,value) {
		if(extensible) {
			Object.defineProperty(target,name,{
				value:value,
				writable:true,
				configurable:true,
				enumerable:false
			});
		} else {
			Object.defineProperty(target,name,{
				value:value,
				writable:false,
				configurable:false,
				enumerable:false
			});
		}
	};
	for(var i=0;i<name.length;i++) {
		// Only add the parameter if it isn't already set.
		if(!target[name[i]] || Object.isFrozen(target[name[i]])) {
			if(core) {
				create(name[i],target,extensible,fn);
				if(!extensible) {
					Object.freeze(target[name[i]]);
					Object.preventExtensions(target[name[i]]);
				}
			}
			if(canChain) {
				if(type !== null) {
					if(typeof type !== "string") {
						for(var i=0;i<type.length;i++) {
							if(!target.fn[type[i]]) {
								target.fn[type[i]] = Object.create(target.construct);
							}
							create(name[i],target.fn[type[i]],extensible,fn);
							if(!extensible) {
								Object.freeze(target.fn[type[i]][name[i]]);
								Object.preventExtensions(target.fn[type[i]][name[i]]);
							}
						}
					} else {
						if(!target.fn[type]) {
							target.fn[type] = Object.create(target.construct);
						}
						create(name[i],target.fn[type],extensible,fn);
						if(!extensible) {
							Object.freeze(target.fn[type][name[i]]);
							Object.preventExtensions(target.fn[type][name[i]]);
						}
					}
				}
				create(name[i],target.fn,extensible,fn);
				if(!extensible) {
					Object.freeze(target.fn[name[i]]);
					Object.preventExtensions(target.fn[name[i]]);
				}
			}
		}
	}
	return js5;
};

/**
 * Push values to the extend function, and add any missing values.
 * @param  {Object} options Options for adding an object to js5, described in the extend function above.
 * @return {JS5}
 */
extend.push = function(options) {
	var defaultOptions = {
		name:null,
		target:js5,
		fn:null,
		core:true,
		canChain:true,
		extensible:false,
		type:null
	};
	/**
	 * Use defaults for variables that aren't set.
	 */
	var name = options.name || defaultOptions.name;
	var target = options.target || defaultOptions.target;
	var fn = options.fn || defaultOptions.fn;
	/**
	 * the above tactic does not work for falsey values such as "false" so we need to check if it is non-boolean
	 */
	if(typeof options.core !== "boolean") {
		var core = defaultOptions.core;
	} else {
		var core = options.core;
	}
	if(typeof  options.canChain !== "boolean") {
		var canChain = defaultOptions.canChain;
	} else {
		var canChain = options.canChain;
	}
	if(typeof  options.extensible !== "boolean") {
		var extensible = defaultOptions.extensible;
	} else {
		var extensible = options.extensible;
	}
	var type = options.type || defaultOptions.type;
	if(name === null || fn === null || target === undefined) {
		return js5;
	}
	// The name parameter can either be an array or string, allowing mapping the same function to multiple locations.
	if(typeof name === "string") {
		// Name must be an array
		name = [name];
	}
	return extend(name,target,fn,core,canChain,extensible,type,js5);
};
/**
 * Add extend to JS5 Core, but prevent it from spreading to other modules.
 */
extend.push({
	name:"extend",
	target:js5,
	fn:extend,
	core:true,
	canChain:false,
	extensible: false
});