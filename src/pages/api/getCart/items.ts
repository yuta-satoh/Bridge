import type { NextApiRequest, NextApiResponse } from 'next';

type CartItem = {
  id: number,
  item_id: number,
  cart_id: number,
  date: string,
  quantity: number,
  delete: boolean,
}

type ItemData = {
	id: number,
	name: string,
	description: string,
	genre: string,
	category: string,
	price: number,
	imgurl: string,
	stock: number,
	delete: boolean,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemData[]>
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
  const cartData: {
    id: number;
		user_id: number;
    delete: Boolean;
  }[] = await responceCart.json();

  const cartId: number = cartData[0].id;
	const responceCartItems = await fetch(
    `http://127.0.0.1:8000/cart_items?cart_id=eq.${cartId}&delete=eq.false`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const cartItemData: CartItem[] = await responceCartItems.json();
	
	const itemQuery = cartItemData.reduce((query, cartItem) => query + `,id.eq.${cartItem.item_id}`, "").replace(",", "")
  const responseItem = await fetch(
		`http://127.0.0.1:8000/items?or=(${itemQuery})`)
  const itemData: ItemData[] = await responseItem.json()

	const responceItemData = itemData.map((item, index) => {
		return {
			...item,
			cartInfo: cartItemData[index]
		}
	})

  // レスポンスの定義
  if (responceCartItems.ok) {
    res.status(200).json(responceItemData);
  } else {
    res.status(401).end();
  }
}
