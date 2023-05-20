import React, { useState, useEffect } from 'react';
import logoWhite from '../images/logo4.png';
import logoBlack from '../images/logo5.png';
import { Link, useLocation } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import man from '../images/man.png';
const Header = () => {
  const [active, setActive] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const currentUser = {
    id: 1,
    userName: 'jhon',
    isSeller: true,
  };

  return (
    <div
      className={`header-section bg-slate-900 bg-hero bg-no-repeat bg-cover bg-center bg-fixed scrollbar-hide`}
    >
      <div
        className={`nav-section sticky transition-all ease top-0 flex items-center text-yellow-50 justify-between py-4 px-8 sm:px-24   ${
          active || pathname !== '/' ? 'bg-violet-700' : 'bg-transparent'
        }`}
      >
        <div className='flex justify-center items-center w-36'>
          <Link to='/'>
            <div className='text-2xl font-bold text-slate-300 '>GigZone</div>
          </Link>
        </div>
        <div className='cursor-pointer items-center flex justify-between '>
          <div className='sm:flex hidden sm:ml-6'>Explore</div>
          <div className='sm:flex hidden sm:ml-6'>English</div>
          {!currentUser?.isSeller && (
            <div className='sm:flex hidden sm:ml-6'>Become Seller</div>
          )}
          {!currentUser?.userName && (
            <div className='sm:flex hidden sm:ml-6'>Login</div>
          )}
          {!currentUser?.userName && (
            <button
              className='flex sm:ml-6  px-5 py-0.5 rounded-md hover:bg-slate-400 hover:text-slate-800 border-2 border-blue-900'
              type='button'
            >
              Join
            </button>
          )}
          {currentUser && (
            <div className=''>
              <div
                onClick={() => {
                  setUserOpen(!userOpen);
                }}
                className='flex items-center cursor-pointer'
              >
                <img
                  className='user h-9 w-9 rounded-full ml-6'
                  src='https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg'
                  alt='avatar'
                />
                <span className='ml-2'>{currentUser.userName}</span>
              </div>
              {userOpen && (
                <div className=' z-10 options transition-all ease cursor-pointer flex flex-col absolute border-2 rounded-md py-5 px-5 md:px-9 mt-3 bg-slate-300 text-blue-900 justify-center items-center'>
                  {currentUser.isSeller && (
                    <>
                      <Link to='/mygigs'>
                        <span
                          onClick={() => {
                            setUserOpen(!userOpen);
                          }}
                        >
                          Gigs
                        </span>
                      </Link>
                      <Link to='/add'>
                        <span
                          onClick={() => {
                            setUserOpen(!userOpen);
                          }}
                        >
                          Add Gigs
                        </span>
                      </Link>
                    </>
                  )}
                  <Link to='/order'>
                    <span
                      onClick={() => {
                        setUserOpen(!userOpen);
                      }}
                    >
                      Order
                    </span>
                  </Link>
                  <Link to='/messages'>
                    <span
                      onClick={() => {
                        setUserOpen(!userOpen);
                      }}
                    >
                      Messages
                    </span>
                  </Link>
                  <Link to='/logout'>
                    <span
                      onClick={() => {
                        setUserOpen(!userOpen);
                      }}
                    >
                      Logout
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {pathname === '/' ? (
        <div className='Feature-section py-14 md:py-36 flex'>
          <div className='flex flex-col justify-center w-full '>
            <h1 className='text-white font-bold text-6xl sm:mx-5 mx-5 lg:mx-48 max-w-lg md:max-w-xl p-5'>
              Find the best freelance service for you
            </h1>
            <div className='mx-5 sm:mx-10 lg:mx-48 max-w-2xl flex p-5'>
              <input
                placeholder='Search for any service...'
                type='text'
                className='w-96 md:w-[450px] h-12 rounded-l-md  border-indigo-700 p-4'
              />
              <MdSearch className='w-11 md:w-[75px] h-12 rounded-r-md  bg-indigo-700 text-white p-2' />
            </div>
            <div className='popular hidden text-sm md:flex sm:mx-10 mx-5 lg:mx-48 max-w-lg md:max-w-lg justify-between p-5 text-white items-center'>
              <span className='text-lg'>Popular:</span>
              <button className='border-2 rounded-2xl w-24 h-7 hover:bg-indigo-700'>
                Web design
              </button>
              <button className='border-2 rounded-2xl w-24 h-7 hover:bg-indigo-700'>
                Web design
              </button>
              <button className='border-2 rounded-2xl w-24 h-7 hover:bg-indigo-700'>
                Logo Design
              </button>
              <button className='border-2 rounded-2xl w-24 h-7 hover:bg-indigo-700'>
                AI services
              </button>
            </div>
          </div>
          {/* <div className="right md:flex justify-center items-center hidden w-96">
          <img src={man} alt='logo' />
        </div> */}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Header;
