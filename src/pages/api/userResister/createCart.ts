import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw";

    const email = req.query.email

    const uid: { id: number }[] = await (await fetch(`http://127.0.0.1:8000/users?select=id&email=eq.${email}`)).json()
  
    const response = await fetch("http://127.0.0.1:8000/carts", {
            method: req.method,
            headers: {
        "Authorization": `Bearer ${TOKEN}`,
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
