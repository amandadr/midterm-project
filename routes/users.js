/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const users = require("../db/queries/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  users
    .addUser(user)
    .then((user) => {
      if (!user) {
        return res.send({ error: "error" });
      }

      req.session.userId = user.id;
    })
    .catch((e) => res.send(e));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  users.getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.send({ error: "no user with that email" });
    }
    if (user.password !== password) {
      return res.send({ error: "invalid password" });
    }

    req.session.userId = user.id;
    res.send({
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    });
  });
});

module.exports = router;
