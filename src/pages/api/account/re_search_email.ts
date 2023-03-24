import type { NextApiRequest, NextApiResponse } from 'next';
import searchUser from '@/lib/searchUser';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { Users } from '@/types/types';

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ email: string }>
) {
  const { email } = req.body;
  const userId = req.session.user?.user;

  const searchEmailRes = await fetch(
    `${process.env.SUPABASE_URL}/users?email=eq.${email}&id=neq.${userId}`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const searchEmailResult: Users[] = await searchEmailRes.json();

  if (searchEmailResult.length !== 0) {
    res.status(200).json({ email: 'このメールアドレスはすでに使用されています' });
  } else {
    res.status(200).json({ email: '' });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
