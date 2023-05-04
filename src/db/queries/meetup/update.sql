UPDATE meetups
SET name = ${name}, description = ${description}, tags = ${tags}, timestamps = ${timestamps}, participants = ${participants}
WHERE id = ${id}
RETURNING *