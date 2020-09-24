//const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');


/*fetchMyIP((error, IP) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , IP);
});*/

fetchCoordsByIP((error, IP) => {
  if (error) {
    console.log("Nope, this didn't work" , error);
    return;
  }

  console.log('Voila! Here it is:' , IP);
});