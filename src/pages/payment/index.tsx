import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

// Stripeライブラリの設定
// loadStripe(Stripeの公開可能キー)
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY}`);

export default function Payment() {
    const [clientSecret, setClientSecret] = useState<string>("");

    // ページ読み込み完了後にPaymentIntentを作成
    useEffect(() => {
        async function createPaymentIntent() {
            const res = await fetch("/api/stripe.ts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // bodyに商品IDを設定するっぽいので、一先ず適当に書きます
                body: JSON.stringify({ items: [{ id: "hoge" }]}),
            });
            // 後でdataに型定義
            const data = await res.json();
            setClientSecret(data.clientSecret)
        }
        createPaymentIntent();
    });

    // stripeの見た目の設定
    const appearance = {
        theme: 'stripe',
    };
    // stripeのオプション
    const options = {
        clientSecret,
        appearance,
    }

    return (
        <>
            <div className="App">
                
            </div>
        </>
    );
}
