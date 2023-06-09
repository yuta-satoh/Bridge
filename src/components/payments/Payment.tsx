import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import * as stripeJs from '@stripe/stripe-js';
import CheckoutForm from '@/components/payments/CheckoutForm';
import pModule from '../../styles/purchase.module.css';

// Stripeライブラリの設定
// loadStripe(Stripeの公開可能キー)
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY}`
);

export default function Payment( {amount, test }: { amount: number; test: () => void } ) {
  const [clientSecret, setClientSecret] = useState<string>('');

  // ページ読み込み完了後にPaymentIntentを作成
  useEffect(() => {
    async function createPaymentIntent() {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
      });
      // 後でdataに型定義
      const data = await res.json();

      if (res.ok) {
        setClientSecret(data.clientSecret);
      }
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
  };

  return (
    <>
      <div className={pModule.paymentArea}>
        <p className={pModule.addressTitle}>決済方法</p>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm test={test}/>
          </Elements>
        )}
      </div>
    </>
  );
}
