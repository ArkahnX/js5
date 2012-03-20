/*!
 * JS5 JavaScript Library //#version
 * http://js5.arka-tech.net
 *
 * Copyright 2012, Christopher Hall
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Date: //#time
 */
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