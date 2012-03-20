/**
 * Function to add events existing or nonexting nodes.
 * @version 6
 * @param  {String}   eventType Type of event to listen for.
 * @param  {Array}    target    Target to attach the event to.
 * @param  {Function} callback  Callback to run when the event condition is met.
 */
var fn = function (eventType, target, callback) {
	if(js5.isFunction(target) && callback === undefined) {
		js5.addEvent(eventType, this, target);
	} else if(js5.isString(target) && js5.isFunction(callback)) {
		document.addEventListener(eventType, function (event) {
			if(event.target.isSameNode(js5(target))) {
				callback(event);
			}
		}, false);
	}
};
extend.push({
	name: "on",
	target: js5,
	fn: fn,
	core: false,
	canChain: true,
	extensible: false,
	type: "dom",
	requires: ["isFunction","isString","forEach","addEvent"]
});