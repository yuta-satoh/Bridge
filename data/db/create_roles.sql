DROP ROLE IF EXISTS authenticator;
DROP ROLE IF EXISTS web_anon;
DROP ROLE IF EXISTS api_user;

CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD 'password';

CREATE ROLE web_anon NOLOGIN;
COMMENT ON ROLE web_anon IS 'Anonymous role for api schema';
GRANT USAGE ON SCHEMA api TO web_anon;
GRANT web_anon TO authenticator;

CREATE ROLE api_user NOLOGIN;
COMMENT ON ROLE api_user IS 'Operator role for api schema';
GRANT USAGE ON SCHEMA api TO api_user;
GRANT api_user TO authenticator;
