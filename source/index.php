<?php
function isLocal() {
	if($_SERVER["SERVER_NAME"] === "localhost") {
		return true;
	} else {
		return false;
	}
}
function debug() {
	if(isLocal()) {
		echo"&debug=true";
	}
}
?>
<!DOCTYPE HTML>
<html>
<head>
	<title>JS5 Compiler</title>
	<link href="source/index.css" rel="stylesheet" type="text/css" />
	<script src="build/js5-build.js"></script>
	<script src="source/moment.min.js"></script>
	<script>
	var time = <?php echo file_get_contents("source/data.json"); ?>;
	js5.ready(function() {
		js5.setup({$:true});
		var now = moment(time.time).fromNow();
		if(moment().diff(moment(time.time), 'days') > 2) {
			document.getElementById("details").innerText = "You may want to rebuild, the last build was "+now;
		} else {
			document.getElementById("details").innerText = "Last build was "+now;
		}
		js5("a[data-build]").on("click",function() {
			js5(".overlay").toggleClass("hidden");
		});
	});
	</script>
</head>
<body>
	<div class="hidden overlay"><h1>Loading...</h1></div>
	<p id="details"></p>
	<h1>Basics</h1>
	<ul>
		<li><a href="source/download.php?type=min" download="js5.js">Download js5</a></li>
		<li><a href="source/download.php?type=compilersource" download="js5-source.zip" data-build>Download js5 Compiler + Source</a></li>
		<li><a href="source/build.php?type=min<?php debug();?>" data-build>Test on this page</a></li>
	</ul>
	<ul>
		<li>
			<h2>View js5</h2>
		</li>
	</ul>
	<ul>
		<li><a href="source/download.php?type=dev">Developer</a></li>
		<li><a href="source/download.php?type=prty">Google Closure Prettified</a></li>
		<li><a href="source/download.php?type=min">Google Closure Minified</a></li>
	</ul>
	<ul>
		<li>
			<h1><a href="#advanced">Advanced</a></h1>
		</li>
	</ul>
	<div id="advanced">
		<ul>
			<li>
				<small><a href="#">(close)</a></small>
			</li>
		</ul>

		<ul>
			<li>
				<h2>Rebuild js5</h2>
			</li>
		</ul>
		<p>(May take a few seconds, page will reload)</p>
		<ul>
			<li><a href="source/build.php?type=all<?php debug();?>" data-build>All</a></li>
			<li><a href="source/build.php?type=dev<?php debug();?>" data-build>Developer</a></li>
			<li><a href="source/build.php?type=pretty<?php debug();?>" data-build>Google Closure Prettified</a></li>
			<li><a href="source/build.php?type=min<?php debug();?>" data-build>Google Closure Minified</a></li>
		</ul>
		<ul>
			<li>
				<h2>Alternative downloads</h2>
			</li>
		</ul>
		<ul>
			<li><a href="source/download.php?type=dev" download="js5.js">Developer</a></li>
			<li><a href="source/download.php?type=prty" download="js5.js">Google Closure Prettified</a></li>
			<li><a href="source/download.php?type=min" download="js5.js">Google Closure Minified</a></li>
		</ul>
		<?php if(isLocal()){?>
			<ul>
				<li>
					<h2>Upload js5 Source</h2>
				</li>
			</ul>
			<p>(May take upwards of 30 seconds) <b>Make sure you have a details file for ftp!</b></p>
			<ul>
				<li><a href="source/upload.php?type=all<?php debug();?>" data-build>All</a></li>
				<li><a href="source/upload.php?type=src<?php debug();?>" data-build>Source</a></li>
				<li><a href="source/upload.php?type=bld<?php debug();?>" data-build>Build</a></li>
				<li><a href="source/upload.php?type=ext<?php debug();?>" data-build>Extensions</a></li>
			</ul>
		<?php }?>
	</div>
</body>
</html>