// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require("./routes/users-api");
const widgetApiRoutes = require("./routes/widgets-api");
const usersRoutes = require("./routes/users");
const resourcesApiRoutes = require("./routes/resources-api");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/api/resources", resourcesApiRoutes);
app.use("/users", usersRoutes);

const profiles = require("./db/queries/profiles");
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const user = req.session.userId;
  const userProfile = profiles.getProfile(user);
  const templateVars = {
    user,
    userProfile
  };
  res.render("index", templateVars);
});

app.get("/post", (req, res) => {
  res.render("newResource");
});

// TEMP PFP WORKAREA ///
app.get("/userpf", (req, res) => {
  res.render("profile-page");
});

// TEMP EDIT PF WORKAREA ///
app.get("/editpf", (req, res) => {
  res.render("edit-profile");
});

// TEMP SEARCH-RESULTS WORKAREA ///
app.get("/results", (req, res) => {
  res.render("search-results");
});

// TEMP PFP WORKAREA ///
app.get("/userpf", (req, res) => {
  res.render("profile-page");
});

// TEMP EDIT PF WORKAREA ///
app.get("/editpf", (req, res) => {
  res.render("edit-profile");
});

// TEMP SEARCH-RESULTS WORKAREA ///
app.get("/results", (req, res) => {
  res.render("search-results");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
