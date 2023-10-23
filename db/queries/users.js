const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  let queryParams = [email];
  let queryString = `SELECT * FROM users WHERE email = $1;`;
  return db.query(queryString, queryParams).then((result) => {
    return result.rows[0];
  });
};

/**
 * Get a single user from the database given their handle.
 * @param {string} name The handle of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithHandle = function (name) {
  let queryParams = [name];
  let queryString = `SELECT * FROM users WHERE name = $1;`;
  return db.query(queryString, queryParams).then((result) => {
    return result.rows[0];
  });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  let queryParams = [id];
  let queryString = `SELECT * FROM users WHERE id = $1;`;
  return db.query(queryString, queryParams).then((result) => {
    return result.rows[0];
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  let queryParams = [user.name, user.email, user.password];
  let queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`;
  return db.query(queryString, queryParams);
};

module.exports = {
  getUsers,
  getUserWithEmail,
  getUserWithHandle,
  getUserWithId,
  addUser,
};
