const request = require("request");

const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoibmV4dXNkZXNpZ25zIiwiYSI6ImNqdDlqcDd0dzAweDg0NnA3MzJxOGlwejIifQ.g_nXLAHWdlQDVczIB3Wh3A&limit=1`;

  request({url, json: true }, (error, {body}) => {
    if (error) {
      callback("Something failed. ERR: " + error, undefined);
    } else if (body.features.length === 0) {
        callback("ERR: unable to find location " + body.query, undefined)
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name

      })
    }

  })
}

module.exports = geocode;