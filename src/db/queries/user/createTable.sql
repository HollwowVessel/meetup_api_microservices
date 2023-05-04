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
