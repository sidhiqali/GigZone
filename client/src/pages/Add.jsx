import React from 'react';
import { Categories } from '../constants/data';
const Add = () => {
  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='header text-3xl text-gray-500 py-4'>Add New Gig</div>
      <div className='container flex flex-col md:flex-row w-full text-gray-500'>
        <div className='left w-full md:w-1/2 md:pr-14'>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Title</span>
            <input
              className='border-2 border-gray-400 h-10 rounded-sm my-4 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='text'
              placeholder='eg: I will do something I am really good at'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Category</span>
            <select
              className='border-2 border-gray-400 h-10 rounded-sm my-5 px-3 text-sm focus:border-gray-500 focus:outline-none '
              name='category'
            >
              {Categories.map((category) => (
                <option className='text-gray-500' value='volvo'>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Cover Image</span>
            <input className='my-7 text-sm text-gray-500' type='file' />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Upload photos</span>
            <input className='my-7 text-sm text-gray-500' type='file' />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Description</span>
            <textarea
              className='border-2 border-gray-400 rounded-sm my-4 p-3 text-sm focus:border-gray-500 focus:outline-none '
              placeholder='Brief description to introduce your service to customers'
              name=''
              id=''
              cols='30'
              rows='10'
            />
          </div>
          <button className='bg-green-700 hidden md:flex items-center justify-center text-white w-full h-10 rounded-sm'>
            Create
          </button>
        </div>
        <div className='right w-full md:w-1/2 md:pl-14'>
          <div className='title flex flex-col'>
            <span className='text-lg'>Service Title</span>
            <input
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='text'
              placeholder='eg: one page web design'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Short Description</span>
            <textarea
              className='border-2 border-gray-400 rounded-sm my-2 p-3 text-sm focus:border-gray-500 focus:outline-none '
              placeholder='Short description about your service'
              name=''
              id=''
              cols='30'
              rows='8'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Delivery Time (eg:3day)</span>
            <input
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='text'
              placeholder='eg: one page web design'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Revision Number</span>
            <input
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='text'
              placeholder='eg: one page web design'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Add Feature</span>
            <input
              placeholder='eg:page design'
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='text'
            />
            <input
              placeholder='eg:file Uploading'
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='text'
            />
            <input
              placeholder='eg:Setting up domain'
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='text'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Price</span>
            <input
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3  focus:border-gray-500 focus:outline-none '
              type='text'
              placeholder='₹'
            />
          </div>
          <button className='bg-green-700 md:hidden my-3 text-white w-full h-10 rounded-sm'>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
