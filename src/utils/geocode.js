const request = require("postman-request");

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGl2bmVldHNpbmdoIiwiYSI6ImNrY2NkZjdwNzAzaXkydG1vdGU0c3k0NDUifQ.3YQ7zZ8-wY3C7CoR6gFNJw&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (!body.features || body.features.length === 0) {
            callback("Unable to find location, Try another search!", undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            });
        }
    });
}

module.exports = geoCode;