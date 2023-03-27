import type { NextApiRequest, NextApiResponse } from 'next';
import type { Users } from '@/types/types';

// レスポンス用型エイリアス
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const profile: Users  = req.body;

  const responce = await fetch(
    `${process.env.SUPABASE_URL}/users?id=eq.${profile.id}`,
    {
      method: 'PUT',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    }
  );

  if (responce.ok) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(responce.status).json({ message: 'Failed' });
  }
}
