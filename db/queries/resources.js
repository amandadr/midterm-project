const db = require("../connection");

const getResources = () => {
  return db.query("SELECT * FROM resources;").then((data) => {
    return data.rows;
  });
};

const getResourcePoster = (resourceId) => {
  return db
    .query(`SELECT name FROM users WHERE id = $1;`, [resourceId])
    .then((data) => data.rows[0]);
};

const getResourceLikes = (resourceId) => {
  return db
    .query(`SELECT COUNT(*) FROM likes WHERE resource_id = $1;`, [resourceId])
    .then((data) => data.rows[0].count);
};

const getResourceRating = (resourceId) => {
  return db
    .query(`SELECT AVG(rating) FROM ratings WHERE resource_id = $1;`, [
      resourceId,
    ])
    .then((data) => data.rows[0].avg);
};

module.exports = {
  getResources,
  getResourcePoster,
  getResourceLikes,
  getResourceRating,
};
