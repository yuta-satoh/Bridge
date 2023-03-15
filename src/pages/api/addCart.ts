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
	const body: ReqBody = req.body;
	
	// item_idが被っているかどうかで処理を変える
	const cartItems: ReqBody[] = await fetch(
		`${process.env.SUPABASE_URL}/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`, {
			method: "GET",
			headers: {
				"apikey": `${process.env.SUPABASE_API_KEY}`,
				"Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
				"Content-Type": "application/json",
	  		},
		}
	).then((res) => res.json())

	if (cartItems.length === 0) {
		// 被っていないパターン
		const response = await fetch(`${process.env.SUPABASE_URL}/cart_items`, {
			method: req.method,
			headers: {
				"apikey": `${process.env.SUPABASE_API_KEY}`,
				"Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
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
		const response = await fetch(`${process.env.SUPABASE_URL}/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`, {
			method: "PATCH",
			headers: {
				"apikey": `${process.env.SUPABASE_API_KEY}`,
				"Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
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
