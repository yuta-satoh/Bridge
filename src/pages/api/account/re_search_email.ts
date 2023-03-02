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
    delete: boolean,
  }

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw";

const searchUser = async (params: {
  cookie: string;
  email: string,
}) => {
  const searchEmailResult = await fetch(`http://127.0.0.1:8000/users?id=neq.${params.cookie}&email=eq.${params.email}`, {
    method: "GET",
    headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
    },
	}).then((res) => res.json()).then((data) => {
    if (data.length !== 0) {
      return "このメールアドレスはすでに使用されています"
    } 
    return ""
  })

  return {
    email: searchEmailResult,
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, cookie } = req.body;
  const searchResult = await searchUser({email, cookie})
  res.status(200).json(searchResult)
} 
