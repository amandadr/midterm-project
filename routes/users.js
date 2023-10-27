/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const users = require("../db/queries/users");
const profiles = require("../db/queries/profiles");
const router = express.Router();

router.get("/", (req, res) => {
  const user = req.session.userID;
  const templateVars = {
    user,
  };
  res.render("users", templateVars);
});


//  REGISTER
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  users
    .addUser(user)
    .then((user) => {
      if (!user) {
        return res.send({ error: "error" });
      } else {
        res.redirect("/");
      }
      req.session.userId = user.rows[0].id;
      profiles.addProfile(name, user.rows[0].id);

      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
      res.send(err);
    });
});

// LOGIN
router.post("/login", (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  users.getUserWithEmail(email.toLowerCase()).then((user) => {
    if (!user) {
      return res.send({ error: "no user with that email" });
    } else if (user.password !== password) {
      return res.send({ error: "invalid password" });
    } else {

    req.session.userId = user.id;
    res.redirect(`/`);
  });
});

router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect("/");
});

module.exports = router;
