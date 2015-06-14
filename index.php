<?php require_once "inc.php"; ?>
<!DOCTYPE html>
<html>
<head>
    <title><?php echo $title; ?></title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="css/leaflet.css"/>
    <link rel="stylesheet" href="css/L.Control.MousePosition.css"/>
    <link rel="stylesheet" href="css/toggle.css"/>
    <style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
	<nav id='menu-ui' class='menu-ui'></nav>
	<div id="map"></div>
	<script src="js/leaflet.js"></script>
	<script src="js/leaflet-omnivore.min.js"></script>
	<script src="js/L.Control.MousePosition.js"></script>
	<script src="js/XmlToGeoJSON.js"></script>
	<script src="main.js.php"></script>
</body>
</html>
