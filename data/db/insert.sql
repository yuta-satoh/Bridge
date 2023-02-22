INSERT INTO api.users (
    lastName, firstName, gender, email, tell, zipcode, address, password
) VALUES (
    '楽須'
    , '太郎'
    , '男'
    , 'rakus@example.com'
    , '111-1111-1111'
    , '160-0022'
    , '東京都新宿区新宿2-5-12 8F'
    , 'rakus'
);

-- @block
, VALUES (
    ''
    , ''
    , ''
    , ''
    , 
    , '/images//'
    , 
)

-- @block
INSERT INTO api.items (
    name, description, genre, cateory, price, imgUrl, stock
) VALUES (
    '竹椅子'
    , '屋外使用も可能な、モダンなラウンジチェア。'
    , '和モダン'
    , '椅子'
    , 13200
    , '/images/chair/chair_jmodern_1.jpeg'
    , 55
), VALUES (
    '木座椅子'
    , 'ゆったりとくつろげる作りで、コタツにも合う座椅子。'
    , '和モダン'
    , '椅子'
    , 12000
    , '/images/public/chair_jmodern_2.jpeg'
    , 100
), VALUES (
    '和座椅子'
    , 'お手持ちの座布団との組み合わせを楽しむ座椅子。'
    , '和モダン'
    , '椅子'
    , 8900
    , '/images/chair/chair_jmodern_3.jpeg'
    , 
)
