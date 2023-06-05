import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import newRequest from '../utils/newRequest';
import { userContext } from '../contexts/userContext';
import Loader from '../components/Loader';

const Messages = () => {
  const { user, setUser } = useContext(userContext);
  const [nameId, setNameId] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']);
    },
  });

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ['users', nameId],
    queryFn: () => {
      return Promise.all(
        nameId.map((id) => newRequest(`user/${id}`).then((res) => res.data))
      );
    },
    enabled: !!nameId,
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const nameIds = data.map((c) => (user.isSeller ? c.buyerId : c.sellerId));
      setNameId(nameIds);
    }
  }, [data, user.isSeller]);

  console.log(dataUser);
  console.log(data);
  return (
    <div className='min-h-[calc(100vh-140px)] h-full px-14 xl:px-40 py-8'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div className='container'>
          <div className='title flex justify-between text-lg text-gray-500'>
            <h1>Messages</h1>
          </div>
          <table className='w-full text-gray-500'>
            <thead className='bg-white text-xs text-black uppercase my-5'>
              <tr className='my-6'>
                <th scope='col' className='w-1/4'>
                  {user.isSeller ? 'Buyer' : 'Seller'}
                </th>
                <th scope='col' className='w-1/4'>
                  Last Message
                </th>
                <th scope='col' className='w-1/4'>
                  Date
                </th>
                <th scope='col' className='w-1/4'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => {
                let correspondingUser = undefined;
                if (dataUser && dataUser.length > 0) {
                  correspondingUser = dataUser.find((findUser) => {
                    return (
                      findUser._id === (user.isSeller ? c.buyerId : c.sellerId)
                    );
                  });
                  console.log(correspondingUser);
                }
                return (
                  <tr
                    key={c._id}
                    className={
                      (user.isSeller && !c.readBySeller) ||
                      (!user.isSeller && !c.readByBuyer)
                        ? 'active bg-green-100'
                        : ''
                    }
                  >
                    <td className='px-6 py-4 flex justify-center'>
                      {isLoadingUser ? (
                        <Loader />
                      ) : errorUser ? (
                        errorUser.message
                      ) : (
                        correspondingUser?.username
                      )}
                    </td>
                    <td
                      className='hover:text-green-500 px-6 py-4 cursor-pointer'
                      onClick={(e) => navigate(`/message/${c.id}`)}
                    >
                      {c?.lastMessage?.substring(0, 100)}...
                    </td>
                    <td className='px-6 py-4 flex justify-center'>
                      {moment(c.updatedAt).fromNow()}
                    </td>
                    <td className='px-6 py-4 pl-24'>
                      {((user.isSeller && !c.readBySeller) ||
                        (!user.isSeller && !c.readByBuyer)) && (
                        <button
                          onClick={() => handleRead(c.id)}
                          className='bg-green-500 text-sm text-white px-4 py-2 rounded cursor-pointer '
                        >
                          Mark as Read
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
