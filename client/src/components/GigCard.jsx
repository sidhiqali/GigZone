import React from 'react';
import { heart, starImg } from '../images';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import { Loader } from '../components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const GigCard = ({ gig }) => {

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [gig._id],
    queryFn: () => {
      return newRequest(`/user/${gig.userId}`).then((res) => res.data);
    },
  });

  return (
    <Link to={`/gig/${gig._id}`} key={gig._id}>
      <div className='hover:shadow-md hover:shadow-slate-400 cursor-pointer container flex flex-col w-full sm:w-3/4 md:w-10/12 lg:w-3/4 xl:w-[280px]'>
        <div className='top w-full '>
          <LazyLoadImage
            className='w-full h-40 rounded-sm'
            src={gig.cover}
            alt=''
          />
        </div>
        <div className='bottom w-full border'>
          {isLoading ? (
            <div className='flex justify-center items-center'>
              <Loader />
            </div>
          ) : error ? (
            'something went wrong'
          ) : (
            <div className='name-section font-semibold text-sm flex items-center p-3'>
              <img
                className='w-7 h-7 rounded-full mr-2'
                src={
                  data.img ||
                  'https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg'
                }
                alt=''
              />
              <div className='name'>{data.username}</div>
            </div>
          )}
          <div className='desc text-sm px-3'>{gig.desc.substring(0, 100)}</div>
          <div className='rating flex w-3 h-3 m-2 items-center '>
            <img className='mr-2 ' src={starImg} alt='' />
            <div>
              {!isNaN(gig.totalStars / gig.starNumber) &&
                Math.round(gig.totalStars / gig.starNumber)}
            </div>
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
    </Link>
  );
};
 
export default GigCard;
