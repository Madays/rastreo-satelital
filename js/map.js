let map = L.map("map");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
let satelliteIcon = L.icon({
  iconUrl: "../assets/satellite.png",
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [38, 45], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [22, 44], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
let marker = L.marker([0, 0], { icon: satelliteIcon }).addTo(map);

export function showSatellite(lat, long) {
  marker.setLatLng([lat, long]);
  map.setView([lat, long], 3);
  //.bindPopup('A pretty CSS popup.<br> Easily customizable.')
  //.openPopup();
  //let polyline = L.polyline(path, {color: 'red'}).addTo(map);
}
//  export function pathSatellite(path){
//     let polyline = L.polyline(path, {color: 'red'}).addTo(map);
//  }

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

  if (selectedThemeValue === "1") {
    currentMapLayer = mapStyle1.addTo(map);
  } else if (selectedThemeValue === "2") {
    currentMapLayer = mapStyle2.addTo(map);
  } else if (selectedThemeValue === "3") {
    currentMapLayer = mapStyle3.addTo(map);
  }
}
