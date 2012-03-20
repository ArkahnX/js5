//#license
(function (window, undefined) {
	var document = window.document,
		navigator = window.navigator,
		location = window.location;
	/**
	 * [ description]
	 * @return {[type]}
	 */
	var js5 = (function () {
		// Default function call that returns an array of elements, with access to the rest of js5.
		var js5 = function (type) {
			return new js5.init(this,type);
		};
		js5.fn = {
			constructor: js5,
			push: [].push,
			splice: [].splice,
			sort: [].sort,
			concat: [].concat,
			indexOf: [].indexOf,
			length: 0
		};
		js5.construct = {
			constructor: js5,
			push: [].push,
			splice: [].splice,
			sort: [].sort,
			concat: [].concat,
			indexOf: [].indexOf,
			length: 0
		};
		//#extend
		//#modules
		js5.init.prototype = js5.fn;
		return js5;
	}());
	// Expose js5 to the global object.
	window.js5 = js5;
	// Expose js5 to any AMD loaders.
	if(typeof define === "function" && define.amd) {
		define("js5", [], function () {
			return js5;
		});
	}
}(window));