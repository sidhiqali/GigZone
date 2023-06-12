import React, { useReducer, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Categories } from '../constants/data';
import { INITIAL_STATE, gigReducer } from '../components/reducer';
import Upload from '../utils/upload';
import newRequest from '../utils/newRequest';
import { toastify } from '../utils/toastify';

const Add = () => {
  const [coverImg, setCoverImg] = useState('');
  const [features, setFeatures] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [multiImages, setMultiImages] = useState([]);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const isUpdate = location.state?.isUpdate || false;
  // Get the gig ID from the URL parameters
  const { id } = useParams();
  console.log(id);

  // Fetch the gig data for updating if it's an update operation
  useEffect(() => {
    if (isUpdate && id) {

      // Make an API call to fetch the gig data by ID
      const fetchGigData = async () => {
        try {
          const response = await newRequest.get(`/gigs/single/${id}`);
          const gigData = response.data;
          dispatch({ type: 'SET_FORM_DATA', payload: gigData });
        } catch (error) {
          console.error(error);
        }
      };

      fetchGigData();
    }
  }, [isUpdate, id]);

  //create or update Gig
  const mutation = useMutation({
    mutationFn: (gig) => {
      if (isUpdate) {
        return newRequest.put(`/gigs/${id}`, gig);
      } else {
        return newRequest.post('/gigs', gig);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigData'] });
      navigate('/mygigs');
      toast.success(
        isUpdate ? 'Gig updated successfully' : 'Gig created successfully',
        { ...toastify }
      );
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
    try {
      if (
        !state.title ||
        !state.category ||
        state.features.length === 0 ||
        !state.desc ||
        !state.shortTitle ||
        !state.shortDesc ||
        !state.deliveryTime ||
        !state.revisionTime ||
        !state.price
      ) {
        toast.error('Please fill in all the required fields.', { ...toastify });
        return;
      }

      await handleUpload(e);
    } catch (error) {
      toast.error(error?.response?.data, { ...toastify });
    }
  };


  const handleFeatures = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_FEATURES',
      payload: [features],
    });
    setFeatures('');
  };

//upload image to cloudinary 
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const cover = await Upload(coverImg);
      const images = await Promise.all(
        [...multiImages].map(async (image) => {
          const imgUrl = await Upload(image);
          return imgUrl;
        })
      );

      const gig = {
        ...state,
        cover,
        images,
      };

      mutation.mutate(gig);
    } catch (error) {
      console.error('Error uploading files: ', error);
      toast.error('Error uploading files.', { ...toastify });
    } finally {
      setUploading(false);
    }
  };

  //feature section delete 
  const handleDelete = (feature) => {
    dispatch({ type: 'REMOVE_FEATURES', payload: feature });
  };

  console.log(state);
  return (
    <div className='min-h-[calc(100vh-140px)] px-14 xl:px-40 py-8'>
      <div className='header text-3xl text-gray-500 py-4'>
        {isUpdate ? 'Edit' : 'Add'} Gig
      </div>
      <form
        className='container flex flex-col md:flex-row w-full text-gray-500'
        onSubmit={handleSubmit}
      >
        <div className='left w-full md:w-1/2 md:pr-14'>
          <div className='title flex flex-col'>
            <span className='text-lg text-gray-500'>Title</span>
            <input
              value={state.title}
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
              value={state.category}
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
              value={state.desc}
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
            {uploading ? 'Creating...' : 'Create'}
          </button>
        </div>
        <div className='right w-full md:w-1/2 md:pl-14'>
          <div className='title flex flex-col'>
            <span className='text-lg'>Service Title</span>
            <input
              name='shortTitle'
              value={state.shortTitle}
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
              value={state.shortDesc}
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
              value={state.deliveryTime}
              onChange={handleChange}
              className='border-2 border-gray-400 rounded-sm my-2 h-10 px-3 text-sm focus:border-gray-500 focus:outline-none '
              type='number'
              placeholder='eg: one page web design'
            />
          </div>
          <div className='title flex flex-col'>
            <span className='text-lg'>Revision Number</span>
            <input
              value={state.revisionTime}
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
              value={state.price}
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
            {uploading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
