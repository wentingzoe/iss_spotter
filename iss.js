const request = require('request');
// ******************************
// Fetch IP function declaration*
// ******************************
const fetchMyIP = function(callback) {
  
  const url = 'https://api.ipify.org?format=json';
  request.get(url, (err, response, body)=> {
    if (err) {
      console.log("Here was a problem: ", err);
      return callback(error, null);
    };
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    };
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};
const fetchCoordsByIP = function(ip, callback){
  request.get(`https://freegeoip.app/json/${ip}`, (err, response, body) =>{
    if (err) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const { latitude, longitude } = JSON.parse(body);
    
    callback(null, { latitude, longitude });
  });
};

// ************************
// Fetch ISS FlyOver Times*
// ************************
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

// ******************************
// Fetch nextISSTimes For MyLocation*
// ******************************
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};
module.exports = { nextISSTimesForMyLocation};
