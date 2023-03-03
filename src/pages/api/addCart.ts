import type { NextApiRequest, NextApiResponse } from 'next';

type ReqBody = {
	item_id: number,
	cart_id: number,
	date: string,
	quantity: number,
	delete: boolean,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  	const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';

	const body: ReqBody = req.body;
	console.log(body);
	
	// item_idが被っているかどうかで処理を変える
	const cartItems: ReqBody[] = await fetch(`http://127.0.0.1:8000/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`).then((res) => res.json())
	console.log(cartItems);

	if (cartItems.length === 0) {
		// 被っていないパターン
		const response = await fetch("http://127.0.0.1:8000/cart_items", {
			method: req.method,
			headers: {
				"Authorization": `Bearer ${TOKEN}`,
				"Content-Type": "application/json",
	  		},
		  	body: JSON.stringify(req.body)
	  	})
  
		if (response.ok) {
			res.status(201).end();
		} else {
			res.status(401).end();
		}
	} else {
		// 被っているパターン
		const response = await fetch(`http://127.0.0.1:8000/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`, {
			method: "PATCH",
			headers: {
				"Authorization": `Bearer ${TOKEN}`,
				"Content-Type": "application/json",
	  		},
			body: JSON.stringify({
				quantity: body.quantity,
				delete: false
			})
		})

		if (response.ok) {
			res.status(201).end();
		} else {
			res.status(401).end();
		}
	}
}
