import React, { useEffect, useRef, useState } from 'react';
import { down } from '../images';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader, GigCard } from '../components';
import qs from 'qs';

const Gigs = () => {
  const [active, setActive] = useState(false);
  const [sort, setSort] = useState('sales');
  const [categoryName, setCategoryName] = useState('All Gigs');
  const minRef = useRef();
  const maxRef = useRef();
  const navigate = useNavigate();
  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigData'],
    queryFn: () => {
      const searchParams = new URLSearchParams(search);
      const category = searchParams.get('category');
      setCategoryName(category);
      const searchGig = searchParams.get('searchGig');
      const queryParams = qs.stringify({
        searchGig,
        category,
        min: minRef.current.value || '',
        max: maxRef.current.value || '',
        sort: sort,
      });

      return newRequest(`/gigs?${queryParams}`).then((res) => res.data);
    },
  });
  console.log(data);
  console.log(categoryName);
  const handlePrice = (e) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const reSort = (type) => {
    setSort(type);
    setActive(false);
  };
  return (
    <div className='min-h-[calc(100vh-140px)] h-full px-14 xl:px-40 py-8'>
      <div className='container py-3'>
        <div className='category text-gray-600 text-sm py-1'>
          GigZone {'>'} {categoryName === null ? 'All Gigs' : categoryName}
        </div>
        <div className='text-black text-3xl font-semibold'>
          Discover Your Ideal Solutions
        </div>
        <div className='text-gray-600 text-sm py-1'>
          Explore the boundaries of art and technology with GigZone's artists
        </div>
        <div className='budget flex flex-col md:flex-row justify-between md:items-center py-2'>
          <form
            onSubmit={handlePrice}
            className='budget-input flex items-center relative'
          >
            <div className='text-gray-600 '>Budget</div>
            <input
              className='text-gray-600 ml-2 border-gray-300 border-2 px-1 w-20 md:w-36 h-7 rounded-md focus:outline-none focus:border-gray-400'
              type='number'
              placeholder='min'
              ref={minRef}
            />
            <input
              className='text-gray-600 ml-3 border-gray-300 border-2 h-7 px-1 w-20 md:w-36 rounded-md focus:outline-none focus:border-gray-400'
              type='number'
              placeholder='max'
              ref={maxRef}
            />
            <button className=' ml-2 bg-green-500 text-white text-sm p-1 rounded-md w-16 h-7'>
              Apply
            </button>
          </form>
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

      {isLoading ? (
        <div className='flex justify-center items-center'>
          <Loader />
        </div>
      ) : error ? (
        'something went wrong'
      ) : data.length === 0 ? (
        <section className='flex items-center grid-cols-1 h-full sm:p-16 text-gray-600'>
          <div className='container flex flex-col items-center justify-center px-5 mx-auto my-3 space-y-8 text-center sm:max-w-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              className='w-40 h-40 dark:text-gray-600'
            >
              <path
                fill='currentColor'
                d='M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z'
              ></path>
              <rect
                width='176'
                height='32'
                x='168'
                y='320'
                fill='currentColor'
              ></rect>
              <polygon
                fill='currentColor'
                points='210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042'
              ></polygon>
              <polygon
                fill='currentColor'
                points='383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63'
              ></polygon>
            </svg>
            <p className='text-3xl'>No gigs available for this Category</p>
            <a
              rel='noopener noreferrer'
              href=''
              className='px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900'
              onClick={(e) => navigate('/gigs')}
            >
              Show all gigs
            </a>
          </div>
        </section>
      ) : (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2'>
          {data.map((gig, index) => (
            <GigCard key={index} gig={gig} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gigs;
