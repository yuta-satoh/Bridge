import type { NextApiRequest, NextApiResponse } from 'next';

// 商品データ取得
type Data = {
  message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  // const TOKEN =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24ifQ.unajLs5sq8vLSVQrpK3_Ei8zHpSTXXEmcPMkPH36UG8';

    const order = req.query.order;
    
    const response = await fetch(`${process.env.SUPABASE_URL}/items?order=${order}`, {
        method: "GET",
        headers: {
            "apikey": `${process.env.SUPABASE_API_KEY}`,
            "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
        }
    })
    const data = await response.json();

    if (response.ok) {
        res.status(200).json(data);
    } else {
        res.status(response.status).json({ message: 'エラー' });
    }
}
