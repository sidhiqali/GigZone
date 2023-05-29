import React from 'react';

import star from '../images/star.png';
import Slider from 'react-slick';

import clock from '../images/clock.png';
import recycle from '../images/recycle.png';
import greencheck from '../images/greencheck.png';
import { NextArrow, PrevArrow } from '../components/CardSlider';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import { useParams } from 'react-router-dom';
import Reviews from '../components/reviews';
const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['data._id'],
    queryFn: () => {
      return newRequest(`gigs/single/${id}`).then((res) => res.data);
    },
  });
  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return newRequest(`user/${userId}`).then((res) => res.data);
    },
    enabled: !!userId,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='h-full px-14 xl:px-40 py-8'>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'something went wrong'
      ) : (
        <div className='container flex lg:flex-row flex-col'>
          <div className='left lg:w-8/12 w-full'>
            <div className='top-gig'>
              <div className='category text-gray-600 text-sm py-1'>
                GigZone {'>'} Graphic design
              </div>
              <div className='text-black text-3xl font-bold'>{data?.title}</div>
              {isLoadingUser ? (
                'Loading...'
              ) : errorUser ? (
                'something went wrong'
              ) : (
                <div className='avatar flex py-4 items-center'>
                  <img
                    className='h-7 w-7 rounded-full'
                    src={
                      dataUser.img ||
                      'https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg'
                    }
                    alt='avatar'
                  />
                  <div className='text-sm font-semibold px-2'>
                    {dataUser.username}
                  </div>

                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className='rating flex items-center'>
                      {Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((item, i) => (
                          <img
                            className='h-3 w-3 mr-1'
                            src={star}
                            alt='star'
                            key={i}
                          />
                        ))}
                      <div className='h-5 w-5 text-yellow-400'>
                        {Math.round(data.totalStars / data.starNumber)}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className='slider min-h-[200px] lg:min-h-[400px] px-1 md:px-3 lg:px-6'>
                <Slider
                  className='w-full'
                  {...settings}
                  prevArrow={<PrevArrow />}
                  nextArrow={<NextArrow />}
                >
                  {data?.images.map((image) => (
                    <img
                      key={image}
                      className='px-48 min-h-[200px] lg:min-h-[400px]'
                      src={image}
                      alt='image'
                    />
                  ))}
                </Slider>
              </div>
              <div className='about-gig py-4'>
                <h1 className='text-2xl font-semibold pb-4'>About this Gig</h1>
                <p className='text-gray-700 w-full'>{data?.desc}</p>
              </div>
            </div>
            {isLoadingUser ? (
              'Loading...'
            ) : errorUser ? (
              'something went wrong'
            ) : (
              <div className='about-gig py-4'>
                <div className='text-black text-2xl font-semibold'>
                  About The seller
                </div>
                <div className='about-avatar flex py-3'>
                  <div className='avatar'>
                    <img
                      className='w-20 h-20 rounded-full'
                      src={
                        dataUser.img ||
                        'https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg'
                      }
                      alt='avatar'
                    />
                  </div>
                  <div className='flex flex-col px-3'>
                    <div className='text-black font-semibold'>
                      {dataUser.username}
                    </div>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className='rating flex items-center'>
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img
                              className='h-3 w-3 mr-1'
                              src={star}
                              alt='star'
                              key={i}
                            />
                          ))}
                        <div className='h-5 w-5 text-yellow-400'>
                          {Math.round(data.totalStars / data.starNumber)}
                        </div>
                      </div>
                    )}
                    <button className='border-2 rounded-md mt-1 p-1 border-gray-400 text-sm '>
                      Contact me
                    </button>
                  </div>
                </div>
                <div className='details mt-4 border-2'>
                  <div className='top flex p-2 justify-between'>
                    <div className='left-details pl-8'>
                      <div className='from py-3'>
                        <div className='text-gray-500'>From</div>
                        <div>{dataUser.country}</div>
                      </div>
                      <div className='response'>
                        <div className='text-gray-500'>Avg Response time</div>
                        <div>4 Hour</div>
                      </div>
                      <div className='average py-3'>
                        <div className='text-gray-500'>Language</div>
                        <div>English</div>
                      </div>
                    </div>
                    <div className='right-details pr-8'>
                      <div className='Member py-3'>
                        <div className='text-gray-500'>Member Since</div>
                        <div>{dataUser?.createdAt}</div>
                      </div>
                      <div className='response'>
                        <div className='text-gray-500'>Last delivery</div>
                        <div>1 Day</div>
                      </div>
                    </div>
                  </div>

                  <div className='bottom px-8 py-4'>
                    <hr className='p-2' />
                    <div>{dataUser?.desc}</div>
                  </div>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className='right sticky top-10 lg:w-4/12 border h-full w-full lg:max-h-[360px] p-5'>
            <div className='price flex items-center justify-between'>
              <h1 className=' text-lg font-semibold'>{data.shortTitle}</h1>
              <div className='text-xl '>${data.price}</div>
            </div>
            <div className='text-sm text-gray-500 my-6'>{data.shortDesc}</div>
            <div className='delivery flex items-center justify-between'>
              <div className='left flex items-center'>
                <img className='h-4 w-4 mx-2' src={clock} alt='' />
                <div className='text-gray-500 text-sm'>
                  {data.deliveryTime} day delivery
                </div>
              </div>
              <div className='right flex items-center'>
                <img className='h-4 w-4 mx-2' src={recycle} alt='' />
                <div className='text-gray-500 text-sm'>
                  {data.revision} Revisions
                </div>
              </div>
            </div>
            <div className='specs flex flex-col py-4 '>
              {data.features.map((feature) => (
                <div className='spec flex items-center' key={feature}>
                  <img className='h-4 w-4 mx-2' src={greencheck} alt='' />
                  <span className='text-gray-500'>{feature}</span>
                </div>
              ))}
            </div>
            <button className='rounded-sm h-9 text-white w-full bg-green-500'>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
