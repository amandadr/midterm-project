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

const addResource = (title, description, url, user_id, img_url) => {
  const query = {
    text: "INSERT INTO resources(title, description, url, user_id, img_url) VALUES($1, $2, $3, $4, $5) RETURNING *",
    values: [title, description, url, user_id, img_url],
  };
  return db.query(query).then((res) => res.rows[0]);
};

module.exports = {
  getResources,
  getResourcePoster,
  getResourceLikes,
  getResourceRating,
  addResource,
};
