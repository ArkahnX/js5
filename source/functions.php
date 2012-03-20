<?php
/**
 * functions.php
 * includes common use functions.
 */

function index($location = "../") {
	global $start;
	echo makeTime("</pre>",false);
	$end = microtime(true);
	$time = $end - $start;
	echo makeTime("took <b>$time</b> to complete.\n<br>",false);
	echo makeTime("<a href=\"../\">Return to Index</a>",false);
	if(!isset($_GET["debug"])) {
		header("Location: ".$location);
	}
}
function makeTime($string, $useTime = true) {
	if(isset($_GET["debug"])) {
		if($useTime) {
		return microtime(true).": ".$string."\n";
		} else {
		return $string."\n";
		}
	}
}
?>