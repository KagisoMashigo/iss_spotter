const request = require('request');


const fetchMyIP = function(callBack) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      return callBack(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (!data.ip) {
      const noIpErr = `Sorry, no ip here!`;
      return callBack(noIpErr, null);
    } else if (data.ip) {
      const IP = data; // putting this line here protects (in the sense that it will establish that it actually exists)
      return callBack(null, IP);
    }
  });
};

const fetchCoordsByIP = function (ip, callBack){
  request(`https://ipvigilante.com/8.8.8.8`, (error, response, body) => {
    if (error) {
      return callBack(error, null);
    }
    ip = '142.182.50.152'
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (!data["latitude"] && !data["longitude"]) {
      const noGeoErr = `Sorry, no ip here!`;
      return callBack(noGeoErr, null);
    } else if (data.ip) {
      const geoCoords = {};
      const latitude = data.latitude;
      const longitude = data.longitude;
      geoCoords += latitude;
      geoCoords += longitude;

      const IP = data; // putting this line here protects (in the sense that it will establish that it actually exists)
      return callBack(null, IP);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };