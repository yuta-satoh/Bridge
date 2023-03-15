import type { NextApiRequest, NextApiResponse } from 'next';

type Item = {
    id: number;
    name: string;
    description: string;
    genre: string;
    category: string;
    price: number;
    imgurl: string;
    stock: number;
    delete: boolean;
  };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
  const genre = req.query.genre as string;
  const category = req.query.category as string;
  const responseItems = await fetch(
    `items?genre=eq.${genre}&category=eq.${category}`,
    {
      method: 'GET',
      headers: {
        "apikey": `${process.env.SUPABASE_API_KEY}`,
        "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const guestItems: Item[] = await responseItems.json();

  if (responseItems.ok) {
    res.status(200).json(guestItems);
  } else {
    res.status(401).end();
  }
}
