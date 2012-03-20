/**
 * Function to call any JS5 function without needing to know the case of the name. May be deprecated.
 * @version 1
 * @param  {[type]} name       [description]
 * @param  {[type]} parameters [description]
 * @return {[type]}
 */
var fn = function (name, parameters) {
	if(js5.inArray(name.toLowerCase(), js5.array)) {
		return js5[js5.array[name.toLowerCase()]](parameters);
	}
};
extend.push({
	name: ["run", "then"],
	target: js5,
	fn: fn,
	core: true,
	canChain: true,
	extensible: false
});