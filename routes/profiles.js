const express = require("express");
const { getProfile } = require("../db/queries/profiles");
const { getUserWithId } = require("../db/queries/users");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/");
  }
  const id = req.session.userId;
  res.redirect(`profiles/${id}`);
});

router.get("/:id", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/");
  }
  const user = req.session.userId;
  const profile = req.params.id;
  getProfile(user).then((data) => {
    const profileData = data[0];
    getUserWithId(user).then((data) => {
      const userData = data;
      console.log(userData);
      const templateVars = {
        user,
        profile,
        profileData,
        userData,
      };
      res.render("profile-page", templateVars);
    });
  });
});

module.exports = router;
