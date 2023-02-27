import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password }: { email: string; password: string } =
    req.body;
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const responce = await fetch(
    `/api/users?email=${email}&password=${password}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
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
  const id: number = userData[0].id;
  if (responce.ok) {
    res
      .status(200)
      .setHeader('Set-Cookie', `id=${id};path=/`)
      .json({ message: 'OK' });
  } else {
    res.status(401).json({ message: 'Failed' });
  }
}
