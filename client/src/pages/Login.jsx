import React, { useContext, useState } from 'react';
import newRequest from '../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../contexts/userContext';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { user, setUser } = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await newRequest.post('auth/login', {
        username,
        password,
      });
      if (result) {
        setUser(result.data);
        console.log(result.data);
        navigate('/');
      } else {
        // Handle case where result is undefined or doesn't have the expected data
        setError('Invalid response');
        alert('Invalid response');
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data || 'An error occurred');
      alert(error.response?.data || 'An error occurred');
    }
  };

  return (
    <div className='flex min-h-[calc(100vh-140px)]  flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className=' text-center text-2xl font-bold leading-9 tracking-tight text-blue-900'>
          GigZone
        </div>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          className='space-y-6'
          action='#'
          method='POST'
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor='username'
              className='block  font-medium leading-6 text-gray-500'
            >
              Username
            </label>
            <div className='mt-1'>
              <input
                className='block w-full border-2 border-gray-400 h-12 rounded-sm  px-3 text-sm focus:border-blue-500 focus:outline-none '
                type='text'
                required
                name='username'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block font-medium leading-6 text-gray-500'
              >
                Password
              </label>
            </div>
            <div className='mt-1'>
              <input
                id='password'
                name='password'
                type='password'
                required
                onChange={(e) => setPassword(e.target.value)}
                className='block w-full border-2 border-gray-400 h-12 rounded-sm  px-3 text-sm focus:border-blue-500 focus:outline-none'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center items-center h-12 rounded-md bg-indigo-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Login
            </button>
          </div>
        </form>

        <div className=' mt-5 text-sm'>
          <a
            href='#'
            className='font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
