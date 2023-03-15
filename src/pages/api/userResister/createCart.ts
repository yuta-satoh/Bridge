import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw";

    const email = req.query.email

    const uid: { id: number }[] = await (await fetch(`${process.env.SUPABASE_URL}/users?select=id&email=eq.${email}`, {
        method: "GET",
        headers: {
            "apikey": `${process.env.SUPABASE_API_KEY}`,
            "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
        },
    })).json()
  
    const response = await fetch(`${process.env.SUPABASE_URL}/carts`, {
        method: req.method,
        headers: {
            "apikey": `${process.env.SUPABASE_API_KEY}`,
            "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
        },
            body: JSON.stringify({ user_id: uid[0].id })
        })

    if (response.ok) {
        res.status(201).end()
    } else {
        res.status(400).json({message: "エラー"})
    }
}
