import {
  PaymentElement,
  LinkAuthenticationElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import * as stripeJs from '@stripe/stripe-js';
import { SyntheticEvent } from 'react';

export default function CheckoutForm() {
  // stripeライブラリへアクセス
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState<string>('');
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
            setMessage('支払いが完了しました');
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
            setMessage('予期せぬエラーが発生しました');
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: SyntheticEvent) => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '/purchaseComp',
      },
    });

    if (
      error.type === 'card_error' ||
      error.type === 'validation_error'
    ) {
      setMessage(`${error.message}`);
    } else {
      setMessage('予期せぬエラーが発生しました');
    }

    setIsLoading(false);
  };

  const paymentElementOptions: stripeJs.StripePaymentElementOptions =
    {
      layout: 'tabs',
    };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.value.email)}
        />
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
        />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* ステータスメッセージを表示 */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
