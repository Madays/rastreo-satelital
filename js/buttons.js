import { getTle } from "./tle.js";
import { position } from "./satellite-propagation.js";
import { focusSatellite, showSatellite, showSatellitePopup, marker,  } from "./map.js";

/*FOCUS BUTTON*/

const focusButton = document.getElementById("focus-button");
focusButton.addEventListener("click", () => {
  getTle()
    .then((tle) => position(tle[1], tle[2]))
    .then((positionSatellite) =>
      focusSatellite(positionSatellite.lat, positionSatellite.long)
    )
    .catch((error) => {
      console.error("Error:", error);
    });
});


const satelliteData = {
  name: "Satélite Platzi-Sat1",
  latitude: 12.345,
  longitude: 67.89,
  status: "Operativo",
  altitude: "500 km",
  // Agrega más datos según tus necesidades
};


const trackButton = document.getElementById("track-button");
trackButton.addEventListener("click", () => {
  showSatellitePopup(marker, satelliteData);
})