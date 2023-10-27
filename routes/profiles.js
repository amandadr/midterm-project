const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/");
  }
  const id = req.session.userId;
  res.redirect(`/${id}`);
});

router.get("/:id", (req, res) => {
  const user = req.session.userId;
  const profile = req.params.id;
  const templateVars = {
    user,
    profile,
  };
  res.render("profile-page", templateVars);
});

module.exports = router;
