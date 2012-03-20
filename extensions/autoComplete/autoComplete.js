
(function($) {
	var cache = [];
	var defaultOptions = {
		input: this,
		output: "#autoCompleteResults",
		names: [],
		maxResults: 5
	};
	var autoComplete = function(input,names,maxResults) {
		var accept = [];
		if(input.length > 0) {
			for(var i=0;i<names.length;i++) {
				var index = [];
				var thisName = names[i].toLowerCase();
				for(var e=0;e<input.length;e++) {
					if(thisName.indexOf(input[e].toLowerCase()) !== -1) {
						index.push("true");
					} else {
						index.push("false");
					}
				}

				if(index.indexOf("false") === -1) {
					accept.push(names[i]);
				}
			}
			if(accept.length > maxResults) {
				accept.length = maxResults;
			}
		}
		return accept;
	};
	var fn = function(options) {
		input = options.input || defaultOptions.input;
		output = options.output || defaultOptions.output;
		names = options.names || defaultOptions.names;
		maxResults = options.maxResults || defaultOptions.maxResults;
		$(input).on("keyup", function(event) {
			/**
			 * Cache js5 elements for later use.
			 */
			var outputElement = $(output);
			var firstOutput = outputElement[0];
			var query = event.target.value;
			if(!$.compareArray($.unique(query.split("")),cache) || !event.target.value) {
				cache = $.unique(query.split(""));
				var results = autoComplete(query,names,maxResults);
				if(results.length === 0) {
					while(firstOutput.firstChild) {
						firstOutput.removeChild(firstOutput.firstChild);
					}
				}
				if(results.length > 0) {
					while(firstOutput.firstChild) {
						firstOutput.removeChild(firstOutput.firstChild);
					}
					var fragment = document.createDocumentFragment();
					for(var i=0;i<results.length;i++) {
						var name = "";
						var originalName = results[i];
						var array = [];
						for(var e=0;e<query.length;e++) {
							for(var f=0;f<originalName.length;f++) {
								if(originalName[f].toLowerCase() === query[e].toLowerCase()) {
									array[f] = true;
								}
							}
						}
						for(var e=0;e<originalName.length;e++) {
							if(array[e] === true) {
								name += "<b>"+originalName[e]+"</b>";
							} else {
								name += originalName[e];
							}
						}
						var node = $.create("li",{"data-name":originalName,"html":name});
						fragment.appendChild(node);
					}
					outputElement.append(fragment.cloneNode(true));
				}
			}
		});
	};
	$.extend.push({
		name:"autoComplete",
		fn:fn,
		extensible:true,
		type:"dom"
	});
}(js5));
