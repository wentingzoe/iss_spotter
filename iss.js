const request = require('request');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org?format=json';
  request.get(url, function(err, response, body) {
    if (err) {
      console.log("Here was a problem: ", err)
      callback(null, err);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error(msg), null);
      return;
    }
    const ip = JSON.parse(body);
    if (ip.length === 0) {
      callback(err, null);
    } else {
      callback(null,ip.ip);
    }
  });
};

module.exports = { fetchMyIP };
