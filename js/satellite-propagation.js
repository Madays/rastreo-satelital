export function satelitePropagation(tleLine1, tleLine2) {
    // Initialize a satellite record
    var satrec = satellite.twoline2satrec(tleLine1, tleLine2);
    //  Or you can use a JavaScript Date
    var positionAndVelocity = satellite.propagate(satrec, new Date());
    // The position_velocity result is a key-value pair of ECI coordinates.
    // These are the base results from which all other coordinates are derived.
    var positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;

    // Set the Observer at 122.03 West by 36.96 North, in RADIANS
    var observerGd = {
        longitude: satellite.degreesToRadians(-122.0308),
        latitude: satellite.degreesToRadians(36.9613422),
        height: 0.370
    };

    // You will need GMST for some of the coordinate transforms.
    // http://en.wikipedia.org/wiki/Sidereal_time#Definition
    var gmst = satellite.gstime(new Date());
    // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
    let positionEcf   = satellite.eciToEcf(positionEci, gmst)
        //observerEcf   = satellite.geodeticToEcf(observerGd),
    let positionGd    = satellite.eciToGeodetic(positionEci, gmst)
        //lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf),
        //dopplerFactor = satellite.dopplerFactor(observerCoordsEcf, positionEcf, velocityEcf);

    // The coordinates are all stored in key-value pairs.
    // ECI and ECF are accessed by `x`, `y`, `z` properties.
    // var satelliteX = positionEci.x,
    //     satelliteY = positionEci.y,
    //     satelliteZ = positionEci.z;

    // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
    // var azimuth   = lookAngles.azimuth,
    //     elevation = lookAngles.elevation,
    //     rangeSat  = lookAngles.rangeSat;

    // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
    let longitude = positionGd.longitude
    let    latitude  = positionGd.latitude
        //height    = positionGd.height;

    //  Convert the RADIANS to DEGREES.
    let longitudeDeg = satellite.degreesLong(longitude)
    let latitudeDeg  = satellite.degreesLat(latitude);
    return {
            lat: latitudeDeg,
            long: longitudeDeg
        }
}
