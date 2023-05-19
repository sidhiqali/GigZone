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
const Gig = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='h-full px-14 xl:px-40 py-8'>
      <div className='container flex'>
        <div className='left w-8/12'>
          <div className='top-gig'>
            <div className='category text-gray-600 text-sm py-1'>
              Graphic design{' '}
            </div>
            <div className='text-black text-2xl font-semibold'>I will create AI generated arts for you</div>
            <div className='avatar flex py-4 items-center'>
              <img className='h-7 w-7 rounded-full' src={avatar} alt='' />
              <div className='text-base px-2'>Jhon Doe</div>
              <div className='rating flex'>
                <img className='h-3 w-3' src={star} alt='' />
                <img className='h-3 w-3' src={star} alt='' />
                <img className='h-3 w-3' src={star} alt='' />
                <img className='h-3 w-3' src={star} alt='' />
                <img className='h-3 w-3' src={star} alt='' />
              </div>
            </div>
            <div className='slider border'>
              <Slider {...settings}>
                <img className='h-full px-4' src={avatar} alt='' />
                <img src={avatar} alt='' />
                <img src={avatar} alt='' />
                <img src={avatar} alt='' />
              </Slider>
            </div>
            <div className='about-gig'>
              <h1>About this Gig</h1>
              <p>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </p>
            </div>
          </div>
          <div className='about-gig'>
            <div className='text-black text-3xl font-semibold'>
              About The seller
            </div>
            <div className='about-avatar flex '>
              <div className='avatar'>
                <img className='w-11 h-11 rounded-full' src={avatar} alt='' />
              </div>
              <div className='flex flex-col'>
                <div className='text-black'>Name</div>
                <div className='rating flex'>
                  <img src={star} alt='' />
                  <img src={star} alt='' />
                  <img src={star} alt='' />
                  <img src={star} alt='' />
                  <img src={star} alt='' />
                </div>
                <button>Contact me</button>
              </div>
            </div>
            <div className='details'>
              <div className='top flex'>
                <div className='left-details'>
                  <div className='from'>
                    <div>From</div>
                    <div>USA</div>
                  </div>
                  <div className='response'>
                    <div>Avg Response time</div>
                    <div>4 Hour</div>
                  </div>
                  <div className='average'>
                    <div>Language</div>
                    <div>English</div>
                  </div>
                </div>
                <div className='right-details'>
                  <div className='Member'>
                    <div>Member Since</div>
                    <div>Aug 2022</div>
                  </div>
                  <div className='response'>
                    <div>Last delivery</div>
                    <div>1 Day</div>
                  </div>
                </div>
              </div>
              <div className='bottom'>
                <div>
                  {' '}
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged
                </div>
              </div>
            </div>
          </div>
          <div className='review-gig'>
            <div className='text-black text-3xl font-semibold'>Review </div>
            <div className='about-avatar flex '>
              <div className='avatar'>
                <img className='w-11 h-11 rounded-full' src={avatar} alt='' />
              </div>
              <div className='flex flex-col'>
                <div className='text-black'>Jhone Doe</div>
                <div className='country flex'>
                  <img className='h-8 w-8' src={usa} alt='' />
                  <div className=''>USA</div>
                </div>
              </div>
            </div>
            <div className='rating flex'>
              <img src={star} alt='' />
              <img src={star} alt='' />
              <img src={star} alt='' />
              <img src={star} alt='' />
              <img src={star} alt='' />
            </div>
            <div>
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged
            </div>
            <div className='help flex'>
              <div className='h'>Helpful?</div>
              <img className='h-5 w-5' src={like} alt='like' />
              <div>Yes</div>
              <img className='h-5 w-5' src={dislike} alt='like' />
              <div>No</div>
            </div>
          </div>
        </div>
        <div className='right w-4/12'>
          <div className='price flex'>
            <h1>AI Generated image</h1>
            <div>$59.99</div>
          </div>
          <div>
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </div>
          <div className='delivery flex'>
            <div className='left flex'>
              <img className='h-5 w-5' src={clock} alt='' />
              <div>2 day delivery</div>
            </div>
            <div className='right flex'>
              <img className='h-5 w-5' src={recycle} alt='' />
              <div>3 Revisions</div>
            </div>
          </div>
          <div className='specs'>
            <div className='spec flex'>
              <img className='h-5 w-5' src={greencheck} alt='' />
              <span>Prompt writing</span>
            </div>
            <div className='spec flex'>
              <img className='h-5 w-5' src={greencheck} alt='' />
              <span>Artwork Delivery</span>
            </div>
            <div className='spec flex'>
              <img className='h-5 w-5' src={greencheck} alt='' />
              <span>Image updating</span>
            </div>
            <div className='spec flex'>
              <img className='h-5 w-5' src={greencheck} alt='' />
              <span>Additional design</span>
            </div>
          </div>
          <button className='rounded-md w-5/6 bg-green-900'>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Gig;
