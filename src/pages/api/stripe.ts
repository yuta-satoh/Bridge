import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

// グローバルAPI認証キーの設定
// new Stripe('api_key', 'stripe_version etc...')
const stripe = new Stripe(`${process.env.STRIPE_TEST_API_KEY}`, { apiVersion: '2022-11-15'});


export async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    // 一旦決済機能だけ先に実装

};
