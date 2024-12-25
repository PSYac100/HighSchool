// OpenLayers > Examples > Tiled WMS
// GeoServer에 있는 camping을 이미지로 서비스

import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

// url을 변수로 빼서 따로 설정해 줘도 됨
// const g_url = "http://localhost:8080";

const osm = new TileLayer({
  source: new OSM()
});

const wms = new TileLayer({
  source : new TileWMS({
    // url: g_url+'/geoserver/topp/wms',
    url: 'http://localhost:8080/geoserver/GeoWS/wms',
    params:{
      'LAYERS':'CampWS:camp',
      'TILED': true,
      'FORMAT': 'image/png'}
    })
  });

const map = new Map({
  layers: [osm, wms],
  //layers: [osm], 레이어가 두개 이상일 때 ,로 구분하여 표기
  target: 'map',
  view: new View({
    // 지도가 보여지는 중심점 설정
    center: [14270476,4300535],
    // 확대 정도 설정
    zoom: 7.2,
  }),
});