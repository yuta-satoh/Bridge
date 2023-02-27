import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24ifQ.unajLs5sq8vLSVQrpK3_Ei8zHpSTXXEmcPMkPH36UG8';

  const response = await fetch('http://127.0.0.1:8000/items')
    .then((res) => res.json())
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ message: 'エラー' });
    });
}
