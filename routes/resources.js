const express = require("express");
const router = express.Router();
const profiles = require("../db/queries/profiles");
const resourceQueries = require("../db/queries/resources");

router.get("/:id", (req, res) => {
  const resourceId = req.params.id;
  console.log(resourceId);
  const user = req.session.userId;
  const userProfile = profiles.getProfile(user);
  const templateVars = {
    user,
    userProfile,
    resourceId,
  };
  res.render("view-resource", templateVars);
});

module.exports = router;
