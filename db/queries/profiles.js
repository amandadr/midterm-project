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

const updateProfile = (id, data) => {
  const queryString = `UPDATE profiles SET bio = $1, avatar = $2 WHERE user_id = $3`;
  const queryParams = [data.bio, data.avatar, id];
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

const updateProfilePic = (id, data) => {
  const queryString = `UPDATE profiles SET avatar = $1 WHERE user_id = $2`;
  const queryParams = [data.avatar, id];
  return db.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
}

const updateDisplayName = (id, data) => {
  const queryString = `UPDATE profiles SET display_name = $1 WHERE user_id = $2`;
  const queryParams = [data.name, id];
  return db.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
}

const updatePronouns = (id, data) => {
  const queryString = `UPDATE profiles SET pronouns = $1 WHERE user_id = $2`;
  const queryParams = [data.pronouns, id];
  return db.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
}

const updateBio = (id, data) => {
  const queryString = `UPDATE profiles SET bio = $1 WHERE user_id = $2`;
  const queryParams = [data.bio, id];
  return db.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
}

module.exports = { getProfile, updateProfile, addProfile, getAllProfiles, updateProfilePic, updateDisplayName, updatePronouns, updateBio };
