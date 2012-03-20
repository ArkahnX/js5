/**
 * Add functions to target from JS5 core.
 * @version 2
 * @param   {[type]} target [description]
 * @return  {target}
 */
var fn = function(target) {
	// deprecated
	for(var attr in js5.array) {
		Object.defineProperty(target,js5.array[attr],{
			value:js5.fn[js5.array[attr]],
			writable:false,
			configurable:false,
			enumerable:false
		});
	}
	return target;
};
extend.push({
	name:"add",
	target:js5,
	fn:fn,
	core:true,
	canChain:false,
	extensible: false
});

