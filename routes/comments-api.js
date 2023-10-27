const express = require("express");
const router = express.Router();
const resourceQueries = require("../db/queries/resources");

router.get("/", (req, res) => {
  resourceQueries
    .getAllComments()
    .then((comments) => {
      res.json({ comments });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getResourceComments(id)
    .then((comments) => {
      res.json({ comments });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

router.get("/poster/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getCommentsPoster(id)
    .then((poster) => {
      res.json({ poster });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

router.post("/", (req, res) => {
  const { body, resourceId } = req.body;
  const userId = req.session.userId;
  resourceQueries
    .addComment(body, resourceId, userId)
    .then((body) => {
      res.json({ body });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    });
});

module.exports = router;
