import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import newRequest from '../utils/newRequest';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../contexts/userContext';
import { Loader } from '../components';

const Message = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(userContext);
  const [buyerId, setBuyerId] = useState('');
  const queryClient = useQueryClient();

  
//fetch all messages in a conversation
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  
//sent a new message in a conversation
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
    },
  });

//fetch data of opposite user
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: buyer,
    refetch: refetchBuyer,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await newRequest(`user/${buyerId}`).then((res) => res.data);
    },
    enabled: !!buyerId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = '';
  };
  
//finding userId of opposite user 
  useEffect(() => {
    if (data && data.length > 0) {
      const foundBuyerId = data.find((m) => m.userId !== user._id)?.userId;
      if (foundBuyerId) {
        setBuyerId(foundBuyerId);
      }
    }
  }, [data, user._id]);

  useEffect(() => {
    refetchBuyer();
  }, [buyerId, refetchBuyer]);

  console.log(buyerId);
  return (
    <div className='min-h-[calc(100vh-140px)] h-full px-14 xl:px-40 py-8'>
      <div className='container flex flex-col '>
        <span className='breadcrumbs '>
          <Link className='my-10' to='/messages'>
            Messages
          </Link>{' '}
          {'>'} {buyer?.username} {'>'}
        </span>
        {isLoading ? (
          <Loader />
        ) : error ? (
          'error'
        ) : (
          <div className='messages overflow-y-scroll  h-96 flex-grow-1 max-h-96 py-6 flex flex-col justify-end px-4 mx-60 rounded-md shadow-violet-300 shadow-inner  mt-8'>
            {data.map((m) => {
              return (
                <div
                  className={`${
                    m.userId === user._id ? 'owner' : 'item'
                  } flex mb-4`}
                  key={m._id}
                >
                  {m.userId === user._id ? (
                    <div className='flex w-full items-center justify-end '>
                      <p className='max-w-[90%] p-3 bg-blue-500 text-white rounded-tl-md rounded-br-md '>
                        {m.desc}
                      </p>
                      <img
                        src={user.img}
                        alt=''
                        className='w-10 h-10 rounded-full ml-3'
                      />
                    </div>
                  ) : isLoadingUser ? (
                    <Loader />
                  ) : errorUser ? (
                    errorUser.message
                  ) : (
                    <>
                      <img
                        src={buyer.img}
                        alt=''
                        className='w-10 h-10 rounded-full mr-3'
                      />
                      <p className='max-w-[70%] p-3 bg-gray-200 rounded-tr-md rounded-bl-md'>
                        {m.desc}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <form
          className='write flex items-center justify-between px-60 mt-6 group'
          onSubmit={handleSubmit}
        >
          <textarea
            type='text'
            placeholder='write a message'
            className='w-80 h-14 p-3  border border-gray-400 rounded-l-md grow'
          />
          <button
            type='submit'
            className='bg-green-500 h-14 px-4 py-2 text-white font-medium rounded-r-md'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
