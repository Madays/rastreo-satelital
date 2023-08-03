let map = L.map("map");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
let satelliteIcon = L.icon({
  iconUrl: "../assets/Satellite.svg",
  //shadowUrl: 'leaf-shadow.png',

  iconSize: [38, 45], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [22, 44], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
let satelliteIcon2 = L.icon({
  iconUrl: "../assets/Satellite2.svg",
  iconSize: [38, 45],
  iconAnchor: [22, 44],
  popupAnchor: [-3, -76],
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
  const pageTitle = document.querySelector(".title");
  if (selectedThemeValue === "1") {
    pageTitle.style.color = "var(--black)";
    currentMapLayer = mapStyle1.addTo(map);
    marker.setIcon(satelliteIcon);

    /* Changing root colors from css*/
    document.documentElement.style.setProperty("--primary-color", "#912f40ff");
    document.documentElement.style.setProperty(
      "--secondary-color",
      "#702632ff"
    );
    document.documentElement.style.setProperty("--fonts-color", "#fffffaff");
    document.documentElement.style.setProperty("--buttons-color", "#40434eff");
    document.documentElement.style.setProperty("--extra-color", "#080705ff");
  } else if (selectedThemeValue === "2") {
    pageTitle.style.color = "var(--baby-powder)";
    currentMapLayer = mapStyle2.addTo(map);
    marker.setIcon(satelliteIcon2);

    /* Changing root colors from css*/
    document.documentElement.style.setProperty("--primary-color", "#7f7f7fff");
    document.documentElement.style.setProperty(
      "--secondary-color",
      "#a5a5a5ff"
    );
    document.documentElement.style.setProperty("--fonts-color", "#595959ff");
    document.documentElement.style.setProperty("--buttons-color", "#ccccccff");
    document.documentElement.style.setProperty("--extra-color", "#f2f2f2ff");
  } else if (selectedThemeValue === "3") {
    pageTitle.style.color = "var(--baby-powder)";
    currentMapLayer = mapStyle3.addTo(map);
    marker.setIcon(satelliteIcon2);

    /* Changing root colors from css*/
    document.documentElement.style.setProperty("--primary-color", "#140152ff");
    document.documentElement.style.setProperty(
      "--secondary-color",
      "#22007cff"
    );
    document.documentElement.style.setProperty("--fonts-color", "#f2f2f2ff");
    document.documentElement.style.setProperty("--buttons-color", "#0d00a4ff");
    document.documentElement.style.setProperty("--extra-color", "#04052eff");
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
