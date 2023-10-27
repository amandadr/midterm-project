const db = require("../connection");

const getAllProfiles = () => {
  const queryString = `SELECT * FROM profiles`;
  return db.query(queryString).then((data) => {
    return data.rows;
  });
};

const getProfile = (id) => {
  const queryString = `SELECT * FROM profiles WHERE user_id = $1`;
  const queryParams = [id];
  return db.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
};

const addProfile = (display_name, user_id) => {
  const queryString = `INSERT INTO profiles (display_name, user_id) VALUES ($1, $2) RETURNING *`;
  const queryParams = [display_name, user_id];
  return db.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
};

const editProfile = (id, data) => {
  const queryString = `UPDATE profiles SET display_name = $1, bio = $2, pronouns = $3, pfp_url = $4 WHERE user_id = $5`;
  const queryParams = [
    data.display_name,
    data.bio,
    data.pronouns,
    data.pfp_url,
    id,
  ];
  return db.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
};

module.exports = {
  getProfile,
  addProfile,
  getAllProfiles,
  editProfile,
};
