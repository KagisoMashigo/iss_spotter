const request = require('request');

const nextISSTimesForMyLocation = function(fn) {
  // empty for now
}

const fetchMyIP = function(fn) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      return fn(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      fn(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (!data.ip) {
      const noIpErr = `Sorry, no ip here!`;
      return fn(noIpErr, null);
    } else if (data.ip) {
      const IP = data; // putting this line here protects (in the sense that it will establish that it actually exists)
      return fn(null, IP);
    }
  });
};

const fetchMyCoords = function (ip, fn){
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      fn(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      fn(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;

    fn(null, { latitude, longitude });
  });
};

  const fetchISSFlyOverTimes = function(coords, fn) {
    const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;


    request(url, (error, response, body) => {
      if (error) {
        fn(error, null);
        return;
      }
  
      if (response.statusCode !== 200) {
        fn(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
        return;
      }
  
      const passes = JSON.parse(body).response;
      fn(null, passes);
    });
  };


module.exports = { fetchMyIP, fetchMyCoords, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
