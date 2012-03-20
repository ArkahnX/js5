/**
 * Get attributes of a DOM node.
 * @version  1
 * @param  {String} name  Name of attribute. OR object with attribute name/value pairs
 * @param  {String} value (optional) value of attribute.
 */
var fn = function(name, value) {
	var isSet = function(element,name) {
		/**
		 * return value requested
		 */
		if(element.hasAttribute(name)) {
			if(element.attributes[name] === undefined && element.attributes[name]) {
				return true;
			} else {
				return element.attributes[name].value;
			}
		}
	};
	var getAttr = (js5.isString(name) && !value);
	var setAttr = (js5.isString(name) && js5.isString(value));
	var setMultiAttr = (js5.isObject(name) && !value);
	if(getAttr) {
		return isSet(this[0],name);
	} else if(setMultiAttr) {
		/**
		 * set multiple values
		 */
		js5(this).each(function(el) {
			for(var attr in name) {
				el.setAttribute(attr, name[attr]);
			}
		});
	} else if(setAttr) {
		/**
		 * set one value
		 */
		js5(this).each(function(el) {
			el.setAttribute(name, value);
		});
	} else {
		/**
		 * return all attributes in node as an object
		 */
		var attrs = Object.create(null);
		for(var i=0;i<this[0].attributes.length;i++) {
			attrs[this[0].attributes[i].name] = this[0].attributes[i].value;
			attrs.length = i;
		}
		return attrs;
	}
};
extend.push({
	name:"attr",
	target:js5,
	fn:fn,
	core:false,
	canChain:true,
	extensible: false,
	type: "dom"
});
