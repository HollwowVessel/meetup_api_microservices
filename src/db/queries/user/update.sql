UPDATE users
SET username = ${username}, 
email = ${email}, password = ${password},sex = ${sex},name = ${name}
WHERE id = ${id}
RETURNING *
