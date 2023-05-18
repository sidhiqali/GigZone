import React from 'react';
import { gigs } from '../constants/data';
import heart from '../images/heart.png';
import star from '../images/star.png';
import {Link} from 'react-router-dom'
const GigCard = () => {
  return (
    <Link to='/gig/123'>
    <div className=' grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2 cursor-pointer'>
      {gigs.map((gig, index) => (
        <div
          className='hover:shadow-md hover:shadow-slate-400 container flex flex-col w-full sm:w-3/4 md:w-10/12 lg:w-3/4 xl:w-[280px]'
          key={index}
        >
          <div className='top w-full '>
            <img className=' w-full h-40 rounded-sm' src={gig.img} alt='' />
          </div>
          <div className='bottom w-full border'>
            <div className='name-section font-semibold text-sm flex items-center p-3'>
              <img className='w-7 h-7 rounded-full mr-2' src={gig.pp} alt='' />
              <div className='name'>{gig.username}</div>
            </div>
            <div className='desc text-sm px-3'>{gig.desc}</div>
            <div className='rating flex w-3 h-3 m-2 items-center '>
              <img className='mr-2 ' src={star} alt='' />
              <div>{gig.star}</div>
            </div>
            <div className='last-section flex justify-between items-center  border'>
              <div className='heart m-3'>
                <img className='w-3 h-4 ' src={heart} alt='' />
              </div>
              <div className='price flex flex-col items-center m-2 '>
                <span className='text-gray-500 text-sm'>Starting At</span>
                <span>{`$ ${gig.price}`}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Link>
  );
};

export default GigCard;
