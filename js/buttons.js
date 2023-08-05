import { getTle } from "./tle.js";
import { position } from "./satellite-propagation.js";
import { focusSatellite, showSatellite } from "./map.js";

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
