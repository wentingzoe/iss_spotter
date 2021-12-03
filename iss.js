const request = require('request');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
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
////////////////////////////////////////////
const fetchCoordsByIP = function(ip, callback){
  // error can be set if invalid domain, user is offline, etc.
  request.get(`https://freegeoip.app/json/${ip}`, (err, response, body) =>{
  if (err) {
    callback(error, null);
    return;
  }
  // if non-200 status, assume server error
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
 
  // if we get here, all's well and we got the data
  const { latitude, longitude } = JSON.parse(body);

  callback(null, { latitude, longitude });
});
};

module.exports = { fetchMyIP, fetchCoordsByIP};
