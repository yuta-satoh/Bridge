import { resData } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resData>
) {
    const email = req.query.email

    const userRes = await fetch(`${process.env.SUPABASE_URL}/users?select=id&email=eq.${email}`, {
        method: "GET",
        headers: {
            "apikey": `${process.env.SUPABASE_API_KEY}`,
            "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
        },
    });
    const uid: { id: number }[] = await userRes.json();

    if(uid.length !== 0) {
        const cartRes = await fetch(`${process.env.SUPABASE_URL}/carts`, {
            method: req.method,
            headers: {
                "apikey": `${process.env.SUPABASE_API_KEY}`,
                "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
                "Content-Type": "application/json",
            },
                body: JSON.stringify({ user_id: uid[0].id })
            })
    
        if (cartRes.ok) {
            res.status(200).json({message: "OK"});
        } else {
            res.status(cartRes.status).json({message: "Creating cart data was wrong."});
        }
    } else {
        res.status(userRes.status).json({message: "User Data was nothing."});
    }
}
