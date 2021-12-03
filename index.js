// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('162.245.144.188',(error, coordinates)=>{
  if (error) {
    console.log("GEO data didn't work!" , error);
    return;
  }
  console.log('GEO worked! Returned coordinates:' , coordinates);
});