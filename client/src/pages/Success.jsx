import React from 'react';
import newRequest from '../utils/newRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Success = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');
  const navigate = useNavigate();

  //navigate to order section and update payment completed true
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.put('/order', { payment_intent });
      navigate('/order');
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };
  return (
    <div className='bg-gray-100 h-screen min-h-[calc(100vh-140px)]'>
      <div className='bg-white p-6  md:mx-auto'>
        <svg
          viewBox='0 0 24 24'
          className='text-green-600 w-16 h-16 mx-auto my-6'
        >
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
            Payment Done!
          </h3>
          <p className='text-gray-600 my-2'>
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className='py-10 text-center' onClick={handleSubmit}>
            <a
              href='#'
              className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'
            >
              See Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
