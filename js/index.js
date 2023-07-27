import {getTle} from './tle.js'
import {satelitePropagation} from './satellite-propagation.js'
import {map} from './map.js'

getTle()
    .then(tle => {
        let latLong = satelitePropagation(tle[1], tle[2])
        map(latLong.lat,latLong.long)
    })
    .catch(error => {
        console.error('Error al obtener el TLE:', error);
    });