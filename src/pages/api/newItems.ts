import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
    const response = await fetch(`${process.env.SUPABASE_URL}/items?order=id.desc&limit=9`, {
        method: "GET",
        headers: {
            "apikey": `${process.env.SUPABASE_API_KEY}`,
            "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
        }
    })
    
    const data = await response.json()
	if (response.ok) {
		res.status(200).json(data);
	} else {
		res.status(400).end();
	}
}
