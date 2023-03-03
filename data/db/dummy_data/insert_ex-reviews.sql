INSERT INTO api.reviews (
    item_id, user_id, anonymous ,evaluation, title, description, date
) VALUES (
    1
    , 2
    , false
    , 4
    , '可愛いくて使いやすい'
    , 'デザインがとっても可愛いく、使いやすいと感じました！'
    , '2023-02-22'
), (
    1
    , 1
    , true
    , 3
    , ''
    , '2種類の配色があるのがとても良いと思いました。' 
    , '2023-03-07'
), (
    2
    , 1
    , true
    , 2
    , 'タイトル'
    , '本文' 
    , '2023-03-02'
), (
    3
    , 1
    , true
    , 4
    , 'タイトル'
    , '本文' 
    , '2023-03-02'
), (
    4
    , 2
    , false
    , 5
    , 'タイトル'
    , '本文' 
    , '2023-03-02'
);
