import type { NextApiRequest, NextApiResponse } from 'next';

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
}

type Carts = {
  id: number;
  user_id: number;
  delete: boolean;
}

type CartItemsData = {
  id: number;
  item_id: number;
  cart_id: number;
  date: Date;
  quantity: number;
  delete: boolean;
  items: Items;
  carts: Carts;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartItemsData[]>
) {
	const userId = req.query.id as string
	const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const responce= await fetch(
    `http://127.0.0.1:8000/cart_items?select=*,items(*),carts(*)&cart_id=eq.${userId}&order=id.desc`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await responce.json();
  // レスポンスの定義
  if (responce.ok) {
    res.status(200).json(data);
  } else {
    res.status(401).end();
  }
}
