import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import * as stripeJs from '@stripe/stripe-js';
import { SyntheticEvent } from 'react';
import pModule from '../../styles/purchase.module.css';

export default function CheckoutForm({ test }: { test: () => void }) {
  // stripeライブラリへアクセス
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 支払いステータスの表示
  useEffect(() => {
    if (!stripe) return;

    // 支払いステータスを取得
    const clientSecret = new URLSearchParams(
      window.location.search
    ).get('payment_intent_client_secret');
    if (!clientSecret) return;

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            break;
          case 'processing':
            setMessage('支払い処理中です');
            break;
          case 'requires_payment_method':
            setMessage(
              '支払い処理に失敗しました。お手数ですがもう一度お試しください'
            );
            break;
          default:
            setMessage('エラーが発生しました');
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (!error) {
      // カート内のアイテムを削除し、購入履歴に情報を追加する関数test
      test();
      return;
    } else {
      setMessage('エラーが発生しました');
    }

    // カートアイテムを削除して購入履歴にデータを追加する関数
    setIsLoading(false);
  };

  const paymentElementOptions: stripeJs.StripePaymentElementOptions =
    {
      layout: 'tabs',
    };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
        />
        <button
          type="submit"
          className={pModule.buttonStyle}
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              '購入する'
            )}
          </span>
        </button>
        {/* ステータスメッセージを表示 */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
