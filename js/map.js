import data from "../assets/data.js";
export let map = L.map("map");
let satelliteIcon1 = L.icon({
  iconUrl: "../assets/satellite1.svg",
  iconSize: [38, 45],
  iconAnchor: [0, 0],
  popupAnchor: [19, -22.5],
  className: "satellite-icon",
});
let satelliteIcon2 = L.icon({
  iconUrl: "../assets/satellite2.svg",
  iconSize: [38, 45],
  iconAnchor: [0, 0],
  popupAnchor: [19, -22.5],
  className: "satellite-icon",
});

export let marker = L.marker([0, 0], {
  icon: satelliteIcon1,
  className: "satellite-icon-marker",
}).addTo(map)



//geojson del mundo
// let geojson = L.geoJson(data).addTo(map);

let geojson = L.geoJson(data, {
  style: function (feature) {
    return {
      className: "countries-geojson",
    };
  },
}).addTo(map);

function highlightFeature(layer) {
  //var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "var(--primary-color)",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  //info.update(layer.feature.properties);
}

function resetHighlight(layer) {
  geojson.resetStyle(layer);
  //info.update();
}

/*function zoomToFeature(e) {
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
}).addTo(map);*/

// var info = L.control();

// info.onAdd = function (map) {
//   this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
//   this.update();
//   return this._div;
// };

// method that we will use to update the control based on feature properties passed
// info.update = function (props) {
//   this._div.innerHTML =
//     "<h4>El pico satelite Platzi-Sat1 esta pasando por</h4>" +
//     "<b>" +
//     (props ? "<p>" + props.name + "</p>" : "El oceano");
// };

// info.addTo(map);

// Datos prehechos de ejemplo para el cuadro emergente
const satelliteData = {
  name: "Satélite de ejemplo",
  latitude: 12.345,
  longitude: 67.89,
  status: "Operativo",
  altitude: "500 km",
  // Agrega más datos según tus necesidades
};

// Función para mostrar el cuadro emergente con los datos prehechos
export function showSatellitePopup(marker, satelliteData) {
  const popupContent = `
  <div id="satellite-popup">
    <h3>${satelliteData.name}</h3>
    <p>Latitud: ${satelliteData.latitude}</p>
    <p>Longitud: ${satelliteData.longitude}</p>
    <p>Estado: ${satelliteData.status}</p>
    <p>Altitud: ${satelliteData.altitude}</p>
    <!-- Agrega más información del satélite según tus datos -->
  </div>
  `;


  marker.bindPopup(popupContent).openPopup();
}
// showSatellitePopup(marker, satelliteData);

export function showSatellite(lat, long) {
  marker.setLatLng([lat, long]);

  geojson.eachLayer((layer) => {
    const latLng = marker.getLatLng();
    resetHighlight(layer);

    if (layer instanceof L.Polygon && layer.getBounds().contains(latLng)) {
      highlightFeature(layer);
      //info.update(layer.feature.properties);
    }
  });

  //.bindPopup('A pretty CSS popup.<br> Easily customizable.')
  //.openPopup();
  //let polyline = L.polyline(path, {color: 'red'}).addTo(map);
}
export function focusSatellite(lat, long) {
  map.setView([lat, long], 3);
}
// export function showSatelliteWithNoView(lat, long) {
//   marker.setLatLng([lat, long]);
// }

export function pathSatellite(path) {
  L.polyline(path, { color: "red" }).addTo(map);
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
currentMapLayer = mapStyle1.addTo(map);
function handleThemes(event) {
  const selectedThemeValue = event.target.value;
  const mapContainer = document.getElementById("map");

  if (currentMapLayer) {
    currentMapLayer.remove();
  }
  // const pageTitle = document.querySelector(".title");
  if (selectedThemeValue === "1") {
    // pageTitle.style.color = "var(--fonts-color)";
    currentMapLayer = mapStyle1.addTo(map);
    marker.setIcon(satelliteIcon1);

    mapContainer.style.backgroundColor = "white";

    /* Changing root colors from css*/
    setNewColors(
      "#00a6d3ff",
      "#00c1e2ff",
      "#080705ff",
      "#f2f2f2ff",
      "#00f7ffff"
    );
  } else if (selectedThemeValue === "2") {
    // pageTitle.style.color = "var(--extra-color)";
    currentMapLayer = mapStyle2.addTo(map);
    marker.setIcon(satelliteIcon2);

    mapContainer.style.backgroundColor = "black";

    /* Changing root colors from css*/

    setNewColors(
      "#7f7f7fff",
      "#a5a5a5ff",
      "#595959ff",
      "#ccccccff",
      "#f2f2f2ff"
    );
  } else if (selectedThemeValue === "3") {
    // pageTitle.style.color = "var(--fonts-color)";
    currentMapLayer = mapStyle3.addTo(map);
    marker.setIcon(satelliteIcon2);

    mapContainer.style.backgroundColor = "black";

    /* Changing root colors from css*/
    setNewColors(
      "#140152ff",
      "#22007cff",
      "#f2f2f2ff",
      "#0d00a4ff",
      "#04052eff"
    );
  }
}

function setNewColors(
  primaryColor,
  secondaryColor,
  fontsColor,
  buttonsColor,
  extraColor
) {
  document.documentElement.style.setProperty("--primary-color", primaryColor);
  document.documentElement.style.setProperty(
    "--secondary-color",
    secondaryColor
  );
  document.documentElement.style.setProperty("--fonts-color", fontsColor);
  document.documentElement.style.setProperty("--buttons-color", buttonsColor);
  document.documentElement.style.setProperty("--extra-color", extraColor);
}
