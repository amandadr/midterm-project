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

router.post("/:id/like", (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.userId;
  resourceQueries
    .likeResource(resourceId, userId)
    .then(() => {
      res.redirect(`/resources/${resourceId}`);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

router.post("/:id/unlike", (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.userId;
  resourceQueries
    .unlikeResource(resourceId, userId)
    .then(() => {
      res.redirect(`/resources/${resourceId}`);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

router.post("/:id/rate", (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.userId;
  const { rating } = req.body;

  resourceQueries.resourceRatedByUser(resourceId, userId).then((result) => {
    if (result) {
      return res
        .status(400)
        .json({ error: "User already rated this resource" });
    } else {
      resourceQueries
        .rateResource(resourceId, userId, rating)
        .then((resource) => {
          res.json({ resource });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
          console.log(err.message);
        });
    }
  });
});

module.exports = router;
