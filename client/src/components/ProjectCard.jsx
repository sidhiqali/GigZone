import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import newRequest from '../utils/newRequest';
const ProjectCard = ({ project }) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [project._id],
    queryFn: () => {
      return newRequest(`/user/${project.userId}`).then((res) => res.data);
    },
  });
  console.log(data);
  return (
    <Link to={`/gig/${project._id}`} key={project._id}>
    <div className='shadow-slate-300  shadow-lg w-full sm:w-3/4 md:w-10/12 lg:w-3/4 xl:w-10/12 p-2'>
      <div className='  w-full h-80 bg-white rounded-md overflow-hidden relative'>
        <div className='top h-5/6'>
          <LazyLoadImage
            className='w-full h-full object-cover'
            src={project.cover}
            alt='image'
          />
        </div>
        <div className='bottom flex items-center px-3'>
          <div className=''>
            <img
              className='h-12 w-12 m-2 rounded-full'
              src={data?.img}
              alt='avatar'
            />
          </div>
          <div className="desc flex flex-col justify-center ">
            <h1 className='text-lg font-semibold text-gray-900'>{project?.title}</h1>
            <p className='text-sm text-gray-400'>{`by ${data?.username}`}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProjectCard;
