import type { NextApiRequest, NextApiResponse } from 'next';

type Cart = {
  id: number,
  user_id: number,
  delete: boolean,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cart[]>
) {
	const userId = req.query.id as string
	const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const responceCart = await fetch(
    `http://127.0.0.1:8000/carts?user_id=eq.${userId}`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const cartData: Cart[] = await responceCart.json();

  // レスポンスの定義
  if (responceCart.ok) {
    res.status(200).json(cartData);
  } else {
    res.status(401).end();
  }
}
