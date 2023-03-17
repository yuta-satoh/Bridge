import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

// グローバルAPI認証キーの設定
// new Stripe('api_key', 'stripe_version etc...')
const stripe = new Stripe(`${process.env.STRIPE_TEST_SECRET_KEY}`, { apiVersion: '2022-11-15'});

const calculateItemsAmount = (items: any) => {
    // 仮の金額をリターンしてます(要修正)
    return 1000;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const { items } = req.body;

    // 一旦決済機能だけ先に実装
    const paymentIntent = await stripe.paymentIntents.create({
        // 金額は後で実装
        amount: calculateItemsAmount(items),
        currency: "jpy",
        automatic_payment_methods: {
            enabled: true,
        }
    })

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};
