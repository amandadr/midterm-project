const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/");
  }
  const id = req.session.userId;
  res.redirect(`/${id}`);
});

router.get(`/:`, (req, res) => {
  const user = req.session.userId;
  const userDetails = users.getUserWithId(user);
  const userProfile = profiles.getProfile(user);
  const templateVars = {
    user,
    userDetails,
    userProfile
  };
  res.render("profile-page", templateVars);
});

module.exports = router;
