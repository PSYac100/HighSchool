import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import View from 'ol/View.js';

// geoserver에서 WFS 방식으로 가져오기 위해
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorSource from 'ol/source/Vector.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { bbox as bboxStrategy } from 'ol/loadingstrategy.js';

// 팝업창을 위해
import { Overlay } from 'ol';
import XYZ from 'ol/source/XYZ.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';

const osm = new TileLayer({
	source: new OSM(),
})

const vectorSource = new VectorSource({
	format: new GeoJSON(),
	url: function(extent) {
		return (
			'http://localhost:8080/geoserver/WebWS/ows?service=WFS&' +
			'version=1.0.0&request=GetFeature&typeName=WebWS:jijuk&' +
			'outputFormat=application/json&srsname=EPSG:3857&' +
			'bbox=' +
			extent.join(',') +
			',EPSG:3857'
		);
	},
	strategy: bboxStrategy,
});

const vector = new VectorLayer({
	source: vectorSource,
	style: {
		'stroke-width': 0.75,
		'stroke-color': 'rgba(255, 221, 235, 1.0)',
		'fill-color': 'rgba(250, 0, 101, 0.5)',
	},
});


/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
	element: container,
	autoPan: {
		animation: {
			duration: 250,
		},
	},
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
	overlay.setPosition(undefined);
	closer.blur();
	return false;
};


const map = new Map({
	target: 'map',
	overlays: [overlay],
	layers: [osm, vector],
	view: new View({
		// 지도 중심점 설정
		center: [14144761, 4508686],
		// 지도 확대 레벨 설정
		zoom: 13,
	}),
});

const featureOverlay = new VectorLayer({
  source: new VectorSource(),
  map: map,
  style: {
    'stroke-color': 'rgba(255, 0, 0, 1.0)',
    'stroke-width': 2,
  },
});

/**
 * Add a click handler to the map to render the popup.
 */
/*map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});*/

/* popup을 기준으로 연속지적도형정보가 나오도록 수정 */
map.on("singleclick", function(evt) {
	const features = map.getFeaturesAtPixel(evt.pixel);
	const feature = features.length ? features[0] : undefined;
	if (feature.get('a2')) {
		const coordinate = evt.coordinate;
		content.innerHTML = `<h3> PNU 정보</h3>:&nbsp${feature.get('a2')}<br>
			<h3> 주소 정보</h3>:&nbsp${feature.get('a3')}`;
		overlay.setPosition(coordinate);
	}
	else {
		overlay.setPosition(undefined);
	}
});

/*hover 처리*/
let highlight;
const displayFeatureInfo=function(pixel){
	const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
	    return feature;
	  });

	  if (feature !== highlight) {
	    if (highlight) {
	      featureOverlay.getSource().removeFeature(highlight);
	    }
	    if (feature) {
	      featureOverlay.getSource().addFeature(feature);
	    }
	    highlight = feature;
	  }
	};

	map.on('pointermove', function (evt) {
	  if (evt.dragging) {
	    return;
	  }
	  const pixel = map.getEventPixel(evt.originalEvent);
	  displayFeatureInfo(pixel);
	});





