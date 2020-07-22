const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// absolute path to the public assets.
const publicDirectoryPath = path.join(__dirname, "../public");
// absolute path to the template HTML pages.
const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

// set up handlebars.js
app.set("view engine", "hbs");

// set up views folder for handlebar.js
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// serve a file directory where static assets will lie. 
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Divneet Singh"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Divneet Singh"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Divneet Singh"
    })
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            errorMessage: "Please enter a valid address"
        });
    }

    geoCode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                errorMessage: error
            });
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    errorMessage: error
                });
            }
            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address
            });
        })
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found",
        name: "Divneet Singh"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Error 404. Page Not Found.",
        name: "Divneet Singh"
    })
});

app.listen(port, () => {
    console.log("Server is up on port 3000");
});