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
    .query(
      `SELECT COUNT(DISTINCT user_id) FROM likes WHERE resource_id = $1;`,
      [resourceId]
    )
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

const addResource = (title, description, url, user_id, img_url, category) => {
  const query = {
    text: "INSERT INTO resources(title, description, url, user_id, img_url, category) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    values: [title, description, url, user_id, img_url, category],
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
    text: "INSERT INTO comments(body, resource_id, user_id) VALUES($1, $2, $3) RETURNING *",
    values: [comment, resourceId, userId],
  };
  return db.query(query).then((res) => res.rows[0]);
};

const likeResource = (resourceId, userId) => {
  const query = {
    text: "INSERT INTO likes(resource_id, user_id, liked) VALUES($1, $2, $3) RETURNING *",
    values: [resourceId, userId, true],
  };
  return db.query(query).then((res) => res.rows[0]);
};

const unlikeResource = (resourceId, userId) => {
  const query = {
    text: "DELETE FROM likes WHERE resource_id = $1 AND user_id = $2",
    values: [resourceId, userId],
  };
  return db.query(query);
};

const rateResource = (resourceId, userId, rating) => {
  const query = {
    text: "INSERT INTO ratings(resource_id, user_id, rating) VALUES($1, $2, $3) RETURNING *",
    values: [resourceId, userId, rating],
  };
  return db.query(query).then((res) => res.rows[0]);
};

const resourceRatedByUser = (resourceId, userId) => {
  return db
    .query(`SELECT * FROM ratings WHERE resource_id = $1 AND user_id = $2;`, [
      resourceId,
      userId,
    ])
    .then((data) => data.rows[0]);
};

const getResourceLikedByUser = (resourceId, userId) => {
  return db
    .query(`SELECT * FROM likes WHERE resource_id = $1 AND user_id = $2;`, [
      resourceId,
      userId,
    ])
    .then((data) => data.rows[0]);
};

const getResourcesBySearch = (search) => {
  return db
    .query(
      `SELECT * FROM resources WHERE title ILIKE $1 OR description ILIKE $1;`,
      [`%${search}%`]
    )
    .then((data) => data.rows);
};

const getResourcesByCategory = (category, userId) => {
  const query = {
    text: "SELECT * FROM resources WHERE category = $1 AND user_id = $2",
    values: [category, userId],
  };
  return db.query(query).then((res) => res.rows);
};

const getResourcesByLikedUser = (userId) => {
  const query = {
    text: `SELECT * FROM resources WHERE id IN (SELECT resource_id FROM likes WHERE user_id = $1)`,
    values: [userId],
  };
  return db.query(query).then((res) => res.rows);
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
  likeResource,
  unlikeResource,
  rateResource,
  resourceRatedByUser,
  getResourceLikedByUser,
  getResourcesBySearch,
  getResourcesByCategory,
  getResourcesByLikedUser,
};
