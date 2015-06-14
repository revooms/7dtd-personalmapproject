<?php 
$version = "0.2";
$laststarted = file_get_contents('laststarted'); // datetime
$lastgenerated = file_get_contents('lastgenerated'); // datetime
$title = sprintf("7dtd map v%g - Generated: %s -  %s", $version, $laststarted, $lastgenerated);
?>
