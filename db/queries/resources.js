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
    .query(
      `SELECT ROUND(AVG(rating), 1) FROM ratings WHERE resource_id = $1;`,
      [resourceId]
    )
    .then((data) => data.rows[0].round);
};

const addResource = (title, description, url, user_id, img_url) => {
  const query = {
    text: "INSERT INTO resources(title, description, url, user_id, img_url) VALUES($1, $2, $3, $4, $5) RETURNING *",
    values: [title, description, url, user_id, img_url],
  };
  return db.query(query).then((res) => res.rows[0]);
};

const getLikedResources = (userId) => {
  return db
    .query(
      `SELECT resources.* FROM resources JOIN likes ON resources.id = likes.resource_id WHERE likes.user_id = $1;`,
      [userId]
    )
    .then((data) => data.rows);
};

const getResourcesByUser = (userId) => {
  return db
    .query(`SELECT * FROM resources WHERE user_id = $1;`, [userId])
    .then((data) => data.rows);
};

const getResourceById = (id) => {
  return db
    .query(`SELECT * FROM resources WHERE id = $1;`, [id])
    .then((data) => data.rows[0]);
};

const getAllComments = () => {
  return db.query(`SELECT * FROM comments;`).then((data) => data.rows);
};

const getResourceComments = (resourceId) => {
  return db
    .query(`SELECT * FROM comments WHERE resource_id = $1;`, [resourceId])
    .then((data) => data.rows);
};

const getCommentsPoster = (commentId) => {
  return db
    .query(`SELECT name FROM users WHERE id = $1;`, [commentId])
    .then((data) => data.rows[0]);
};

const addComment = (comment, resourceId, userId) => {
  const query = {
    text: "INSERT INTO comments(comment, resource_id, user_id) VALUES($1, $2, $3) RETURNING *",
    values: [comment, resourceId, userId],
  };
  return db.query(query).then((res) => res.rows[0]);
};

module.exports = {
  getResources,
  getResourcePoster,
  getResourceLikes,
  getResourceRating,
  addResource,
  getLikedResources,
  getResourcesByUser,
  getResourceById,
  getAllComments,
  getResourceComments,
  getCommentsPoster,
  addComment,
};
