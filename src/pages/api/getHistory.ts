import { resData } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Item = {
  id: number;
  item_id: number;
  user_id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
  date: string;
  quantity: number;
  delete: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[] | resData>
) {
  const userId = req.query.id as string;
  const order = req.query.order as string;
  const responseItems = await fetch(
    `${process.env.SUPABASE_URL}/order_histories?user_id=eq.${userId}&order=${order}`,
    {
      method: 'GET',
      headers: {
        "apikey": `${process.env.SUPABASE_API_KEY}`,
        "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (responseItems.ok) {
    const guestItems: Item[] = await responseItems.json();
    res.status(200).json(guestItems);
  } else {
    res.status(401).json({ message: 'Getting order-history was feiled' });
  }
}
