import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handler, sessionOptions);

type Data = {
  message: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // レスポンスのボディの受け取り
  const email: string = req.body;
  // 以下、JSONデータの受け取り
  const responce = await fetch(
    `${process.env.SUPABASE_URL}/users?email=eq.${email}`,
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
  const mail: string = userData[0].email.toString();
  //   req.session.user = { user: id };
  console.log(mail)

  // レスポンスの定義
  if (responce.ok) {
    req.session.email = { email: mail };
    await req.session.save();
    res.status(200)
    .json(mail);
      //   .setHeader('Set-Cookie', `id=${id};path=/`)
  } else {
    res.status(401).json({ message: 'Failed' });
  }
}
