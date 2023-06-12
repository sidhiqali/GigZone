import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Loader from '../components/Loader';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://gigzone.netlify.app/success',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form
      className='flex flex-col min-h-[calc(100vh-140px)] px-14 xl:px-96 py-24'
      id='payment-form'
      onSubmit={handleSubmit}
    >
      <LinkAuthenticationElement
        id='link-authentication-element'
        onChange={(e) => setEmail(e.target.value)}
        className='text-gray-500'
      />
      <PaymentElement
        id='payment-element'
        options={paymentElementOptions}
        className='text-gray-500 py-10'
      />
      <button
        className='rounded-sm h-9 text-white w-full bg-green-500 py-6 flex items-center justify-center'
        disabled={isLoading || !stripe || !elements}
        id='submit'
      >
        <span id='button-text'>
          {isLoading ? (
            <div className='flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
}
