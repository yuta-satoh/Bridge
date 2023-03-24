import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { resData } from '@/types/types';

type Cart = {
  id: number,
  user_id: number,
  delete: boolean,
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cart[] | resData >
) {
  const user = req.session.user?.user
  const responceCart = await fetch(
    `${process.env.SUPABASE_URL}/carts?user_id=eq.${user}`,
    {
      method: 'GET',
      headers: {
        "apikey": `${process.env.SUPABASE_API_KEY}`,
        "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const cartData: Cart[] = await responceCart.json();

  // レスポンスの定義
  if (cartData.length !== 0) {
    res.status(200).json(cartData);
  } else {
    res.status(400).json({ message: 'Cart is Nothing' });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
