INSERT INTO users (username, email, password, role)
VALUES (${username}, ${email}, ${password}, ${role}) RETURNING *
