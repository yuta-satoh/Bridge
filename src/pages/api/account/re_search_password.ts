import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  lastName: string;
  firstName: string;
  gender: string;
  tell: string;
  email: string;
  zipcode: string;
  address: string;
  password: string;
  delete: boolean;
};

const searchUser = async (params: {
  cookie: string;
  password: string;
}) => {
  const searchPasswordResult = await fetch(
    `${process.env.SUPABASE_URL}/users?id=neq.${params.cookie}&password=eq.${params.password}`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length !== 0) {
        return 'このパスワードはすでに使用されています';
      }
      return '';
    });
  return {
    password: searchPasswordResult,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, cookie } = req.body;
  const searchResult = await searchUser({ password, cookie });
  res.status(200).json(searchResult);
}
