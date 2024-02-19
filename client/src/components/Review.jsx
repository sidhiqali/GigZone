import React from 'react';
import { like, dislike, starImg } from '../images';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import Loader from './Loader';
function Review({ review }) {

  //fetch user depending on review
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () => {
      return newRequest(`user/${review.userId}`).then((res) => res.data);
    },
  });

  return (
    <div className='review-gig py-6'>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <Loader />
        </div>
      ) : error ? (
        'something went wrong'
      ) : (
        <div className=' review-body-section flex flex-col my-4'>
          <div className='about-avatar flex'>
            <div className='avatar'>
              <img className='w-10 h-10 rounded-full' src={data?.img} alt='' />
            </div>
            <div className='flex flex-col'>
              <div className='text-black text-sm font-semibold mx-2'>
                {data?.username}
              </div>
              <div className='country flex'>
                <div className='text-gray-500 text-sm'>{data.country}</div>
              </div>
            </div>
          </div>
          <div className='rating flex items-center py-2'>
            {Array(review.star)
              .fill()
              .map((st, i) => (
                <img key={i} className='h-3 w-3 mr-1' src={starImg} alt='' />
              ))}
            <div className='h-5 w-5 text-yellow-400'>{review.star}</div>
          </div>
          <div className='text-gray-500'>{review.desc}</div>
          <div className='help flex items-center'>
            <div className='font-semibold'>Helpful?</div>
            <img className='h-4 w-4 mx-3' src={like} alt='like' />
            <div className='font-semibold'>Yes</div>
            <img className='h-4 w-4 mx-3' src={dislike} alt='like' />
            <div className='font-semibold'>No</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
