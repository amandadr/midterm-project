const express = require("express");
const router = express.Router();
const resourceQueries = require("../db/queries/resources");

router.get("/results/:id", (req, res) => {
  const searchId = req.params.id;
  console.log(searchId);
  const templateVars = {
    searchId
  };
  res.render("search-results", templateVars);
});

module.exports = router;
