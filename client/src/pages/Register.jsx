import React, { useContext, useState } from 'react';
import { userContext } from '../../contexts/userContext';
import Upload from '../utils/upload';
import newRequest from '../utils/newRequest';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [file, setFile] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    phone: '',
    desc: '',
  });
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await Upload(file);
    try {
      await newRequest.post('/auth/register', { ...newUser, img: url });
    } catch (error) {
      console.log(error);
    }
    navigate('/');
    setUser(newUser);
  };
  const handleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSeller = (e) => {
    setNewUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  console.log(user);

  return (
    <div className='min-h-[calc(100vh-140px)] px-16 xl:px-64 py-8'>
      <form
        className='container flex flex-col md:flex-row w-full text-gray-500'
        onSubmit={handleSubmit}
      >
        <div className='left w-full md:w-1/2 md:pr-14'>
          <div className='header text-3xl text-gray-500 py-4'>
            Create New Account
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Username</span>
            <input
              className='border-2 border-gray-400 h-10 rounded-sm my-2 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='text'
              name='username'
              placeholder='username'
              onChange={handleChange}
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Email</span>
            <input
              className='border-2 border-gray-400 h-10 rounded-sm my-2 px-3 text-sm focus:border-gray-500 focus:outline-none '
              name='email'
              type='email'
              onChange={handleChange}
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Password</span>
            <input
              className='border-2 border-gray-400 h-10 rounded-sm my-2 px-3 text-sm focus:border-gray-500 focus:outline-none '
              name='password'
              type='password'
              onChange={handleChange}
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Profile pic</span>
            <input
              className='border-2 border-gray-400 h-12 rounded-sm my-2 py-2 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='file'
              name='img'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Country</span>
            <input
              className='border-2 border-gray-400 h-10 rounded-sm my-5 px-3 text-sm focus:border-gray-500 focus:outline-none '
              name='country'
              type='text'
              onChange={handleChange}
            />
          </div>
          <button
            className='bg-indigo-500 hidden md:flex items-center justify-center text-white w-full h-10 rounded-sm'
            type='submit'
          >
            Create
          </button>
        </div>
        <div className='right w-full md:w-1/2 md:pl-14'>
          <div className='header lg:mb-8 text-3xl text-gray-500 py-4'>
            I want to become a seller
          </div>
          <div className='title flex items-center lg:my-5'>
            <span className='text-lg text-gray-500'>
              Activate seller account
            </span>
            <div className='ml-3 flex items-center'>
              <label className='relative inline-flex items-center cursor-pointer border-2 rounded-xl'>
                <input
                  type='checkbox'
                  value=''
                  className='sr-only peer'
                  onChange={handleSeller}
                />
                <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-indigo-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500" />
              </label>
            </div>
          </div>

          <div className='title flex flex-col lg:my-5'>
            <span className='text-lg my-2'>Phone Number</span>
            <input
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='tel'
              name='phone'
              placeholder='+91-xxxx-xxxx-xx'
              onChange={handleChange}
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg lg:my-3'>Description</span>
            <textarea
              className='border-2 border-gray-400 rounded-sm my-4 p-3 text-sm focus:border-gray-500 focus:outline-none '
              placeholder='Brief description to introduce your service to customers'
              name='desc'
              onChange={handleChange}
              id=''
              cols='30'
              rows='10'
            />
          </div>
          <button
            className='bg-indigo-500 md:hidden my-3 text-white w-full h-10 rounded-sm'
            type='submit'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
