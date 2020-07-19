const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=&units=metric`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Cannot connect to weather service!", undefined);
        } else if (body.message) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, "Current: " + body.main.temp + ", Feels like: " + body.main.feels_like + " weather description: " + body.weather[0].description);
        }
    })
}

module.exports = forecast;