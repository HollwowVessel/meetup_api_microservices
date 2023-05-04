INSERT INTO meetups (name, description, tags, timestamps, participants, creator_id)
VALUES (${name}, ${description}, ${tags}, ${timestamps}, ${participants}, ${creator_id})
RETURNING *
