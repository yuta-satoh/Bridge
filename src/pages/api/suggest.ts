import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const input = req.query.input
    const response = await fetch(`${process.env.SUPABASE_URL}/items?name=like.*${input}*&limit=9`, {
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
		res.status(response.status).end();
	}
}
