import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='flex items-center justify-center py-5 bg-slate-200'>
       <div className='flex justify-center items-center w-36'>
          <Link to='/'>
            <div className='text-2xl font-bold text-slate-600 '>GigZone</div>
          </Link>
        </div>
      <span className='text-md font-semibold text-slate-500'>copyright @ALi</span>
    </div>
  )
}

export default Footer