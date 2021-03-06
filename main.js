native_zoom_level = 8;
default_zoom_level = 6;

// Apply Alloc's coordinate transformation
// http://7daystodie.com/forums/member.php?45-Alloc
myProjection = {
    project: function (latlng) {
	return new L.Point((latlng.lng - 1) / Math.pow(2, native_zoom_level), (latlng.lat + 2) / Math.pow(2, native_zoom_level));
    },

    unproject: function (point) {
	return new L.LatLng(point.y * Math.pow(2, native_zoom_level) + 1, point.x * Math.pow(2, native_zoom_level) - 2);
    }
};

myCRS = L.extend({}, L.CRS.Simple, {
    projection: myProjection,

    scale: function (zoom) {
	return Math.pow(2, zoom);
    }
});
var map = L.map('map', {
    zoomControl: true,
    attributionControl: true,
    crs: myCRS
}).setView([0, 0], default_zoom_level);

var layers = document.getElementById('menu-ui');
var players = []

L.tileLayer('tiles/{z}/{x}/{y}.png', {maxNativeZoom : native_zoom_level, continuousWorld: 'false', attribution: '©The Fun Pimps'}).addTo(map);

// Add modifications here:

// Show position on click
map.on('click', function(e) {
    var usefulLatLng = e.latlng.lng + ", 0, " + e.latlng.lat
    alert(usefulLatLng);
});


/*
  var sel = document.createElement("select");
  var options = {
  filter: function(cols) {
  playerName = cols['player']
  if(players.indexOf(playerName) == -1) {
  // Add to array
  players.push(playerName);
  // Add to combo box
  var opt = document.createElement("option");
  opt.value = playerName;
  opt.text = playerName;
  sel.appendChild(opt);
  }
  // Show only selected player waypoints
  return cols['player'] == sel.value;
  }
  };
  var myLayer = omnivore.csv('players/tracks.csv', options);
  addLayer(myLayer, 'Player path', 1, true);

  sel.onchange = function() {
  // If the user change player recreate the layer
  map.removeLayer(myLayer);
  myLayer = omnivore.csv('players/tracks.csv', options);
  myLayer.addTo(map);
  }
  // ADD player selection control
  var MyControl = L.Control.extend({
  options: {
  position: 'topleft'
  },
  onAdd: function(map) {
  // create the control container with a particular class name
  var container = L.DomUtil.create('div', 'my-custom-control');
  container.appendChild(sel);
  L.DomEvent.disableClickPropagation(sel);
  return container;
  }
  });
  map.addControl(new MyControl());
*/

// Add mouse position
L.control.mousePosition({
    latFormatter : function(pos) {
        // lng to S N
        // return Math.abs(Math.round(pos))  + (pos >=0 ? " N" : " S");
        return Math.round(pos)  + (pos >=0 ? " N" : " S");
    },
    lngFormatter : function(pos) {
        // lng to W E
        // return Math.abs(Math.round(pos)) + (pos <=0 ? " W" : " E");
        return Math.round(pos) + (pos <=0 ? " W" : " E");
    }
}).addTo(map);

// Add overlay region tiles rectangles and text
var canvasTiles = L.tileLayer.canvas({continuousWorld: 'false'});
canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
    if(zoom >= native_zoom_level /2 && zoom <= native_zoom_level - 1) {
        var ctx = canvas.getContext('2d');
        ctx.globalAlpha = 0.35;
        var zoomFactor = Math.pow(2,native_zoom_level) / Math.pow(2,zoom);
        var tileSize = 512 / zoomFactor;
        ctx.fillStyle="white";
        ctx.strokeStyle="red";
        ctx.font="12px Georgia";
        ctx.lineWidth="2";
        for(i=0; i < zoomFactor / 2; i++) {
            for(j=0; j < zoomFactor / 2; j++) {
                ctx.rect(i*tileSize,j*tileSize,(i + 1)*tileSize,(j+1)*tileSize);
            }
        }
        ctx.stroke();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle="white";
        ctx.shadowBlur = 1;
        ctx.shadowColor = "black";
        for(i=0; i < zoomFactor / 2; i++) {
            for(j=0; j < zoomFactor / 2; j++) {
                var txt = (tilePoint.x * (zoomFactor / 2) + i)+","+(-tilePoint.y * (zoomFactor / 2) - j - 1 )
                var txt_width = ctx.measureText(txt).width
                var txtOffset = 0
                if(zoomFactor == 1) {
                    txtOffset = -(tileSize / 2)
                }
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = -1;
                ctx.fillText(txt, i*tileSize + tileSize / 2 - txt_width / 2,j*tileSize + tileSize / 2 + 10, tileSize);
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = 1;
                ctx.fillText(txt, i*tileSize + tileSize / 2 - txt_width / 2,j*tileSize + tileSize / 2 + 10, tileSize);
            }
        }
    }
};

addLayer(canvasTiles, 'Region tiles', 2, false);

/*********************************************************************************************************************** k13 */
var AllPOI = L.geoJson(ShowPOILocation(), {
    pointToLayer: function (feature, latlng) {
	if (feature.properties && feature.properties.popupContent) {
	    return L.marker(latlng, {icon: feature.properties.icon});
	}
	return false;
    },
    style: LineStyle,
    onEachFeature: onEachFeature
});

addLayer(AllPOI, 'All Signaled POI', 3, true); //kersma.addTo(map);

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
	var popupContent = popupcontent(feature.properties.entity, feature.properties.popupContent);
	layer.bindPopup(popupContent);
    }
}

function popupcontent(entityId, content) {
    // var popupContent = '<img src="./images/thumbs/entity-'+ entityId + '.jpg" alt="entity" />';
    var popupContent = '<div class="popup__content">';
    popupContent += content + '</div>';
    return popupContent;
}
/************************************************************************************************************************* /k13 */

function addLayer(layer, name, zIndex, active) {
    if(active) {
        layer
            .setZIndex(zIndex)
            .addTo(map);
    }
    // Create a simple layer switcher that
    // toggles layers on and off.
    var link = document.createElement('a');
    link.href = '#';
    link.className = active ? 'active' : '';
    link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
    };

    layers.appendChild(link);
}
