import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const TrustLogos = () => {
  return (
    <div className='flex items-center h-[100px] justify-around bg-slate-100 px-3 md:px-36'>
      <LazyLoadImage
        src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png'
        alt='meta'
      />
      <LazyLoadImage
        className='hidden sm:flex'
        src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png'
        alt='google'
      />
      <LazyLoadImage
        src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png'
        alt='netflix'
      />
      <LazyLoadImage
        className='hidden sm:flex'
        src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png'
        alt='pandg'
      />
      <LazyLoadImage
        src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png'
        alt='paypal'
      />
    </div>
  );
};

export default TrustLogos;
