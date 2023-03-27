import { resData } from '@/types/types';
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
  res: NextApiResponse<Item[] | resData>
) {
  const genre = req.query.genre as string;
  const category = req.query.category as string;
  const responseItems = await fetch(
    `${process.env.SUPABASE_URL}/items?genre=eq.${genre}&category=eq.${category}`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (responseItems.ok) {
    const guestItems: Item[] = await responseItems.json();
    res.status(200).json(guestItems);
  } else {
    res.status(responseItems.status).json({ message: 'Getting Items was failed.' });
  }
}
