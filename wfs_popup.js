// OpenLayers > Examples > Tiled WMS
// GeoServer에 있는 camping을 이미지로 서비스

import './style.css';
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

import GeoJSON from 'ol/format/GeoJSON.js';
import ImageTile from 'ol/source/ImageTile.js';
import VectorSource from 'ol/source/Vector.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import {Circle, Fill, Stroke, Style} from 'ol/style.js';

import Overlay from 'ol/Overlay.js';
import XYZ from 'ol/source/XYZ.js';
import {toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate.js';

// url을 변수로 빼서 따로 설정해 줘도 됨
// const g_url = "http://localhost:8080";

const osm = new TileLayer({
  source: new OSM()
});

const vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    return (
      'http://localhost:8080/geoserver/GeoWS/ows?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=GeoWS:camp&' +
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
  // style: {
  //   'stroke-width': 0.75,
  //   'stroke-color': 'white',
  //   'fill-color': 'rgba(100,100,100,0.25)',
  // },
  style: new Style({
    image: new Circle({
    radius: 3,
    fill: new Fill({
      color: 'rgba(192, 31, 181, 0.33)',
    }),
    stroke: new Stroke({
      color: 'rgba(206, 196, 206, 0.33)',
      width: 1,
    }),
}),
  }),
})


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
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const map = new Map({
  layers: [osm, vector],
  //layers: [osm], 레이어가 두개 이상일 때 ,로 구분하여 표기
  target: 'map',
  overlays: [overlay],
  view: new View({
    // 지도가 보여지는 중심점 설정
    center: [14270476, 4300535],
    // 확대 정도 설정
    zoom: 7.2,
  }),
});

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});
