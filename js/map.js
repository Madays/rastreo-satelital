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
