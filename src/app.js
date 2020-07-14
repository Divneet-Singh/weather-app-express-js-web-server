const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { error } = require("console");

const app = express();

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
    res.send("Show Weather");
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

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});