SELECT * FROM meetups
WHERE $1 = ANY (participants)
ORDER BY id ASC
