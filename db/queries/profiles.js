const db = require("../connection");

const getProfile = (id) => {
  const queryString = `SELECT * FROM profiles WHERE user_id = $1`;
  const queryParams = [id];
  return db.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
};

const updateProfile = (id, data) => {
  const queryString = `UPDATE profiles SET bio = $1, avatar = $2 WHERE user_id = $3`;
  const queryVal = [data.bio, data.avatar, id];
  return db.query(queryString, queryVal).then((data) => {
    return data.rows;
  });
};

module.exports = { getProfile, updateProfile };
