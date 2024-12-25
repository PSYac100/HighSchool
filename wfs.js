import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import OSM from 'ol/source/OSM';

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
});

// const key = 'Get your own API key at https://www.maptiler.com/cloud/';
// const attributions =
//   '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
//   '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

// const raster = new TileLayer({
//   source: new XYZ({
//     attributions: attributions,
//     url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + key,
//     tileSize: 512,
//     maxZoom: 20,
//   }),
// });

const raster = new TileLayer({
  source: new OSM()
});


const map = new Map({
  layers: [vector, raster],
  //layers: [osm], 레이어가 두개 이상일 때 ,로 구분하여 표기
  target: 'map',
  view: new View({
    // 지도가 보여지는 중심점 설정
    center: [14270476, 4300535],
    // 확대 정도 설정
    zoom: 7.2,
  }),
});
