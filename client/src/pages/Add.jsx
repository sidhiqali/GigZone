import React, { useReducer, useState } from 'react';
import { Categories } from '../constants/data';
import { INITIAL_STATE, gigReducer } from '../components/reducer';
import Upload from '../utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import { useNavigate } from 'react-router-dom';
const Add = () => {
  const [coverImg, setCoverImg] = useState('');
  const [features, setFeatures] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [multiImages, setMultiImages] = useState([]);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post('/gigs', gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigData'] });
    },
  });

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload(e); // This will handle image upload and mutate state
  };

  const handleFeatures = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_FEATURES',
      payload: features,
    });
    setFeatures('');
  };
  console.log(state);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const cover = await Upload(coverImg);
      const images = await Promise.all(
        [...multiImages].map(async (image) => {
          const url = await Upload(image);
          return url;
        })
      );
      console.log(cover);
      console.log(images);
      setUploading(false);
      const updatedState = {
        ...state,
        cover,
        images,
      };
      dispatch({ type: 'ADD_IMAGES', payload: { cover, images } });
      mutation.mutate(updatedState);
      navigate('/mygigs');
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleDelete = (feature) => {
    dispatch({ type: 'REMOVE_FEATURES', payload: feature });
  };

  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='header text-3xl text-gray-500 py-4'>Add New Gig</div>
      <form
        className='container flex flex-col md:flex-row w-full text-gray-500'
        onSubmit={handleSubmit}
      >
        <div className='left w-full md:w-1/2 md:pr-14'>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Title</span>
            <input
              name='title'
              onChange={handleChange}
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
              onChange={handleChange}
            >
              {Categories.map((category, index) => (
                <option key={index} className='text-gray-500'>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Cover Image</span>
            <input
              className='my-7 text-sm text-gray-500'
              type='file'
              onChange={(e) => setCoverImg(e.target.files[0])}
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Upload photos</span>
            <input
              className='my-7 text-sm text-gray-500'
              type='file'
              onChange={(e) => setMultiImages(e.target.files)}
              multiple
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Description</span>
            <textarea
              className='border-2 border-gray-400 rounded-sm my-4 p-3 text-sm focus:border-gray-500 focus:outline-none '
              placeholder='Brief description to introduce your service to customers'
              name='desc'
              onChange={handleChange}
              id=''
              cols='30'
              rows='10'
            />
          </div>
          <button
            type='submit'
            className='bg-green-700 hidden md:flex items-center justify-center text-white w-full h-10 rounded-sm'
          >
            {uploading ? 'Creating' : 'Create'}
          </button>
        </div>
        <div className='right w-full md:w-1/2 md:pl-14'>
          <div className='title flex flex-col'>
            <span className='text-lg'>Service Title</span>
            <input
              name='shortTitle'
              onChange={handleChange}
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
              name='shortDesc'
              onChange={handleChange}
              id=''
              cols='30'
              rows='8'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Delivery Time (eg:3day)</span>
            <input
              name='deliveryTime'
              onChange={handleChange}
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='number'
              placeholder='eg: one page web design'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Revision Number</span>
            <input
              name='revisionTime'
              onChange={handleChange}
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='number'
              placeholder='eg: one page web design'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Add Feature</span>
            <div className='flex items-center group'>
              <input
                name='features'
                value={features} // Bind the value to features
                onChange={(e) => setFeatures(e.target.value)} // Update the state on input change
                placeholder='eg:page design'
                className='grow border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
                type='text'
              />
              <button
                onClick={handleFeatures}
                className='bg-green-700 m-3 text-white w-16 h-10 rounded-sm'
              >
                Add
              </button>
            </div>
            <div className='flex flex-wrap'>
              {state?.features?.map((feature, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(feature);
                  }}
                  className=' border-2 border-indigo-300 mx-3 rounded-sm my-2 h-8 pl-3 '
                >
                  {feature}
                  <span className='mx-2 text-red-700'>X</span>
                </button>
              ))}
            </div>
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Price</span>
            <input
              name='price'
              onChange={handleChange}
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3  focus:border-gray-500 focus:outline-none '
              type='text'
              placeholder='₹'
            />
          </div>
          <button
            type='submit'
            className='bg-green-700 md:hidden my-3 text-white w-full h-10 rounded-sm'
          >
            {uploading ? 'Creating' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
