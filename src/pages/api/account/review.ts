import type { NextApiRequest, NextApiResponse } from 'next';
import { Reviews } from '@/types/types';

// レスポンス用型エイリアス
type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    const review: Reviews = req.body;

    const spbaseRes = await fetch(`${process.env.SUPABASE_URL}/reviews`, {
        method: 'POST',
        headers: {
            apikey: `${process.env.SUPABASE_API_KEY}`,
            Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });

    if (spbaseRes.ok) {
        res.status(200).json({ message: 'OK' });
    } else {
        res.status(401).json({ message: 'Failed' });
    }
};
