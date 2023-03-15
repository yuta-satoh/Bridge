import type { NextApiRequest, NextApiResponse } from 'next';

type ItemData = {
	id: number,
	name: string,
	description: string,
	genre: string,
	category: string,
	price: number,
	imgurl: string,
	stock: number,
	delete: boolean,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemData[]>
) {
	const queryId = req.query.id as string;
  const queryGenre = typeof req.query.genre === 'string' ? `genre=eq.${req.query.genre}` : ""
	// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const responseItems = await fetch(
    `${process.env.SUPABASE_URL}/items?${queryGenre}&${queryId}`,
    {
      method: 'GET',
      headers: {
        "apikey": `${process.env.SUPABASE_API_KEY}`,
        "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const guestItems: ItemData[] = await responseItems.json();

	if (responseItems.ok) {
    res.status(200).json(guestItems);
  } else {
    res.status(400).end();
  }
}
