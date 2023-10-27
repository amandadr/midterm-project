const express = require("express");
const { getProfile, editProfile } = require("../db/queries/profiles");
const { getUserWithId } = require("../db/queries/users");
const {
  getResourcesByLikedUser,
  getResourcesByCategory,
} = require("../db/queries/resources");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/");
  }
  const id = req.session.userId;
  res.redirect(`profiles/${id}`);
});

router.get("/edit/:id", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/");
  }
  const user = req.session.userId;
  const profile = req.params.id;
  getProfile(user).then((data) => {
    const profileData = data[0];
    const templateVars = {
      user,
      profile,
      profileData,
    };
    res.render("edit-profile", templateVars);
  });
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

router.get("/:id/liked", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/");
  }
  const user = req.session.userId;
  getResourcesByLikedUser(user)
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

router.get("/:id/:category", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/");
  }
  const category = req.params.category;
  const user = req.session.userId;
  getResourcesByCategory(category, user)
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  editProfile(id, data)
    .then(() => {
      res.redirect(`/profiles/${id}`);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

module.exports = router;
