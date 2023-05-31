import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import newRequest from '../utils/newRequest';
import { useParams } from 'react-router-dom';
const stripePromise = loadStripe(
  'pk_test_51NDiQvSCoFaydAZLM3frG9nJsETk8cuLf6ahVImSzDDSOG2QY9IceUUKcJthifOHAIZ7xyunf2sLtVX5JrB4blyi00R0S0aV5s'
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(`order/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className='App'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default Pay;
