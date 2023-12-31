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
const profilesRoutes = require("./routes/profiles");
const profilesApiRoutes = require("./routes/profiles-api");
const resourcesRoutes = require("./routes/resources");
const commentsApiRoutes = require("./routes/comments-api");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/api/resources", resourcesApiRoutes);
app.use("/users", usersRoutes);
app.use("/resources", resourcesRoutes);
app.use("/api/comments", commentsApiRoutes);

const profiles = require("./db/queries/profiles");
app.use("/profiles", profilesRoutes);
app.use("/api/profiles", profilesApiRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const user = req.session.userId;
  const templateVars = {
    user,
  };
  res.render("index", templateVars);
});

app.get("/post", (req, res) => {
  res.render("newResource");
});

// TEMP PFP WORKAREA ///
app.get("/userpf", (req, res) => {
  const user = req.session.userId;
  const templateVars = {
    user,
  };
  res.render("profile-page", templateVars);
});

// TEMP EDIT PF WORKAREA ///
app.get("/editpf", (req, res) => {
  const user = req.session.userId;
  const templateVars = {
    user,
  };
  res.render("edit-profile", templateVars);
});

// TEMP VIEW RESULT WORKAREA ///
app.get("/viewres", (req, res) => {
  const user = req.session.userId;
  const templateVars = {
    user,
  };
  res.render("view-resource", templateVars);
});

// TEMP SEARCH-RESULTS WORKAREA ///
app.get("/results", (req, res) => {
  const user = req.session.userId;
  const templateVars = {
    user,
  };
  res.render("search-results", templateVars);
});

// TEMP PIC REDIRECT ///
app.get("/null", (req, res) => {
  res.redirect(
    "https://i.etsystatic.com/34711428/r/il/9c16cb/4756246624/il_fullxfull.4756246624_88x2.jpg"
  );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
