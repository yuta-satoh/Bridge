// 使わなくなったのでテストなし
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // レスポンスのボディの受け取り
  const { email, password }: { email: string; password: string } = req.body;
  // 以下、JSONデータの受け取り
  const responce = await fetch(
    `${process.env.SUPABASE_URL}/users?email=eq.${email}&password=eq.${password}`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
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
  const id: number = userData[0].id;

  // レスポンスの定義
  if (responce.ok) {
    res
      .status(200)
      .setHeader('Set-Cookie', `id=${id};path=/`)
      .json({ message: 'OK' });
  } else {
    res.status(401).json({ message: 'Failed' });
  }
}
