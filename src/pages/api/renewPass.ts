import type { Users } from '@/types/types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handler, sessionOptions);

// レスポンス用型エイリアス
type Data = {
  message: string;
};

async function handler(
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
    req.session.destroy()
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(401).json({ message: 'Failed' });
  }
}
