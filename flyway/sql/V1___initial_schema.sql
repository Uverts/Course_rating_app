CREATE TABLE courses (
  course_code TEXT PRIMARY KEY,
  course_name TEXT NOT NULL,
  course_description TEXT NOT NULL,
  rating_sum NUMERIC DEFAULT 0,
  feedback_count NUMERIC DEFAULT 0
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  pw_hash TEXT NOT NULL
);

CREATE TABLE feedbacks (
  course_code TEXT NOT NULL REFERENCES courses,
  user_id INTEGER NOT NULL REFERENCES users,
  rating NUMERIC(3, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  PRIMARY KEY (course_code, user_id)
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users,
  course_code TEXT NOT NULL REFERENCES courses,
  content TEXT NOT NULL,
  created_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_users_username ON users (username);
