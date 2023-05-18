import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <Link to='/gigs'>
    <div className='shadow-slate-300  shadow-lg w-full sm:w-3/4 md:w-10/12 lg:w-3/4 xl:w-10/12 p-2'>
      <div className='  w-full h-80 bg-white rounded-md overflow-hidden relative'>
        <div className='top h-5/6'>
          <img
            className='w-full h-full object-cover'
            src={project.img}
            alt='image'
          />
        </div>
        <div className='bottom flex items-center px-3'>
          <div className=''>
            <img
              className='h-12 w-12 m-2 rounded-full'
              src={project.pp}
              alt='avatar'
            />
          </div>
          <div className="desc flex flex-col justify-center ">
            <h1 className='text-lg font-semibold text-gray-900'>{project.cat}</h1>
            <p className='text-sm text-gray-400'>{`by ${project.username}`}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProjectCard;
