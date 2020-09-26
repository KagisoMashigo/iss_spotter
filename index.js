const { fetchMyIP } = require('./iss');
const { fetchMyCoords } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


fetchMyIP((error, IP) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , IP);
});

fetchMyCoords('162.245.144.188', (error, Coords) => { //regardless of when you change this, it still works
  if (error) {
    console.log("Nope, this didn't work" , error);
    return;
  }

  console.log('Voila! Here are your coordinates:' , Coords);
});

const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => { //regardless of when you change this, it still works
  if (error) {
    console.log("Nope, this didn't work" , error);
    return;
  }

  console.log('Nice one, here are the pass times:' , passTimes);
});
