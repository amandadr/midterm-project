const express = require("express");
const router = express.Router();
const resourceQueries = require("../db/queries/resources");

router.get("/", (req, res) => {
  resourceQueries
    .getResources()
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/likes", (req, res) => {
  resourceQueries
    .getResourceLikes()
    .then((likes) => {
      res.json({ likes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/poster/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getResourcePoster(id)
    .then((poster) => {
      res.json({ poster });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/rating", (req, res) => {
  resourceQueries
    .getResourceRating()
    .then((rating) => {
      res.json({ rating });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
