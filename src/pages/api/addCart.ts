import type { NextApiRequest, NextApiResponse } from 'next';

type ReqBody = {
  item_id: number;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: ReqBody = req.body;

  // テスト時にres.ok=falseの場合にエラーが発生したので、
  // 下記のコードはコメントアウトして新しいコードに書き換えました。
  // item_idが被っているかどうかで処理を変える
  // const cartItems: ReqBody[] = await fetch(
  // 	`${process.env.SUPABASE_URL}/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`, {
  // 		method: "GET",
  // 		headers: {
  // 			"apikey": `${process.env.SUPABASE_API_KEY}`,
  // 			"Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
  // 			"Content-Type": "application/json",
  //   		},
  // 	}
  // ).then((res) => res.json())

  const item_id_res = await fetch(
    `${process.env.SUPABASE_URL}/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!item_id_res.ok) {
    // 被っていないパターン
    const response = await fetch(
      `${process.env.SUPABASE_URL}/cart_items`,
      {
        method: req.method,
        headers: {
          apikey: `${process.env.SUPABASE_API_KEY}`,
          Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );

    if (response.ok) {
      res
        .status(200)
        .json({ message: 'Adding new item in cart was successed.' });
    } else {
      res
        .status(401)
        .json({ message: 'Adding new item in cart was failed.' });
    }
  } else {
    // 被っているパターン
    const response = await fetch(
      `${process.env.SUPABASE_URL}/cart_items?cart_id=eq.${body.cart_id}&item_id=eq.${body.item_id}`,
      {
        method: 'PATCH',
        headers: {
          apikey: `${process.env.SUPABASE_API_KEY}`,
          Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: body.quantity,
          delete: false,
        }),
      }
    );

    if (response.ok) {
      res.status(200).json({
        message: 'Increasing quantity of item in cart was succesed.',
      });
    } else {
      res.status(401).json({
        message: 'Increasing quantity of item in cart was failed.',
      });
    }
  }
}
