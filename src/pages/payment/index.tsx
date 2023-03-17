import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import * as stripeJs from '@stripe/stripe-js';
import CheckoutForm from "@/components/CheckoutForm";

// Stripeライブラリの設定
// loadStripe(Stripeの公開可能キー)
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY}`);

export default function Payment() {
    const [clientSecret, setClientSecret] = useState<string>("");

    // ページ読み込み完了後にPaymentIntentを作成
    useEffect(() => {
        async function createPaymentIntent() {
            const res = await fetch("/api/stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // bodyに商品IDを設定するっぽいので、一先ず適当に書きます
                body: JSON.stringify({ items: [{ id: "hoge" }] }),
            });
            // 後でdataに型定義
            const data = await res.json();

            // 以下確認用(要修正)
            console.log('data', data);
            if (res.ok) {
                setClientSecret(data.clientSecret);
                console.log('正常に動作しています');
            } else {
                console.log('エラーが発生しています');
            }
            // ここまで
        }
        createPaymentIntent();
    }, []);
    // console.log('clientSecret', clientSecret);

    // stripeのオプション
    const options: stripeJs.StripeElementsOptions = {
        clientSecret,
        // 見た目の設定
        appearance: {
            theme: 'stripe',
        },
    }

    return (
        <>
            <div className="App">
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
            </div>
        </>
    );
}
