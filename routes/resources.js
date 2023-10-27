const express = require("express");
const router = express.Router();
const profiles = require("../db/queries/profiles");
const resourceQueries = require("../db/queries/resources");

router.get("/:id", (req, res) => {
  const resourceId = req.params.id;
  console.log(resourceId);
  const user = req.session.userId;
  const userProfile = profiles.getProfile(user);
  console.log(user);
  const templateVars = {
    user,
    userProfile,
    resourceId,
  };
  res.render("view-resource", templateVars);
});

router.post("/:id/ratings", (req, res) => {
  const rating = req.body.rating;
  const resourceId = req.params.id;
  const userId = req.session.userId;
  resourceQueries
    .addRating(rating, resourceId, userId)
    .then((rating) => {
      res.json({ rating });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

module.exports = router;
