<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>{TITLE}</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/main.css">

	<link rel="stylesheet" href="css/leaflet.css"/>
	<link rel="stylesheet" href="css/L.Control.MousePosition.css"/>
	<link rel="stylesheet" href="css/toggle.css"/>
	<style>
		body { margin:0; padding:0; }
		#map { position:absolute; top:0; bottom:0; width:100%; }
	</style>
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

	<nav id='menu-ui' class='menu-ui'></nav>
        <div id="map"></div>
        <script src="js/leaflet.js"></script>
        <script src="js/leaflet-omnivore.min.js"></script>
        <script src="js/L.Control.MousePosition.js"></script>
        <script src="js/XmlToGeoJSON.js"></script>
        <script src="main.js"></script>
    </body>
</html>
