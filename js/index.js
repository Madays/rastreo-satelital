import {getTle} from './tle.js'
import {position} from './satellite-propagation.js'
import {showSatellite} from './map.js'

setInterval(() => {
    getTle()
    .then(tle => position(tle[1], tle[2]))
    .then(positionSatellite => showSatellite(positionSatellite.lat, positionSatellite.long))
    .catch(error => {
        console.error('Error:', error);
    })
}, 1000);
