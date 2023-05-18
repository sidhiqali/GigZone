import React, { useState } from 'react';
import GigCard from '../components/GigCard';
import down from '../images/down.png';
const Gigs = () => {
  const [active, setActive] = useState(false);
  const [sort, setSort] = useState('sales');
  const reSort = (type) => {
    setSort(type);
    setActive(false);
  };
  return (
    <div className='h-full px-14 xl:px-40 py-8'>
      <div className='container py-3'>
        <div className='category text-gray-600 text-sm py-1'>
          Graphic design{' '}
        </div>
        <div className='text-black text-3xl font-semibold'>AI Artists</div>
        <div className='text-gray-600 text-sm py-1'>
          Explore the boundaries of art and technology with GigZone's artists
        </div>
        <div className='budget flex flex-col md:flex-row justify-between md:items-center py-2'>
          <div className='budget-input flex items-center relative'>
            <div className='text-gray-600 '>Budget</div>
            <input
              className='text-gray-600 ml-2 border-gray-300 border-2 px-1 w-20 md:w-36 h-7 rounded-md focus:outline-none focus:border-gray-400'
              type='text'
              placeholder='min'
            />
            <input
              className='text-gray-600 ml-3 border-gray-300 border-2 h-7 px-1 w-20 md:w-36 rounded-md focus:outline-none focus:border-gray-400'
              type='text'
              placeholder='max'
            />
            <button className=' ml-2 bg-green-500 text-white text-sm p-1 rounded-md w-16 h-7'>
              Apply
            </button>
          </div>
          <div className='sort flex flex-col relative mt-4'>
            <div className='budget-sort flex '>
              <div className='text-gray-600 '>Sort by</div>
              <div className='ml-2  font-semibold'>
                {sort === 'createdAt' ? 'Newest' : 'Best Selling'}
              </div>
              <img
                className='h-5 w-5 ml-2 cursor-pointer'
                onClick={() => {
                  setActive(!active);
                }}
                src={down}
                alt='down'
              />
            </div>
            {active ? (
              <div className='item-sort absolute md:right-0 p-2 left-32 top-7 rounded-sm bg-slate-200 min-h-[50px] min-w-[100px] flex flex-col items-center justify-center'>
                {sort === 'createdAt' ? (
                  <div
                    onClick={() => reSort('sales')}
                    className='cursor-pointer'
                  >
                    Best Selling
                  </div>
                ) : (
                  <div
                    onClick={() => reSort('createdAt')}
                    className='cursor-pointer'
                  >
                    Newest
                  </div>
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <GigCard />
    </div>
  );
};

export default Gigs;
