import type { NextApiRequest, NextApiResponse } from 'next';

type ReqBody = {
    item_id: number,
	cart_id: number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: ReqBody = req.body
  const response = await fetch(`${process.env.SUPABASE_URL}/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`, {
		method: "DELETE",
		headers: {
      "apikey": `${process.env.SUPABASE_API_KEY}`,
      "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
      "Content-Type": "application/json",
    },
	})

	if (response.ok) {
		res.status(201).end();
	} else {
		res.status(401).end();
	}
}
