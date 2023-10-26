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
      console.log(err.message);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getResourceById(id)
    .then((resource) => {
      res.json({ resource });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

router.get("/likes/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getResourceLikes(id)
    .then((likes) => {
      res.json({ likes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
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
      console.log(err.message);
    });
});

router.get("/rating/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getResourceRating(id)
    .then((rating) => {
      res.json({ rating });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
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
      console.log(err.message);
    });
});

module.exports = router;
