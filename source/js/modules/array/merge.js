/**
 * Merge arrays. Based off of jQuery.merge
 * @version 1
 * @param  {[type]} first  [description]
 * @param  {[type]} second [description]
 * @return {[type]}
 */
var fn = function (first, second) {
    if(second === undefined) {
        var second = first;
        var first = this;
    }
    var firstLength = first.length,
        j = 0;
    if (typeof second.length === "number") {
        for (var secondLength = second.length; j < secondLength; j++) {
            first[firstLength++] = second[j];
        }
    } else {
        while (second[j] !== undefined) {
            first[firstLength++] = second[j++];
        }
    }

    first.length = firstLength;

    return first;
}
extend.push({
	name:"merge",
	target:js5,
	fn:fn,
	core:true,
	canChain:true,
	extensible: false,
    type: "array"
});