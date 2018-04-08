create table users (
    id serial primary key, 
    auth0_id varchar, 
    display_name text, 
    acct_type text, 
    acct_permissions text
);

insert into users (
    auth0_id,
    display_name,
    acct_type,
    acct_permissions
) values (
    'google-oauth2|111302792657667619345',
    'Taylor McKay',
    'user',
    'pending'
);