import type { NextApiRequest, NextApiResponse } from 'next';

type Reviews = {
  id: number;
  item_id: number;
  user_id: number;
  nickname: string;
  anonymous: boolean;
  evaluation: number;
  title: string;
  description: string;
  date: Date;
  delete: boolean;
  users: { lastname: string; firstname: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Reviews[]>
) {
  const itemId = req.query.itemId as string;
  const responseItems = await fetch(
    `${process.env.SUPABASE_URL}/reviews?select=*,users(lastname,firstname)&item_id=eq.${itemId}&order=date.desc`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const guestItems: Reviews[] = await responseItems.json();

  if (responseItems.ok) {
    res.status(200).json(guestItems);
  } else {
    res.status(400).end();
  }
}
