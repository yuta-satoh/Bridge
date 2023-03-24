import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { resData } from '@/types/types';

export default withIronSessionApiRoute(handler, sessionOptions);

type Items = {
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

type Carts = {
  id: number;
  user_id: number;
  delete: boolean;
};

type CartItemsData = {
  id: number;
  item_id: number;
  cart_id: number;
  date: Date;
  quantity: number;
  delete: boolean;
  items: Items;
  carts: Carts;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartItemsData[] | resData>
) {
  // const userId = req.query.id as string
  const user = req.session.user?.user;
  const responce = await fetch(
    `${process.env.SUPABASE_URL}/cart_items?select=*,items(*),carts(*)&cart_id=eq.${user}&order=id.desc`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await responce.json();

  // レスポンスの定義
  if (data.length !== 0) {
    res.status(200).json(data);
  } else {
    res.status(200).json(data);
  }
}
