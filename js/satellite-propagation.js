export function position(tleLine1, tleLine2) {
  // Initialize a satellite record
  var satrec = satellite.twoline2satrec(tleLine1, tleLine2);
  //  Or you can use a JavaScript Date
  var positionAndVelocity = satellite.propagate(satrec, new Date());
  // The position_velocity result is a key-value pair of ECI coordinates.
  // These are the base results from which all other coordinates are derived.
  var positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;

  // Set the Observer at -71.5375 West by -16.4090 North, in RADIANS
  var observerGd = {
    longitude: satellite.degreesToRadians(-71.5375),
    latitude: satellite.degreesToRadians(-16.4090),
    height: 2300,
  };

  // You will need GMST for some of the coordinate transforms.
  // http://en.wikipedia.org/wiki/Sidereal_time#Definition
  var gmst = satellite.gstime(new Date());
  // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
  let positionEcf = satellite.eciToEcf(positionEci, gmst);
  let observerEcf   = satellite.geodeticToEcf(observerGd);
  let positionGd = satellite.eciToGeodetic(positionEci, gmst);
  let lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf);
  //dopplerFactor = satellite.dopplerFactor(observerCoordsEcf, positionEcf, velocityEcf);

  // The coordinates are all stored in key-value pairs.
  // ECI and ECF are accessed by `x`, `y`, `z` properties.
  // var satelliteX = positionEci.x,
  //     satelliteY = positionEci.y,
  //     satelliteZ = positionEci.z;

  // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
  var azimuth   = lookAngles.azimuth,
      elevation = lookAngles.elevation,
      rangeSat  = lookAngles.rangeSat;

  // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
  let longitude = positionGd.longitude;
  let latitude = positionGd.latitude;
  let height    = positionGd.height;

  //  Convert the RADIANS to DEGREES.
  let longitudeDeg = satellite.degreesLong(longitude);
  let latitudeDeg = satellite.degreesLat(latitude);
  return {
    lat: latitudeDeg,
    long: longitudeDeg,
    height: height,
    elevation: elevation,
    azimuth: azimuth,
    rangeSat: rangeSat
  };
}
