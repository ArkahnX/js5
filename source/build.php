<?php
/**
 * modified 20/03/2012 3:00 PM
 */
$start = microtime(true);
date_default_timezone_set('America/Vancouver');
$time = date('D M j H:i:s Y e');
$version = "0.1.0";
$internalBuild = json_decode(file_get_contents("data.json"));
$build = $internalBuild->{"build"}+1;

// Report all PHP errors
error_reporting(-1);
ini_set('error_reporting', E_ALL);
include("functions.php");
function is_empty_folder($dir) {
	if (is_dir($dir)) {
		$dl=opendir($dir);
		if ($dl) {
			while($name = readdir($dl)) {
				if (!is_dir("$dir/$name")) {
					return false;
					break;
				}
			}
			closedir($dl);
		}
		return true;
	} else {
		return true;
	}
}
function get($name,$type) {
	if(isset($name) && $name !== null) {
		if($_SERVER["SERVER_NAME"] === "localhost") {
			$server = "http://".$_SERVER["SERVER_NAME"]."/JS5/source/";
		} else {
			$server = "http://".$_SERVER["SERVER_NAME"]."/"."source/";
		}
		$local = $server.$name;

	}
	if($type === "version") {
		$version = parseValue(getLine($local,3)," ");
		return $version;
	} else if($type === "function") {
		return file_get_contents($local);
	} else if($type === "fileNames") {
		return implode(",", find_all_files("js/modules"));
	}
}
function find_all_files($dir) {
	$root = scandir($dir);
	foreach($root as $value) {
		if($value === '.' || $value === '..') {
			continue;
		}
		if(is_file("$dir/$value")) {
			$result[]="$dir/$value";
			continue;
		}
		if(!is_empty_folder("$dir/$value")) {
			foreach(find_all_files("$dir/$value") as $value) {
				$result[]=$value;
			}
		}
	}
	return $result;
}
function set($fileName,$data) {
	$fp = fopen($fileName, 'w');
	fwrite($fp, $data);
	fclose($fp);
}
function getline($file, $linenum, $linelen = 8192) {
	$handle = fopen($file, "r");

	if ($handle) {
		while (!feof($handle)) {
			$linenum -= 1;
			$buffer = fgets($handle, $linelen); // Read a line.
			if (!$linenum) return $buffer;
		}
		fclose($handle); // Close the file.
	}

	return -1;
}
function parseValue($string,$param) {
	$content = explode($param,$string);
	$content = $content[count($content)-1];
	return $content;
}
function buildDev($license) {
	global $time, $version, $build, $internalBuild;
	$server = "http://".$_SERVER["SERVER_NAME"]."/JS5/source/";

	$moduleNames = get(null,"fileNames");
	$moduleNames = explode(",",$moduleNames);
	$modules = "";
	echo makeTime("grabbing modules");
	for($i=0;$i<sizeof($moduleNames);$i++) {
		$thisModule = $moduleNames[$i];
		if($thisModule !== "index") {
			echo makeTime($thisModule);
			$build += get($thisModule,"version");
			$modules .= "\n(function(js5) {\n".get($thisModule,"function")."\n"."}(js5));\n";
		}
	}
	echo makeTime("doing JSON stuff");
	$fp = fopen('data.json', 'w');
	$JSONtime = date("D M d Y H:i:s TO (e)");
	fwrite($fp, '{"time":"'.$JSONtime.'","build":"'.($internalBuild->{"build"}+1).'"}');
	fclose($fp);
	echo makeTime("compiling js5");
	$string = get("js/js5.js","function");
	$patterns = array();
	$patterns[0] = '/\/\/#license/';
	$patterns[1] = '/\/\/#extend/';
	$patterns[2] = '/\/\/#modules/';
	$replacements = array();
	$replacements[0] = $license;
	$replacements[1] = get("js/extend.js","function");
	$replacements[2] = $modules;
	ksort($patterns);
	ksort($replacements);
	$file = preg_replace($patterns, $replacements, $string);
	echo makeTime("saving js5");
	set("../build/js5-build.js",$file);
	echo makeTime("all done");
}
function buildPretty($license) {
	echo makeTime("prettying js5");
	$c = new PhpClosure();
	$c->add("../build/js5-build.js")
	  ->prettyPrint()
	  ->writeTo("../build/js5.js",$license,false);
	echo makeTime("all done");
}
function buildUgly($license) {
	echo makeTime("uglifying js5");
	$c = new PhpClosure();
	$c->add("../build/js5-build.js")
	  ->simpleMode()
	  ->writeTo("../build/js5-min.js",$license,false);
	echo makeTime("all done");
}
function buildLicense() {
	global $time, $version, $build;
	echo makeTime("building license");
	$string = get("license.php","function");
	$patterns = array();
	$patterns[0] = '/\/\/#time/';
	$patterns[1] = '/\/\/#version/';
	$replacements = array();
	$replacements[0] = $time;
	$replacements[1] = "Version ".$version." - ".$build;
	ksort($patterns);
	ksort($replacements);
	return preg_replace($patterns, $replacements, $string);
}
if(isset($_GET["type"])) {
	$type = $_GET["type"];
	$license = buildLicense();
	echo makeTime("building: <b>".$type."</b>",false);
	echo makeTime("<pre>",false);
	if($type === "all") {
		include("php-closure.php");
		buildDev($license);
		buildPretty($license);
		buildUgly($license);
	} else if($type === "dev") {
		buildDev($license);
	} else if($type === "prty") {
		include("php-closure.php");
		buildPretty($license);
	} else if($type === "min") {
		include("php-closure.php");
		buildUgly($license);
	} else {
		index();
	}
	index();
} else {
	index();
}
?>