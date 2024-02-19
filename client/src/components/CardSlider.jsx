import React from 'react';
import Slider from 'react-slick';
import { Settings } from '../constants/settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export const PrevArrow = ({ onClick }) => (
  <button
    className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-slate-600 shadow-xl focus:outline-none w-[50px] h-[50px]  rounded-full flex items-center justify-center'
    onClick={onClick}>
    <ChevronLeftIcon className='w-6 h-6 text-slate-400' />
  </button>
);

export const NextArrow = ({ onClick }) => (
  <button
    className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 focus:outline-none w-[50px] h-[50px] bg-white shadow-slate-600 shadow-xl rounded-full flex items-center justify-center md:mr-14'
    onClick={onClick}>
    <ChevronRightIcon className='w-6 h-6 text-slate-400' />
  </button>
);

const CardSlider = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center pb-10 md:pl-10'>
      <h1 className='text-gray-400 font-medium text-3xl py-10'>
        Popular services
      </h1>
      <div className='w-full px-4 sm:px-6 md:px-8 lg:px-12'>
        <Slider
          {...Settings}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}>
          {children}
        </Slider>
      </div>
    </div>
  );
};
export default CardSlider;
