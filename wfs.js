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


const map = new Map({
  layers: [osm, vector],
  //layers: [osm], 레이어가 두개 이상일 때 ,로 구분하여 표기
  target: 'map',
  view: new View({
    // 지도가 보여지는 중심점 설정
    center: [14270476, 4300535],
    // 확대 정도 설정
    zoom: 7.2,
  }),
});