/**
 * [fn description]
 * @version 1
 * @type {Array}
 */
var fn = ["a","abbr","address","area","article","aside","audio","b","base","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","command","datalist","dd","del","details","dfn","div","dl","dt","em","embed","eventsource","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","mark","map","menu","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","ruby","rp","rt","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","ul","var","video","wbr"];
extend.push({
	name:"tagNames",
	target:js5,
	fn:fn,
	core:true,
	canChain:false,
	extensible: false,
	type: "dom"
});