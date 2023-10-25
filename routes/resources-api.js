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

router.post("/", (req, res) => {
  const { title, description, url, img_url, category } = req.body;
  const user_id = req.session.userId;
  resourceQueries
    .addResource(title, description, url, user_id, img_url, category)
    .then((resource) => {
      res.json({ resource });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
