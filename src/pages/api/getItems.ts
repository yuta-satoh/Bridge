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
	const queryParams = req.query.id as string
	const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const responseItems = await fetch(
    `http://127.0.0.1:8000/items?${queryParams}`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const guestItems: ItemData[] = await responseItems.json();

	if (responseItems.ok) {
    res.status(200).json(guestItems);
  } else {
    res.status(401).end();
  }
}
