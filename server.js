const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
require("dotenv").config;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
//setup Handlebars.js as default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//turn on routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
