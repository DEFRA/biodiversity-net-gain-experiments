import config from './assets/config/config.json'
import { Map, View } from 'ol'

// add the styles that OpenLayers requires for its basic UI components.
import 'ol/ol.css'
// for custom ol styles
import { Fill, Stroke, Style } from 'ol/style'
import Icon from 'ol/style/Icon'

// source types
import VectorSource from 'ol/source/Vector'
import XYZSource from 'ol/source/XYZ'

// Layer types
import VectorLayer from 'ol/layer/Vector'
import TileLayer from 'ol/layer/Tile'

// Geo data types
import GeoJSON from 'ol/format/GeoJSON'

// ol-hashed so map stays where we left it in a reload.
import sync from 'ol-hashed'

// Vector manipulation
import Modify from 'ol/interaction/Modify'
import Draw from 'ol/interaction/Draw'

import MousePosition from 'ol/control/MousePosition'
import { ScaleLine, defaults as defaultControls } from 'ol/control'
import { createStringXY } from 'ol/coordinate'

import { bbox as bboxStrategy } from 'ol/loadingstrategy'

const gainSitePolygonStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.5)'
  }),
  stroke: new Stroke({
    color: '#B10E1E',
    width: 3
  }),
  image: new Icon({
    opacity: 1,
    size: [32, 32],
    scale: 0.5,
    src: '/public/images/map-draw-cursor-2x.png'
  })
})

const gainSitePolygonVertexStyle = new Style({
  image: new Icon({
    opacity: 1,
    size: [32, 32],
    scale: 0.5,
    src: '/public/images/map-draw-cursor-2x.png'
  })
})

const drawStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.5)'
  }),
  stroke: new Stroke({
    color: '#005EA5',
    width: 3
  }),
  image: new Icon({
    opacity: 1,
    size: [32, 32],
    scale: 0.5,
    src: '/assets/images/map-draw-cursor-2x.png'
  })
})

const modifyStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.5)'
  }),
  stroke: new Stroke({
    color: '#FFBF47',
    width: 3
  }),
  image: new Icon({
    opacity: 1,
    size: [32, 32],
    scale: 0.5,
    src: '/assets/images/map-draw-cursor-2x.png'
  })
})

const landRegistryNationalPolygonStyle = new Style({
  fill: new Fill({
    color: 'rgba(166, 206, 227, 0.75)'
  }),
  stroke: new Stroke({
    color: 'white',
    width: 3
  })
})

const rpaLandParcelPolygonStyle = new Style({
  fill: new Fill({
    color: 'rgba(51, 160, 44, 0.75)'
  }),
  stroke: new Stroke({
    color: 'white',
    width: 3
  })
})

const tilesetId = 'microsoft.imagery'

const azureMapsSource = new XYZSource({
  url: `https://atlas.microsoft.com/map/tile?subscription-key=${config.subscriptionKey}&api-version=2.1&tilesetId=${tilesetId}&zoom={z}&x={x}&y={y}`,
  attributions: `© ${new Date().getFullYear()} TomTom, Microsoft`
})

const landRegistryNationalPolygonSource = new VectorSource({
  format: new GeoJSON(),
  projection: 'EPSG:3857',
  url: function (extent) {
    return (
      `${config.lrNationalPolygonUrlRoot}/geoserver/bng/ows?service=WFS&
       version=1.0.0&request=GetFeature&typeName=bng:lr_national_polygon_4326&maxFeatures=50&outputFormat=application/json&
       bbox=${extent.join(',')}`
    )
  },
  strategy: bboxStrategy
})

const rpaLandParcelPolygonSource = new VectorSource({
  format: new GeoJSON(),
  projection: 'EPSG:3857',
  url: function (extent) {
    return (
      `https://environment.data.gov.uk/arcgis/rest/services/RPA/LandParcels/MapServer/0/query?where=
       SBI=${config.rpaSbi}&outFields=parcel_id&outSR=4326&f=geojson`
    )
  }
})

// set layers
const landRegistryNationalPolygonLayer = new VectorLayer({
  source: landRegistryNationalPolygonSource,
  style: landRegistryNationalPolygonStyle,
  visible: false
})

const rpaLandParcelPolygonLayer = new VectorLayer({
  source: rpaLandParcelPolygonSource,
  style: rpaLandParcelPolygonStyle,
  visible: false
})

const layers = [
  new TileLayer({
    source: azureMapsSource
  }),
  rpaLandParcelPolygonLayer,
  landRegistryNationalPolygonLayer
]

const scaleBarControl = new ScaleLine({
  bar: true,
  steps: 4,
  text: true,
  minWidth: 140
})

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.getElementById('map-coordinates')
})

// Mapped to EPSG:4326 coordinates
const map = new Map({
  controls: defaultControls().extend([scaleBarControl, mousePositionControl]),
  target: 'map-container',
  layers: layers,
  view: new View({
    // projection: EPSG:3857, Web Mercator projection is default for open layers
    // projection: projection,
    center: [-286026, 6706283],
    extent: [-732419, 6423786, -16608, 8602318],
    zoom: 18,
    showFullExtent: true
  })
})

sync(map)

// Create a draw interaction configured to draw polygons and add them to a new vector source
const gainSiteSource = new VectorSource({
  format: new GeoJSON(),
  wrapX: false
})

const gainSiteLayer = new VectorLayer({
  source: gainSiteSource,
  style: [gainSitePolygonStyle, gainSitePolygonVertexStyle]
})

map.addLayer(gainSiteLayer)
map.addInteraction(
  new Draw({
    type: 'Polygon',
    source: gainSiteSource,
    style: drawStyle
  })
)

map.addInteraction(
  new Modify({
    source: gainSiteSource,
    style: modifyStyle
  })
)

// Add vector layer clearing
const clear = document.getElementById('clear')
clear.addEventListener('click', function () {
  gainSiteSource.clear()
})

// Allow layer toggling.
window.addEventListener('load', function () {
  document.getElementById('landRegistryNationalPolygons').addEventListener('click', function () {
    landRegistryNationalPolygonLayer.setVisible(!landRegistryNationalPolygonLayer.getVisible())
  })

  document.getElementById('rpaLandParcelPolygons').addEventListener('click', function () {
    rpaLandParcelPolygonLayer.setVisible(!rpaLandParcelPolygonLayer.getVisible())
  })
})
