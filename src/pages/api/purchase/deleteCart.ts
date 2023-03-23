import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  const response = await fetch(`${process.env.SUPABASE_URL}/cart_items?item_id=eq.${id}`, {
    method: req.method,
    headers: {
      "apikey": `${process.env.SUPABASE_API_KEY}`,
      "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })

	if (response.ok) {
		res.status(200).json({ message: 'OK' });
	} else {
		res.status(401).json({ message: 'Failed' });
	}
}
