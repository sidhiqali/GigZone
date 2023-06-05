import React, { useContext } from 'react';
import messageIcon from '../images/message.png';
import { userContext } from '../contexts/userContext';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
const Order = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  if (!user) {
    navigate('/login');
  }
  const { isLoading, error, data } = useQuery({
    queryKey: [user?._id],
    queryFn: () => {
      return newRequest(`order`).then((res) => res.data);
    },
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: user.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  console.log(user);
  console.log(data);
  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='container w-full '>
        <div className='head flex justify-between py-3'>
          <div className='text-2xl font-semibold'>Orders</div>
        </div>

        {isLoading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : error ? (
          'something went wrong'
        ) : (
          <div
          
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
                      {user?.isSeller ? 'buyer' : 'seller'}
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {data.map((order) => (
                  <tr key={order?._id} className='bg-white text-black border-b py-3'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-black whitespace-nowrap'
                    >
                      <img className='h-8 w-12' src={order?.img} alt='' />
                    </th>
                    <td className='px-6 py-4'>{order?.title}</td>
                    <td className='px-6 py-4'>{order?.price}</td>
                    <td className='px-6 py-4'>{user?.username}</td>
                    <td className='px-6 py-4'>
                      <img
                        className='w-6 h-6 cursor-pointer'
                        src={messageIcon}
                        onClick={() => handleContact(order)}
                        alt=''
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

export default Order;
