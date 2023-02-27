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
  // postgRESTのAPIと通信するためのTOKENを設定
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  // 以下、JSONデータの受け取り
  const responce = await fetch(
    `http://127.0.0.1:8000/users?email=eq.${email}&password=eq.${password}`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
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
