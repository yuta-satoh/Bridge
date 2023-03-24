import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'js-cookie';

export default withIronSessionApiRoute(loginIron, sessionOptions);

async function loginIron(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: { email: string; password: string } =
    req.body;
  // 以下、JSONデータの受け取り
  const responce = await fetch(
    `${process.env.SUPABASE_URL}/users?email=eq.${email}&password=eq.${password}`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const userData: {
    id: number;
    lastName: string;
    firstName: string;
    gender: 'male' | 'female' | 'other';
    tell: string;
    email: string;
    zipcode: string;
    address: string;
    password: string;
    delete: Boolean;
  }[] = await responce.json();
  // ここまで

  // user_idのみ抽出
  const id: string = userData[0].id.toString();
  //   req.session.user = { user: id };

  // レスポンスの定義
  if (responce.ok) {
    req.session.status = { status: 'true' };
    req.session.user = { user: id };
    await req.session.save();
    res
      .status(200)
      //   .setHeader('Set-Cookie', `id=${id};path=/`)
      .json(id);
  } else {
    res.status(401).json({ message: 'Failed' });
  }
}
