/**
 * Advanced for loop designed to be used by js5.
 * @version 1
 * @param  {[type]}   object   [description]
 * @param  {Function} callback [description]
 * @param  {[type]}   args     [description]
 * @return {[type]}
 */
var fn = function(object,callback,args) {
	var name, i0 = 0,
		length = object.length,
		isObj = length === undefined || js5.isFunction(object);

	if (args) {
		if (isObj) {
			for (name in object) {
				if (callback.apply(object[name], args) === false) {
					break;
				}
			}
		} else {
			for (; i0 < length;) {
				if (callback.apply(object[i0++], args) === false) {
					break;
				}
			}
		}

		// A special, fast, case for the most common use of each
	} else {
		if (isObj) {
			for (name in object) {
				if (callback.call(object[name], name, object[name]) === false) {
					break;
				}
			}
		} else {
			for (; i0 < length;) {
				if (callback.call(object[i0], i0, object[i0++]) === false) {
					break;
				}
			}
		}
	}

	return object;
};
extend.push({
	name:"forEach",
	target:js5,
	fn:fn,
	core:true,
	canChain:false,
	extensible: false
});