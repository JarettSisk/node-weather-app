const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/6b791952cc84f5ad1f854810e1abe702/${latitude},${longitude}`;

  request({url, json: true}, (error, {body}) => {

    if (error) {
      callback("Something went wrong. ERR: " + error.message, undefined);
    } else if (body.error) {
      callback ("ERR: " + body.error, undefined);
    }  else {
      const precip = body.currently.precipProbability;
      const temp = body.currently.temperature;
      const summary = body.daily.data[0].summary;
      const highTemp = body.daily.data[0].temperatureHigh;
      const lowTemp = body.daily.data[0].temperatureLow;
      
      
      callback(undefined, `${summary} It is currently ${temp} degrees, with a high of ${highTemp} and low of ${lowTemp}. There is a ${precip}% chance of rain.`)
    }
  })
  
}

module.exports = forecast;