-- Drop and recreate Resources table

DROP TABLE IF EXISTS resources CASCADE;
CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  url TEXT NOT NULL,
  img_url TEXT DEFAULT 'https://i.etsystatic.com/34711428/r/il/9c16cb/4756246624/il_fullxfull.4756246624_88x2.jpg',
  category TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
