import { Items, resData } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Items[] | resData>
) {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/items?order=id.desc&limit=9`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res
      .status(401)
      .json({ message: 'Getting new items was failed.' });
  }
}
