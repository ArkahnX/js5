<?php
/**
 * modified 08/03/2012 3:21 PM
 */
$start = microtime(true);
// Report all PHP errors
error_reporting(-1);
ini_set('error_reporting', E_ALL);
include("functions.php");
header("Content-type: text/javascript");
function Zip($source, $destination) {
	if (!extension_loaded('zip') || !file_exists($source)) {
		return false;
	}
	$zip = new ZipArchive();
	if (!$zip->open($destination, ZIPARCHIVE::CREATE)) {
		return false;
	}
	$source = str_replace('\\', '/', realpath($source));
	if (is_dir($source) === true) {
		$files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);
		foreach ($files as $file) {
			$file = str_replace('\\', '/', realpath($file));
			if (is_dir($file) === true) {
				$zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
			} else if (is_file($file) === true) {
				$zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
			}
		}
	} else if (is_file($source) === true) {
		$zip->addFromString(basename($source), file_get_contents($source));
	}
	return $zip->close();
}
if(isset($_GET["type"])) {
	$type = $_GET["type"];
	if($type === "compilersource") {
		unlink('./js5-source.zip');
		Zip('./', './js5-source.zip');
		index('./js5-source.zip');
	} else if($type === "dev") {
		include('../build/js5-build.js');
	} else if($type === "min") {
		include('../build/js5-min.js');
	} else if($type === "prty") {
		include('../build/js5.js');
	} else {
		index();
	}
	// index();
} else {
	index();
}
?>