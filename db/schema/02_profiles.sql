-- Drop and recreate Profiles table

DROP TABLE IF EXISTS profiles CASCADE;
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  pfp_url VARCHAR(255),
  bio VARCHAR(255),
  pronouns VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) NOT NULL
);
