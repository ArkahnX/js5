/**
 * unique function for arrays.
 * @version 1
 * @param  {Array} array An array to make unique.
 * @return {Array}
 */
/**
 * [fn description]
 * @param  {Array} array1 The array to check with.
 * @param  {Array} array2 The array to check against.
 * @return {Array}
 */
var fn = function(array1, array2) {
    if(array2 === undefined) {
        var array2 = this;
    }
    if (array1.length !== array2.length) {
        return false;
    }
    for (var i = 0; i < array2.length; i++) {
        if (js5.isArray(array1[i])) { //likely nested array
            if (!js5.compareArray(array1[i],array2[i])) {
                return false;
            } else {
                continue;
            }
        }
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
};
extend.push({
	name:"compareArray",
	target:js5,
	fn:fn,
	core:true,
	canChain:true,
	extensible: false,
    type: "array"
});

