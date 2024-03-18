const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=" +
    latitude +
    "," +
    longtitude;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect weather api service", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(
        undefined,
        " Country is : " +
          response.body.location.country +
          " - Capital is : " +
          response.body.location.name +
          " - Weather is : " +
          response.body.current.condition.text
      );
    }
  });
};

const geocode = (address, callback) => {
  const geocodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw";

  request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect geocode service", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length == 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        longtitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
      });
    }
  });
};

const country = process.argv[2];

geocode(country, (error, data) => {
  console.log("ERROR : ", error);
  console.log("DATA : ", data);

  forecast(data.latitude, data.longtitude, (error, data) => {
    console.log("ERROR : ", error);
    console.log("DATA : ", data);
  });
});
