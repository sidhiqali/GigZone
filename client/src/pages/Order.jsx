import React, { useContext, useEffect, useState } from 'react';
import messageIcon from '../images/message.png';
import { userContext } from '../contexts/userContext';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
const Order = () => {
  const { user, setUser } = useContext(userContext);
  const [nameId, setNameId] = useState('');
  const navigate = useNavigate();

  //if not login redirect to login page
  if (!user) {
    navigate('/login');
  }

  //fetch all orders
  const { isLoading, error, data } = useQuery({
    queryKey: [user?._id],
    queryFn: () => {
      return newRequest(`/order`).then((res) => res.data);
    },
  });

  //fetch details of buyer or seller
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

  //fetch user id of buyer or seller from order details
  useEffect(() => {
    if (data && data.length > 0) {
      const nameIds = data.map((c) => (user.isSeller ? c.buyerId : c.sellerId));
      setNameId(nameIds);
    }
  }, [data, user.isSeller]);

  //message button handling

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    //fetch previous message if had conversation before
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        //create new conversation if first time
        const res = await newRequest.post(`/conversations/`, {
          to: user.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='container w-full '>
        <div className='head flex justify-between py-3'>
          <div className='text-2xl font-semibold'>Orders</div>
        </div>

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
                  {user?.isSeller ? 'buyer' : 'seller'}
                </th>
                <th scope='col' className='px-6 py-3'>
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div className='flex justify-center items-center'>
                  <Loader />
                </div>
              ) : error ? (
                error.message
              ) : (
                data.map((order) => {
                  let correspondingUser = undefined;
                  if (dataUser && dataUser.length > 0) {
                    correspondingUser = dataUser.find((findUser) => {
                      return (
                        findUser._id ===
                        (user.isSeller ? order.buyerId : order.sellerId)
                      );
                    });
                    console.log(correspondingUser);
                  }
                  return (
                    <tr
                      key={order?._id}
                      className='bg-white text-black border-b py-3'
                    >
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-black whitespace-nowrap'
                      >
                        <img className='h-8 w-12' src={order?.img} alt='' />
                      </th>
                      <td className='px-6 py-4'>{order?.title}</td>
                      <td className='px-6 py-4'>{order?.price}</td>
                      {isLoadingUser ? (
                        <Loader />
                      ) : errorUser ? (
                        errorUser.message
                      ) : (
                        <td className='px-6 py-4'>
                          {correspondingUser?.username}
                        </td>
                      )}
                      <td className='px-6 py-4'>
                        <img
                          className='w-6 h-6 cursor-pointer'
                          src={messageIcon}
                          onClick={() => handleContact(order)}
                          alt=''
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
