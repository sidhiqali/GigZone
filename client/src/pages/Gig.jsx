import React from 'react';
import avatar from '../images/bg-header.jpg';
import star from '../images/star.png';
import Slider from 'react-slick';
import usa from '../images/usa.png';
import like from '../images/like.png';
import dislike from '../images/dislike.png';
import clock from '../images/clock.png';
import recycle from '../images/recycle.png';
import greencheck from '../images/greencheck.png';
import { NextArrow, PrevArrow } from '../components/CardSlider';
const Gig = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='h-full px-14 xl:px-40 py-8'>
      <div className='container flex lg:flex-row flex-col'>
        <div className='left lg:w-8/12 w-full'>
          <div className='top-gig'>
            <div className='category text-gray-600 text-sm py-1'>
              Graphic design{' '}
            </div>
            <div className='text-black text-3xl font-bold'>
              I will create AI generated arts for you
            </div>
            <div className='avatar flex py-4 items-center'>
              <img className='h-7 w-7 rounded-full' src={avatar} alt='' />
              <div className='text-sm font-semibold px-2'>Jhon Doe</div>
              <div className='rating flex'>
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
              </div>
              <div className='h-5 w-5 text-yellow-400'>5</div>
            </div>
            <div className='slider min-h-[200px] lg:min-h-[400px] px-1 md:px-3 lg:px-6'>
              <Slider
                className='w-full'
                {...settings}
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
              >
                <img
                  className='px-48 min-h-[200px] lg:min-h-[400px]'
                  src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/288408744/original/61b4ea49c92dde56a8d9113bf82bf82ded867c0b/create-concept-art-and-character-illustration.png'
                  alt=''
                />
                <img
                  className='px-48 min-h-[200px] lg:min-h-[400px]'
                  src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/299303050/original/00ed10f685f8c011ba2f2209e717ebd099541647/create-an-amazing-art-from-your-imagination-using-midjourney-ai.png'
                  alt=''
                />
                <img
                  className='px-48 min-h-[200px] lg:min-h-[400px]'
                  src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/299303050/original/28aa781f25deadbed424251bb60066d8045c1ee1/create-an-amazing-art-from-your-imagination-using-midjourney-ai.png'
                  alt=''
                />
                <img
                  className='px-48 min-h-[200px] lg:min-h-[400px]'
                  src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/299303050/original/4f23add854c310d98cbdbf7dbfe2dbc2e4789dd7/create-an-amazing-art-from-your-imagination-using-midjourney-ai.png'
                  alt=''
                />
              </Slider>
            </div>
            <div className='about-gig py-4'>
              <h1 className='text-2xl font-semibold pb-4'>About this Gig</h1>
              <p className='text-gray-700'>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged
              </p>
            </div>
          </div>
          <div className='about-gig py-4'>
            <div className='text-black text-2xl font-semibold'>
              About The seller
            </div>
            <div className='about-avatar flex py-3'>
              <div className='avatar'>
                <img className='w-20 h-20 rounded-full' src={avatar} alt='' />
              </div>
              <div className='flex flex-col px-3'>
                <div className='text-black font-semibold'>Jhon Doe</div>
                <div className='rating flex items-center'>
                  <img className='h-3 w-3 mr-1' src={star} alt='' />
                  <img className='h-3 w-3 mr-1' src={star} alt='' />
                  <img className='h-3 w-3 mr-1' src={star} alt='' />
                  <img className='h-3 w-3 mr-1' src={star} alt='' />
                  <img className='h-3 w-3 mr-1' src={star} alt='' />{' '}
                  <div className='h-5 w-5 text-yellow-400'>5</div>
                </div>
                <button className='border-2 rounded-md mt-1 p-1 border-gray-400 text-sm '>
                  Contact me
                </button>
              </div>
            </div>
            <div className='details mt-4 border-2'>
              <div className='top flex p-2 justify-between'>
                <div className='left-details pl-8'>
                  <div className='from py-3'>
                    <div className='text-gray-500'>From</div>
                    <div>USA</div>
                  </div>
                  <div className='response'>
                    <div className='text-gray-500'>Avg Response time</div>
                    <div>4 Hour</div>
                  </div>
                  <div className='average py-3'>
                    <div className='text-gray-500'>Language</div>
                    <div>English</div>
                  </div>
                </div>
                <div className='right-details pr-8'>
                  <div className='Member py-3'>
                    <div className='text-gray-500'>Member Since</div>
                    <div>Aug 2022</div>
                  </div>
                  <div className='response'>
                    <div className='text-gray-500'>Last delivery</div>
                    <div>1 Day</div>
                  </div>
                </div>
              </div>

              <div className='bottom px-8 py-4'>
                <hr className='p-2' />
                <div>
                  {' '}
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </div>
              </div>
            </div>
          </div>
          <div className='review-gig py-6'>
            <div className='text-black text-2xl font-semibold py-3'>
              Reviews
            </div>
            <div className=' review-body-section flex flex-col my-4'>
              <div className='about-avatar flex'>
                <div className='avatar'>
                  <img className='w-10 h-10 rounded-full' src={avatar} alt='' />
                </div>
                <div className='flex flex-col'>
                  <div className='text-black text-sm font-semibold mx-2'>
                    Jhone Doe
                  </div>
                  <div className='country flex'>
                    <img className='h-5 w-5 mx-2' src={usa} alt='' />
                    <div className='text-gray-500 text-sm'>USA</div>
                  </div>
                </div>
              </div>
              <div className='rating flex items-center py-2'>
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />{' '}
                <div className='h-5 w-5 text-yellow-400'>5</div>
              </div>
              <div className='text-gray-500'>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </div>
              <div className='help flex items-center'>
                <div className='font-semibold'>Helpful?</div>
                <img className='h-4 w-4 mx-3' src={like} alt='like' />
                <div className='font-semibold'>Yes</div>
                <img className='h-4 w-4 mx-3' src={dislike} alt='like' />
                <div className='font-semibold'>No</div>
              </div>
            </div>
            <hr />
            <div className=' review-body-section flex flex-col my-6'>
              <div className='about-avatar flex'>
                <div className='avatar'>
                  <img className='w-10 h-10 rounded-full' src={avatar} alt='' />
                </div>
                <div className='flex flex-col'>
                  <div className='text-black text-sm font-semibold mx-2'>
                    Jhone Doe
                  </div>
                  <div className='country flex'>
                    <img className='h-5 w-5 mx-2' src={usa} alt='' />
                    <div className='text-gray-500 text-sm'>USA</div>
                  </div>
                </div>
              </div>
              <div className='rating flex items-center py-2'>
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />{' '}
                <div className='h-5 w-5 text-yellow-400'>5</div>
              </div>
              <div className='text-gray-500'>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </div>
              <div className='help flex items-center'>
                <div className='font-semibold'>Helpful?</div>
                <img className='h-4 w-4 mx-3' src={like} alt='like' />
                <div className='font-semibold'>Yes</div>
                <img className='h-4 w-4 mx-3' src={dislike} alt='like' />
                <div className='font-semibold'>No</div>
              </div>
            </div>
            <hr />
            <div className=' review-body-section flex flex-col my-6'>
              <div className='about-avatar flex'>
                <div className='avatar'>
                  <img className='w-10 h-10 rounded-full' src={avatar} alt='' />
                </div>
                <div className='flex flex-col'>
                  <div className='text-black text-sm font-semibold mx-2'>
                    Jhone Doe
                  </div>
                  <div className='country flex'>
                    <img className='h-5 w-5 mx-2' src={usa} alt='' />
                    <div className='text-gray-500 text-sm'>USA</div>
                  </div>
                </div>
              </div>
              <div className='rating flex items-center py-2'>
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />
                <img className='h-3 w-3 mr-1' src={star} alt='' />{' '}
                <div className='h-5 w-5 text-yellow-400'>5</div>
              </div>
              <div className='text-gray-500'>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </div>
              <div className='help flex items-center'>
                <div className='font-semibold'>Helpful?</div>
                <img className='h-4 w-4 mx-3' src={like} alt='like' />
                <div className='font-semibold'>Yes</div>
                <img className='h-4 w-4 mx-3' src={dislike} alt='like' />
                <div className='font-semibold'>No</div>
              </div>
            </div>
          </div>
        </div>
        <div className='right sticky top-10 lg:w-4/12 border h-full w-full lg:h-[360px] p-5'>
          <div className='price flex items-center justify-between'>
            <h1 className=' text-lg font-semibold'>1 AI Generated image</h1>
            <div className='text-xl '>$59.99</div>
          </div>
          <div className='text-sm text-gray-500 my-6'>
            I will generate unique and high quality AI generated images based on
            the description you give me
          </div>
          <div className='delivery flex items-center justify-between'>
            <div className='left flex items-center'>
              <img className='h-4 w-4 mx-2' src={clock} alt='' />
              <div className='text-gray-500 text-sm'>2 day delivery</div>
            </div>
            <div className='right flex items-center'>
              <img className='h-4 w-4 mx-2' src={recycle} alt='' />
              <div className='text-gray-500 text-sm'>3 Revisions</div>
            </div>
          </div>
          <div className='specs flex flex-col py-4 '>
            <div className='spec flex items-center'>
              <img className='h-4 w-4 mx-2' src={greencheck} alt='' />
              <span className='text-gray-500'>Prompt writing</span>
            </div>
            <div className='spec flex items-center'>
              <img className='h-4 w-4 mx-2' src={greencheck} alt='' />
              <span className='text-gray-500'>Artwork Delivery</span>
            </div>
            <div className='spec flex items-center'>
              <img className='h-4 w-4 mx-2' src={greencheck} alt='' />
              <span className='text-gray-500'>Image updating</span>
            </div>
            <div className='spec flex items-center'>
              <img className='h-4 w-4 mx-2' src={greencheck} alt='' />
              <span className='text-gray-500'>Additional design</span>
            </div>
          </div>
          <button className='rounded-sm h-9 text-white w-full bg-green-500'>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gig;
