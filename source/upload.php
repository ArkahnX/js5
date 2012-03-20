<?php
/**
 * modified 08/03/2012 3:24 PM
 */
$start = microtime(true);
// Report all PHP errors
error_reporting(-1);
ini_set('error_reporting', E_ALL);
include("functions.php");
function FTPPutAll($connectionId, $src_dir, $destinationDirectory) {
	if (!@ftp_nlist($connectionId, $destinationDirectory)) {
		ftp_mkdir($connectionId, $destinationDirectory);
		echo makeTime("created $destinationDirectory");
	}
	$d = dir($src_dir);
	// do this for each file in the directory
	while($file = $d->read()) {
		// to prevent an infinite loop
		if ($file != "." && $file != "..") {
			// do the following if it is a directory
			if (is_dir($src_dir."/".$file)) {
				// create directories that do not yet exist
				if (!@ftp_nlist($connectionId, $destinationDirectory."/".$file)) {
					ftp_mkdir($connectionId, $destinationDirectory."/".$file);
					echo makeTime("created $destinationDirectory/$file");
				}
				// recursive part
				FTPPutAll($connectionId, $src_dir."/".$file, $destinationDirectory."/".$file);
			} else {
				// put the files
				if(ftp_put($connectionId, $destinationDirectory."/".$file, $src_dir."/".$file, FTP_BINARY)) {
					echo makeTime("successfully uploaded $src_dir/$file");
				} else {
					echo makeTime("failed to upload $src_dir/$file");
				}
			}
		}
	}
}
function ftp_rmdirr($handle, $path) {
	if(!@ftp_delete($handle, $path)) {
		$list = @ftp_nlist($handle, $path);
		if(!empty($list)) {
			foreach($list as $value) {
				ftp_rmdirr($handle, $value);
			}
		}
	}
	if(@ftp_rmdir($handle, $path)) {
		echo makeTime("successfully deleted $path");
	} else {
		echo makeTime("failed to delete $path");
	}
}
function FTPDeleteAll($connectionId,$destinationDirectory){
	$filesArray = ftp_nlist($connectionId, $destinationDirectory);
	if (is_array($filesArray)){
		for ($i=0;$i<sizeof($filesArray);$i++) {
			$thisFile = basename($filesArray[$i]);
			if($thisFile === "." || $thisFile === "..") {
				continue;
			}
			if (ftp_size($connectionId, $destinationDirectory."/".$thisFile) == -1) {
				FTPDeleteAll($connectionId,  $destinationDirectory."/".$thisFile);
			} else {
				ftp_delete($connectionId,  $destinationDirectory."/".$thisFile);
				echo makeTime("successfully deleted $destinationDirectory/$thisFile");
			}
		}
		sleep(1);
		ob_flush() ;
	}
	if (!@ftp_nlist($connectionId, $destinationDirectory)) {
		echo makeTime("$destinationDirectory is already deleted");
	} else if(ftp_rmdir($connectionId, $destinationDirectory)) {
		echo makeTime("successfully deleted $destinationDirectory");
	} else {
		echo makeTime("failed to delete $destinationDirectory");
	}
}
if(isset($_GET["type"])) {
	include("../details.php");
	$type = $_GET["type"];
	echo makeTime("Uploading: <b>".$type."</b>",false);
	echo makeTime("<pre>",false);
	$connectionId = ftp_connect($server);
	$login_result = ftp_login($connectionId, $username, $password);
	ftp_pasv($connectionId, true);
	if ((!$connectionId) || (!$login_result)) {
		echo makeTime("FTP connection has failed!\nAttempted to connect to $server for user $username");
		exit;
	} else {
		echo makeTime("Connected to $server as $username");
	}
	if($type === "all") {
		FTPDeleteAll($connectionId,"/public_html/js5/source");
		echo makeTime("starting upload of "."../source");
		FTPPutAll($connectionId,"../source","/public_html/js5/source");
		FTPDeleteAll($connectionId,"/public_html/js5/build");
		echo makeTime("starting upload of "."../build");
		FTPPutAll($connectionId,"../build","/public_html/js5/build");
		FTPDeleteAll($connectionId,"/public_html/js5/extensions");
		echo makeTime("starting upload of "."../extensions");
		FTPPutAll($connectionId,"../extensions","/public_html/js5/extensions");
	} else if($type === "src") {
		FTPDeleteAll($connectionId,"/public_html/js5/source");
		echo makeTime("starting upload of "."../source");
		FTPPutAll($connectionId,"../source","/public_html/js5/source");
	} else if($type === "bld") {
		FTPDeleteAll($connectionId,"/public_html/js5/build");
		echo makeTime("starting upload of "."../build");
		FTPPutAll($connectionId,"../build","/public_html/js5/build");
	} else if($type === "ext") {
		FTPDeleteAll($connectionId,"/public_html/js5/extensions");
		echo makeTime("starting upload of "."../extensions");
		FTPPutAll($connectionId,"../extensions","/public_html/js5/extensions");
	} else {
		index();
	}

	ftp_close($connectionId);
	index();
} else {
	index();
}