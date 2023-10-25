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
  res.render("profile-page");
});
