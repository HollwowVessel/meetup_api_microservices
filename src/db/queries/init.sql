CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    password TEXT,
    sex TEXT,
    name TEXT DEFAULT NULL,
    refresh_token TEXT,
    role TEXT
);
CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    tags TEXT[],
    timestamps TIMESTAMP WITH TIME ZONE,
    participants INTEGER[],
    creator_id INTEGER REFERENCES users (id)
);
