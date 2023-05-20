import React from 'react';
import deleteIcon from '../images/delete.png';
import { Link } from 'react-router-dom';
const MyGigs = () => {
  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='container w-full '>
        <div className='head flex justify-between py-3'>
          <div className='text-2xl font-semibold'>Gigs</div>
          <Link to='/add'>
          <button className='text-xs h-8 text-white border bg-green-600 px-2 rounded-md '>
            Add new Gig
          </button></Link>
        </div>

        <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table class='bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead class=' bg-white text-xs text-black uppercase'>
              <tr>
                <th scope='col' class='px-6 py-3'>
                  Image
                </th>
                <th scope='col' class='px-6 py-3'>
                  Title
                </th>
                <th scope='col' class='px-6 py-3'>
                  Price
                </th>
                <th scope='col' class='px-6 py-3'>
                  Sales
                </th>
                <th scope='col' class='px-6 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class='bg-white text-black border-b py-3'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  <img className='h-8 w-12'
                    src='https://fiverr-res.cloudinary.com/video/upload/so_72.687298,t_gig_cards_web/cxyn0j2moufb81pdkwft.png'
                    alt=''
                  />
                </th>
                <td class='px-6 py-4'>Gig1</td>
                <td class='px-6 py-4'>88</td>
                <td class='px-6 py-4'>123</td>
                <td class='px-6 py-4'>
                  <img className='w-6 h-6' src={deleteIcon} alt="" />
                </td>
              </tr>
              <tr class='bg-white text-black border-b py-3'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  <img className='h-8 w-12'
                    src='https://fiverr-res.cloudinary.com/video/upload/so_72.687298,t_gig_cards_web/cxyn0j2moufb81pdkwft.png'
                    alt=''
                  />
                </th>
                <td class='px-6 py-4'>Gig1</td>
                <td class='px-6 py-4'>88</td>
                <td class='px-6 py-4'>123</td>
                <td class='px-6 py-4'>
                  <img className='w-6 h-6' src={deleteIcon} alt="" />
                </td>
              </tr>
              <tr class='bg-white text-black border-b py-3'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  <img className='h-8 w-12'
                    src='https://fiverr-res.cloudinary.com/video/upload/so_72.687298,t_gig_cards_web/cxyn0j2moufb81pdkwft.png'
                    alt=''
                  />
                </th>
                <td class='px-6 py-4'>Gig1</td>
                <td class='px-6 py-4'>88</td>
                <td class='px-6 py-4'>123</td>
                <td class='px-6 py-4'>
                  <img className='w-6 h-6' src={deleteIcon} alt="" />
                </td>
              </tr>
              <tr class='bg-white text-black border-b py-3'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  <img className='h-8 w-12'
                    src='https://fiverr-res.cloudinary.com/video/upload/so_72.687298,t_gig_cards_web/cxyn0j2moufb81pdkwft.png'
                    alt=''
                  />
                </th>
                <td class='px-6 py-4'>Gig1</td>
                <td class='px-6 py-4'>88</td>
                <td class='px-6 py-4'>123</td>
                <td class='px-6 py-4'>
                  <img className='w-6 h-6' src={deleteIcon} alt="" />
                </td>
              </tr>
              <tr class='bg-white text-black border-b py-3'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  <img className='h-8 w-12'
                    src='https://fiverr-res.cloudinary.com/video/upload/so_72.687298,t_gig_cards_web/cxyn0j2moufb81pdkwft.png'
                    alt=''
                  />
                </th>
                <td class='px-6 py-4'>Gig1</td>
                <td class='px-6 py-4'>88</td>
                <td class='px-6 py-4'>123</td>
                <td class='px-6 py-4'>
                  <img className='w-6 h-6' src={deleteIcon} alt="" />
                </td>
              </tr>
              <tr class='bg-white text-black border-b py-3'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  <img className='h-8 w-12'
                    src='https://fiverr-res.cloudinary.com/video/upload/so_72.687298,t_gig_cards_web/cxyn0j2moufb81pdkwft.png'
                    alt=''
                  />
                </th>
                <td class='px-6 py-4'>Gig1</td>
                <td class='px-6 py-4'>88</td>
                <td class='px-6 py-4'>123</td>
                <td class='px-6 py-4'>
                  <img className='w-6 h-6' src={deleteIcon} alt="" />
                </td>
              </tr>
              <tr class='bg-white text-black border-b py-3'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-black whitespace-nowrap'
                >
                  <img className='h-8 w-12'
                    src='https://fiverr-res.cloudinary.com/video/upload/so_72.687298,t_gig_cards_web/cxyn0j2moufb81pdkwft.png'
                    alt=''
                  />
                </th>
                <td class='px-6 py-4'>Gig1</td>
                <td class='px-6 py-4'>88</td>
                <td class='px-6 py-4'>123</td>
                <td class='px-6 py-4'>
                  <img className='w-6 h-6' src={deleteIcon} alt="" />
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyGigs;
