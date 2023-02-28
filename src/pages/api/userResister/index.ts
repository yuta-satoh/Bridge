import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    lastName: string,
    firstName: string,
    gender: string,
    tell: string,
    email: string,
    zipcode: string,
    address: string,
    password: string,
    deleted: boolean,
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw";
  
  await fetch("http://127.0.0.1:8000/users", {
		method: req.method,
		headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
		body: JSON.stringify(req.body)
	})
	.then((res) => res.json())
	.then((data) => {
		res.status(201).json(data)
	})
  .catch((e) => {
    res.status(400).json({message: "エラー"})
  })
}
