import React, { useContext, useState } from 'react';
import deleteIcon from '../images/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/userContext';
import newRequest from '../utils/newRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { toastify } from '../utils/toastify';
import edit from '../images/edit.png';
const MyGigs = () => {
  const { search } = useLocation();
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['gigData'],
    queryFn: () => {
      const queryParams = new URLSearchParams(search);
      const userID = user?._id; // Check if user._id is defined
      if (!userID) {
        // Handle the case where user._id is not defined
        return Promise.reject(new Error('User ID is missing'));
      }
      queryParams.set('userId', userID);
      const queryString = queryParams.toString();
      return newRequest(`/gigs?${queryString}`).then((res) => res.data);
    },
  });

  console.log(data);
  console.log(user);
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigData'] });
    },
  });
  const handleDelete = (id) => {
    mutation.mutate(id);
    toast.success('successfully deleted', { ...toastify });
  };
  const handleUpdate = (id) => {
    navigate(`/edit/${id}`, { state: { isUpdate: true } });
  };
  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='container w-full'>
        <div className='head flex justify-between py-3'>
          <div className='text-2xl font-semibold'>Gigs</div>
          <Link to='/add'>
            <button className='text-xs h-8 text-white border bg-green-600 px-2 rounded-md'>
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
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='bg-white text-xs text-black uppercase'>
                <tr>
                  <th scope='col' className='w-1/6 px-6 py-3'>
                    Image
                  </th>
                  <th scope='col' className='w-2/6 px-6 py-3'>
                    Title
                  </th>
                  <th scope='col' className='w-1/6 px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='w-1/6 px-6 py-3'>
                    Sales
                  </th>
                  <th scope='col' className='w-1/6 pl-6 py-3'>
                    delete
                  </th>
                  <th scope='col' className='w-1/6 pr-6 py-3'>
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((gig) => (
                  <tr
                    className='bg-white text-black border-b py-3'
                    key={gig?._id}
                  >
                    <td className='px-6 py-4'>
                      <img className='h-8 w-12' src={gig?.cover} alt='' />
                    </td>
                    <td className='px-6 py-4'>{gig?.title}</td>
                    <td className='px-6 py-4'>{gig?.price}</td>
                    <td className='px-6 py-4'>{gig?.sales}</td>
                    <td className='pl-6 py-4'>
                      <img
                        onClick={() => handleDelete(gig._id)}
                        className='w-6 h-6 cursor-pointer'
                        src={deleteIcon}
                        alt=''
                      />
                    </td>
                    <td className='pr-6 py-4'>
                      <img
                        className='w-6 h-6 cursor-pointer'
                        src={edit}
                        alt=''
                        onClick={(e) => handleUpdate(gig._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
