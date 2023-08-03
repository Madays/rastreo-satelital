import data from '../assets/data.js';
let map = L.map('map')
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
let satelliteIcon = L.icon({
    iconUrl: '../assets/satellite.png',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 45], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let marker = L.marker([0,0],{icon: satelliteIcon}).addTo(map)

//geojson de un pais
let geojson = L.geoJson(data);

function highlightFeature(layer) {
    //var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(layer) {
    geojson.resetStyle(layer);
    //info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(data, {
    //style: style,
    //onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>El pico satelite Platzi-Sat1 esta pasando por</h4>' + '<b>' + (props ? '<p>' + props.name + '</p>' : 'El oceano')
};

info.addTo(map);


export function showSatellite(lat,long){
    marker.setLatLng([lat, long])
    map.setView([lat, long], 3);

    let markerInsidePolygon = false;
    geojson.eachLayer((layer) => {
        const latLng = marker.getLatLng();
        resetHighlight(layer)
        if (layer instanceof L.Polygon && layer.getBounds().contains(latLng)) {
          markerInsidePolygon = true;
          highlightFeature(layer)
          info.update(layer.feature.properties);
        }
      });

    if (markerInsidePolygon) {

      console.log('Esta incluido en marker dentro del poligono.');
    } else {
      console.log('No esta incluido en marker dentro del poligono.');
    }


        //.bindPopup('A pretty CSS popup.<br> Easily customizable.')
        //.openPopup();
    //let polyline = L.polyline(path, {color: 'red'}).addTo(map);
}

export function pathSatellite(path){
    L.polyline(path, {color: 'red'}).addTo(map);
}


const radioButtons = document.getElementsByName("r");

radioButtons.forEach((button) => {
  button.addEventListener("change", handleThemes);
});

let mapStyle1 = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

let mapStyle2 = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
);

let mapStyle3 = L.tileLayer(
  "https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}",
  {
    attribution:
      'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
    bounds: [
      [-85.0511287776, -179.999999975],
      [85.0511287776, 179.999999975],
    ],
    minZoom: 1,
    maxZoom: 8,
    format: "jpg",
    time: "",
    tilematrixset: "GoogleMapsCompatible_Level",
  }
);

let currentMapLayer = mapStyle1;
function handleThemes(event) {
  const selectedThemeValue = event.target.value;

  if (currentMapLayer) {
    currentMapLayer.remove();
  }
  const pageTitle = document.querySelector(".title");
  if (selectedThemeValue === "1") {
    pageTitle.style.color = "var(--black)";
    currentMapLayer = mapStyle1.addTo(map);
    marker.setIcon(satelliteIcon);
  } else if (selectedThemeValue === "2") {
    pageTitle.style.color = "var(--baby-powder)";
    currentMapLayer = mapStyle2.addTo(map);
    marker.setIcon(satelliteIcon2);
  } else if (selectedThemeValue === "3") {
    pageTitle.style.color = "var(--baby-powder)";
    currentMapLayer = mapStyle3.addTo(map);
    marker.setIcon(satelliteIcon2);
  }
}

// function cambiarColorSVG(color) {
//   fetch("../assets/Satellite.js") // Reemplaza 'ruta/a/mi_archivo.svg' con la URL de tu archivo SVG
//     .then((response) => response.text())
//     .then((svgData) => {
//       const parser = new DOMParser();
//       const svgDocument = parser.parseFromString(svgData, "image/svg+xml");
//       const svgElement = svgDocument.documentElement;

//       svgElement.setAttribute("fill", color);

//       const svgContainer = document.getElementById("svgContainer");
//       svgContainer.innerHTML = "";
//       svgContainer.appendChild(svgElement);
//     })
//     .catch((error) => {
//       console.error("Error al cargar el archivo SVG:", error);
//     });
// }

// cambiarColorSVG("red");
