// const express = require("express");
// const router = express.Router();
// const profilesQueries = require("../db/queries/profiles");
// const resourceQueries = require("../db/queries/resources");

// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   profilesQueries
//     .getProfile(id)
//     .then((profile) => {
//       res.json({ profile });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//       console.log(err.message);
//     });
// });
