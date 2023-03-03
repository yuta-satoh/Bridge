import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
    const response = await fetch(`http://127.0.0.1:8000/items?order=id.desc&limit=9`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
        }
    })
    
    const data = await response.json()
	if (response.ok) {
		res.status(201).json(data);
	} else {
		res.status(401).end();
	}
}
