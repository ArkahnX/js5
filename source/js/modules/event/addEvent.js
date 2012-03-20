/**
 * Function to add events to existing nodes.
 * @version  3
 * @param  {String}   eventType Type of event to listen for.
 * @param  {domNode}  element   domNode to attach the event to.
 * @param  {Function} callback  Function to call on event trigger.
 * @return {[type]}
 */
var fn = function (eventType, element, callback) {
	var filter = function(eventType, element, callback) {
		var length = element.length;
		for(var i=0;i<length;i++) {
			js5.addEvent(eventType, element[i], callback);
		}
	};
	if (element && element.nodeName || element === window) {
		element.addEventListener(eventType, callback, false);
	} else if (element && element.length) {
		filter(eventType, element, callback);
	}
};
extend.push({
	name: "addEvent",
	target: js5,
	fn: fn,
	core: true,
	canChain: false,
	extensible: false,
	type: "dom"
});