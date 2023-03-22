type Items = {
    id: number;
    name: string;
    description: string;
    genre: string;
    category: string;
    price: number;
    imgurl: string;
    stock: number;
    delete: boolean;
};

type Users = {
    id: number;
    lastname: string;
    firstname: string;
    gender: string;
    tell: string;
    email: string;
    zipcode: string;
    address: string;
    password: string;
    delete: Boolean;
}

type Carts = {
    id: number;
    user_id: number;
    delete: boolean;
}

type Cart_items = {
    id: number,
    item_id: number,
    cart_id: number,
    date: string,
    quantity: number,
    delete: boolean,
}

type Order_histories = {
    id: number;
    item_id: number;
    user_id: number;
    name: string;
    description: string;
    genre: string;
    category: string;
    price: number;
    imgUrl: string;
    date: string;
    quantity: number;
    dalete: boolean;
}

type Reviews = {
    id: number;
    item_id: number;
    user_id: number;
    nickname: string;
    anonymous: boolean;
    evaluation: number;
    title: string;
    description: string;
    delete: boolean;
}

// ハンドラ関数レスポンス用型エイリアス
type resData = {
    message: string;
  };

export type { Items, Users, Carts, Cart_items, Order_histories, Reviews, resData }
