import { getTle } from "./tle.js";
import { position } from "./satellite-propagation.js";
import {
  focusSatellite,
  showSatellite,
  showSatellitePopup,
  marker,
} from "./map.js";

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

setInterval(() => {
  getTle()
    .then((tle) => position(tle[1], tle[2]))
    .then((positionSatellite) => {
      const infoDate = document.getElementById("satellite-info-date");
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      infoDate.innerText = `${formattedDate} ${formattedTime}`;

      const infoPosition = document.getElementById("satellite-info-position");
      infoPosition.innerText = `Lat: ${positionSatellite.lat.toFixed(
        5
      )} Long: ${positionSatellite.long.toFixed(5)}`;
    });
}, 1000);

const trackButton = document.getElementById("track-button");
trackButton.addEventListener("click", () => {
  const windowWidth = window.innerWidth;
  const satelliteInfoBox = document.getElementById("satellite-info-box");

  if (windowWidth < 940) {
    satelliteInfoBox.classList.remove("active-satellite-info-box");
    satelliteInfoBox.classList.toggle("active-satellite-info-box-mobile");
  } else {
    satelliteInfoBox.classList.remove("active-satellite-info-box-mobile");
    satelliteInfoBox.classList.toggle("active-satellite-info-box");
  }
});
