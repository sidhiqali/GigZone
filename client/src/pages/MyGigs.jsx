import React, { useContext } from 'react';
import deleteIcon from '../images/delete.png';
import { Link } from 'react-router-dom';
import { userContext } from '../../contexts/userContext';
import newRequest from '../utils/newRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const MyGigs = () => {
  const user = useContext(userContext);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: [user._id],
    queryFn: () => {
      return newRequest(`gigs?=userId=${user._id}`).then((res) => res.data);
    },
  });
  console.log(data);
  console.log(user);
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [user._id] });
    },
  });
  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='container w-full '>
        <div className='head flex justify-between py-3'>
          <div className='text-2xl font-semibold'>Gigs</div>
          <Link to='/add'>
            <button className='text-xs h-8 text-white border bg-green-600 px-2 rounded-md '>
              Add new Gig
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : error ? (
          'something went wrong'
        ) : (
          data.map((gig) => (
            <div
              key={gig?._id}
              className='relative overflow-x-auto shadow-md sm:rounded-lg'
            >
              <table className='bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className=' bg-white text-xs text-black uppercase'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Image
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Title
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Price
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Sales
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='bg-white text-black border-b py-3'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-black whitespace-nowrap'
                    >
                      <img className='h-8 w-12' src={gig?.cover} alt='' />
                    </th>
                    <td className='px-6 py-4'>{gig?.title}</td>
                    <td className='px-6 py-4'>{gig?.price}</td>
                    <td className='px-6 py-4'>{gig?.sales}</td>
                    <td className='px-6 py-4'>
                      <img
                        onClick={() => handleDelete(gig._id)}
                        className='w-6 h-6 cursor-pointer'
                        src={deleteIcon}
                        alt=''
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyGigs;
