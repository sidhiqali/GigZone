import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Messages = () => {
  const [active, setActive] = useState(false);
  const message =
    'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing';
  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='container w-full '>
        <div className='head flex justify-between py-3'>
          <div className='text-2xl font-semibold'>Messages</div>
        </div>

        <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table class='bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400 z-0'>
            <thead class=' bg-white text-xs text-black uppercase'>
              <tr>
                <th scope='col' class='px-6 py-3'>
                  Buyer
                </th>
                <th scope='col' class='px-6 py-3'>
                  Last message
                </th>
                <th scope='col' class='px-6 py-3'>
                  Date
                </th>
                <th scope='col' class='px-6 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class='bg-white text-black border-b'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  Jhon Doe
                </th>
                <td class='px-6 py-4'>
                  <Link to='/message/123'>{message.substring(0, 100)}</Link>...
                </td>
                <td class='px-6 py-4'>1 hour ago</td>
                <td class='px-6 py-4'>
                  <button className='text-xs h-8 text-white border bg-green-600 px-2 rounded-md '>
                    Mark as read
                  </button>
                </td>
              </tr>
              <tr class='bg-white text-black border-b'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  Jhon Doe
                </th>
                <td class='px-6 py-4'>
                  <Link to='/message/123'>{message.substring(0, 100)}</Link>...
                </td>
                <td class='px-6 py-4'>1 hour ago</td>
                <td class='px-6 py-4'>
                  <button className='text-xs h-8 text-white border bg-green-600 px-2 rounded-md '>
                    Mark as read
                  </button>
                </td>
              </tr>
              <tr class='bg-white text-black border-b '>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  Jhon Doe
                </th>
                <td class='px-6 py-4'>
                  <Link to='/message/123'>{message.substring(0, 100)}</Link>...
                </td>
                <td class='px-6 py-4'>1 hour ago</td>
                <td class='px-6 py-4'>
                  <button className='text-xs h-8 text-white border bg-green-600 px-2 rounded-md '>
                    Mark as read
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Messages;
