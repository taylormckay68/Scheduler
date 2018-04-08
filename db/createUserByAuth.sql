insert into users 
(auth0_id, display_name, acct_type, acct_permissions) 
values ($1, $2, $3, $4) returning *;