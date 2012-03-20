/**
 * unique function for arrays.
 * @version 1
 * @param  {Array} array An array to make unique.
 * @return {Array}
 */
var fn = function(array) {
	if(array === undefined) {
		var array = this;
	}
	var object = {}, a = [], arrayLength = array.length;
	for(var i = 0; i < arrayLength; ++i){
		if(array[i] in object) {
			continue;
		}
		a.push(array[i]);
		object[array[i]] = 1;
	}
	return a;
};
extend.push({
	name:"unique",
	target:js5,
	fn:fn,
	core:true,
	canChain:true,
	extensible: false,
	type: "array"
});

