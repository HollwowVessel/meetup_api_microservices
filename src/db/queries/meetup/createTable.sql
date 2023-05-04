CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    tags TEXT[],
    timestamps TIMESTAMP WITH TIME ZONE,
    participants INTEGER[],
    creator_id INTEGER REFERENCES users (id)
);
