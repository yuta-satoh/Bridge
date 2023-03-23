import type { NextApiRequest, NextApiResponse } from 'next';
import searchUser from '@/lib/searchUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const searchResult = await searchUser(email, password);
  res.status(200).json(searchResult);
}
