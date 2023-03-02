-- @block
DROP TABLE IF EXISTS api.items CASCADE;
CREATE TABLE api.items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    genre TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    imgUrl TEXT NOT NULL,
    stock INTEGER NOT NULL,
    delete BOOLEAN DEFAULT false NOT NULL 
);
GRANT SELECT ON api.items TO web_anon;
GRANT ALL ON api.items to api_user;
GRANT USAGE ON SEQUENCE api.items_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.users CASCADE;
CREATE TABLE api.users (
    id SERIAL PRIMARY KEY,
    lastName TEXT NOT NULL,
    firstName TEXT NOT NULL,
    gender TEXT NOT NULL,
    tell TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    zipcode TEXT NOT NULL,
    address TEXT NOT NULL,
    password TEXT NOT NULL UNIQUE,
    delete BOOLEAN DEFAULT false NOT NULL
);
GRANT SELECT ON api.users TO web_anon;
GRANT ALL ON api.users to api_user;
GRANT USAGE ON SEQUENCE api.users_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.carts CASCADE;
CREATE TABLE api.carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES api.users (id),
    delete BOOLEAN DEFAULT false NOT NULL
);
GRANT SELECT ON api.carts TO web_anon;
GRANT ALL ON api.carts to api_user;
GRANT USAGE ON SEQUENCE api.carts_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.cart_items CASCADE;
CREATE TABLE api.cart_items (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES api.items (id),
    cart_id INTEGER NOT NULL REFERENCES api.carts (id),
    date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    delete BOOLEAN DEFAULT false NOT NULL
);
GRANT SELECT ON api.cart_items TO web_anon;
GRANT ALL ON api.cart_items to api_user;
GRANT USAGE ON SEQUENCE api.cart_items_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.order_histories CASCADE;
CREATE TABLE api.order_histories (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES api.items (id),
    user_id INTEGER NOT NULL REFERENCES api.users (id),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    genre TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    imgUrl TEXT NOT NULL,
    date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    delete BOOLEAN DEFAULT false NOT NULL
);
GRANT SELECT ON api.order_histories TO web_anon;
GRANT ALL ON api.order_histories to api_user;
GRANT USAGE ON SEQUENCE api.order_histories_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.reviews CASCADE;
CREATE TABLE api.reviews (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES api.items (id),
    user_id INTEGER NOT NULL REFERENCES api.users (id),
    evaluation TEXT NOT NULL,
    title TEXT,
    description TEXT,
    delete BOOLEAN DEFAULT false NOT NULL
);
GRANT SELECT ON api.reviews TO web_anon;
GRANT ALL ON api.reviews to api_user;
GRANT USAGE ON SEQUENCE api.reviews_id_seq TO api_user;
