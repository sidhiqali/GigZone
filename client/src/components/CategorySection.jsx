import React, { useState } from 'react';
import { Categories } from '../constants/data';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CategorySection = () => {
  const navigate = useNavigate();
  const handleNavigation = (title) => {
    navigate(`/gigs?category=${title}`);
  }; 
  
  return (
    <div className='flex items-center justify-center py-8 bg-slate-100'>
      <div className='container p-5 '>
        <div className='heading flex items-center justify-center'>
          <h1 className='text-gray-400 font-medium text-3xl py-10'>
            Categories
          </h1>
        </div>
        <div className='cursor-pointer grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {Categories.map((category) => (
            <div
              onClick={() => handleNavigation(category.title)}
              key={category.id}
              className='flex flex-col p-9 items-center justify-center'
            >
              <LazyLoadImage className='w-12 h-12' src={category.img} alt='icon' />
              <hr className='font-bold' />
              <div>{category.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
