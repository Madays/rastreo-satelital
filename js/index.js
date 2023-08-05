import { getTle } from "./tle.js";
import { position } from "./satellite-propagation.js";
import {
  map,
  showSatellite,
} from "./map.js";

let path = [];
getTle()
  .then((tle) => position(tle[1], tle[2]))
  .then((positionSatellite) => {
    map.setView([positionSatellite.lat, positionSatellite.long], 3);
    path.push([positionSatellite.lat, positionSatellite.long]);
    showSatellite(positionSatellite.lat, positionSatellite.long);
    //pathSatellite(path);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
setInterval(() => {
  getTle()
    .then((tle) => position(tle[1], tle[2]))
    .then((positionSatellite) => {
      path.push([positionSatellite.lat, positionSatellite.long]);
      showSatellite(positionSatellite.lat, positionSatellite.long);
      //pathSatellite(path);
      //showSatelliteWithNoView(positionSatellite.lat, positionSatellite.long)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, 1000);
