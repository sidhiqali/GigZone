import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const CategoryCard = ({ card }) => {
  
  return (
    <Link to='/gigs'>
      <div className='w-full sm:w-3/4 md:w-10/12 lg:w-3/4 xl:w-10/12 p-2'>
        <div className=' shadow-slate-500 shadow-xl  w-full h-96 bg-gray-800 rounded-md overflow-hidden relative'>
          <LazyLoadImage
            className='w-full h-full object-cover'
            src={card.img}
            alt='card image'
          />
          <div className='p-4'>
            <h2 className='text-xl font-bold text-white absolute top-4 left-4'>
              {card.title}
            </h2>
            <p className='text-slate-200 absolute top-10 left-4'>{card.desc}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
