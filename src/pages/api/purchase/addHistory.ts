import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const response = await fetch(`${process.env.SUPABASE_URL}/order_histories`, {
      method: req.method,
      headers: {
        "apikey": `${process.env.SUPABASE_API_KEY}`,
        "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    })
    
      if (response.ok) {
          res.status(201).end();
      } else {
          res.status(401).end();
      }
  }
