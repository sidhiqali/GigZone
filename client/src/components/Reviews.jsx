import React from 'react';
import Review from './review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import Loader from './Loader';

function Reviews({ gigId }) {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['Reviews'],
    queryFn: () => {
      return newRequest(`review/${gigId}`).then((res) => res.data);
    },
  });
 
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post('/review', review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Reviews'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  console.log(data);
  return (
    <div>
      <div className='text-black text-2xl font-semibold py-3'>Reviews</div>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <Loader />
        </div>
      ) : error ? (
        'something went wrong'
      ) : (
        data.map((review) => <Review review={review} key={review.userId} />)
      )}
      <form className='pr-10' onSubmit={handleSubmit}>
        <textarea
          className='border-2 w-full border-gray-400 rounded-sm my-4 p-3 text-sm focus:border-gray-500 focus:outline-none '
          placeholder='Post your review here'
          name='review'
          id=''
          cols='30'
          rows='3'
        />
        <div className='title flex items-center '>
          <span className='text-lg text-gray-500 '>Rating</span>
          <select
            className='border-2 border-gray-400 h-8 rounded-sm my-2 mx-2 px-3 text-sm focus:border-gray-500 focus:outline-none '
            name='star'
          >
            <option className='text-gray-500'>1</option>
            <option className='text-gray-500'>2</option>
            <option className='text-gray-500'>3</option>
            <option className='text-gray-500'>4</option>
            <option className='text-gray-500'>5</option>
          </select>
          <button className='bg-green-700 my-3 text-white w-2/12 h-8 rounded-sm'>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reviews;
