const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forcast.js");

const app = express();
const port = process.env.PORT || 3000;

// static files config
app.use(express.static(path.join(__dirname, '../public')))

// view engine config
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));


app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather",
    name: "Jarett Sisk"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "About me",
    name: "Jarett Sisk"
  });
})

app.get("/help", (req, res) => {
  res.render("help.hbs", {
    title: "Help",
    message: "Need help with your website? <br> Email me at: nexusdesigns.co@gmail.com",
    name: "Jarett Sisk"
  })
})

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: "you must provide an address"
    })
  }

  address = req.query.address;

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        location,
        forecastData,
        address
      })
    })
  })

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
     return res.send({
       error: "You must provide a search term"
     })
  }

  console.log(req.query);
  res.send({
    products: []
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Jarett Sisk"
  });
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Jarett Sisk"
  });
})

app.listen(port, () => {
  console.log("listening on port " + port);
});