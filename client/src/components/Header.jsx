import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/userContext';
import newRequest from '../utils/newRequest';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastify } from '../utils/toastify';
const Header = () => {
  const { user, setUser } = useContext(userContext);
  const [active, setActive] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { pathname } = useLocation();
  const ref = useRef(null);

  //For changing nav according to scrolling
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  //Handle Logout
  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      setUser('');
      toast.success('Logged out');
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };
  
// close the dropdown whenever click outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  return (
    <div
      className={`header-section z-50 sticky top-0 bg-hero bg-no-repeat bg-cover bg-center bg-fixed`}
    >
      <div
        className={`nav-section transition-all ease  flex items-center text-yellow-50 justify-between py-4 px-8 sm:px-24   ${
          active || pathname !== '/' ? 'bg-violet-700' : 'bg-transparent'
        }`}
      >
        <div className='flex justify-center items-center w-36'>
          <Link to='/'>
            <div className='text-2xl font-bold text-slate-300 '>GigZone</div>
          </Link>
        </div>
        <div className='cursor-pointer items-center flex justify-between '>
          <Link to='/gigs'>
            <div className='sm:flex hidden sm:ml-6'>Explore</div>
          </Link>
          <div className='sm:flex hidden sm:ml-6'>English</div>
          {!user && (
            <Link to='/login'>
              {' '}
              <div className='sm:flex hidden sm:ml-6'>Login</div>
            </Link>
          )}
          {!user && (
            <Link to='/register'>
              <button
                type='button'
                className=' ml-3 border border-gray-400 bg-gradient-to-br from-purple-700 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2'
              >
                Join
              </button>
            </Link>
          )}
          {user && (
            <div className='' ref={ref}>
              <div
                onClick={() => {
                  setUserOpen(!userOpen);
                }}
                className='flex items-center cursor-pointer'
              >
                <img
                  className='user h-9 w-9 rounded-full ml-6'
                  src={
                    user.img ||
                    'https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg'
                  }
                  alt='avatar'
                />
                <span className='ml-2'>{user.username}</span>
              </div>
              {userOpen && (
                <div className=' z-10 options transition-all ease cursor-pointer flex flex-col absolute border-2 rounded-md py-5 px-5 md:px-9 mt-3 bg-slate-100 text-blue-900 justify-center items-center'>
                  {user.isSeller && (
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
                  <Link onClick={handleLogout}>
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
    </div>
  );
};

export default Header;
