import type { NextApiRequest, NextApiResponse } from 'next';

type ReqBody = {
    item_id: number,
    cart_id: number,
    quantity: number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';

    const body: ReqBody = req.body
    console.log(body)
    // supabase変更前
    // const response = await fetch(`http://127.0.0.1:8000/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`, {
    // supabase変更
    const response = await fetch(`${process.env.SUPABASE_URL}/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`, {
        method: "PATCH",
        headers: {
            // supabase変更前
            // "Authorization": `Bearer ${TOKEN}`,

            // supabase変更、追加
            "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
            "apikey": `${process.env.SUPABASE_API_KEY}`,

            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            quantity: body.quantity
        })
    })
    
	if (response.ok) {
		res.status(200).end();
	} else {
		res.status(response.status).end();
	}
}
