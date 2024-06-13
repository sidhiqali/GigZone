import React, { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bg.jpg';

const Feature = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const handleSearch = () => {
    if (input) {
      navigate(`/gigs?searchGig=${input}`);
    }
  };
  
  const handleFeature = () => {
    navigate('/gigs');
  };

  return (
    <div className='Feature-section py-14 md:py-36 flex  '>
      <div
        className='absolute inset-0 z-0 md:bg-no-repeat md:bg-center bg-cover max-h-[610px] md:max-h-[730px] '
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className='relative flex flex-col justify-center w-full '>
        <h1 className='text-white font-bold text-6xl sm:mx-5 mx-5 lg:mx-48 max-w-lg md:max-w-xl p-5'>
          Find the best freelance service for you
        </h1>
        <div className='mx-5 sm:mx-10 lg:mx-48 max-w-2xl flex p-5'>
          <input
            placeholder='Search for any service...'
            type='text'
            className='w-96 md:w-[450px] h-12 rounded-l-md rounded-r-none  border-indigo-700 p-4'
            onChange={(e) => setInput(e.target.value)}
          />
          <MdSearch
            className='cursor-pointer w-14 md:w-[75px] h-12 rounded-r-md  bg-indigo-700 text-white p-2'
            onClick={handleSearch}
          />
        </div>
        <div className='popular hidden text-sm md:flex sm:mx-10 mx-5 lg:mx-48 max-w-lg md:max-w-lg justify-between p-5 text-white items-center'>
          <span className='text-lg'>Popular:</span>
          <button
            onClick={handleFeature}
            className='border-2 rounded-2xl w-24 h-7 hover:bg-indigo-700'
          >
            Animation
          </button>
          <button
            onClick={handleFeature}
            className='border-2 rounded-2xl w-24 h-7 hover:bg-indigo-700'
          >
            Web design
          </button>
          <button
            onClick={handleFeature}
            className='border-2 rounded-2xl w-24 h-7 hover:bg-indigo-700'
          >
            Logo Design
          </button>
          <button
            onClick={handleFeature}
            className='border-2 rounded-2xl w-24 h-7 hover:bg-indigo-700'
          >
            AI services
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
