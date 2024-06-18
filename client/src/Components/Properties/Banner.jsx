import React from 'react';

const Banner = ({ img, heading }) => {
  return (
    <div
      className='w-full min-h-[400px] h-[80vh] bg-cover relative'
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.7) 0%,rgba(0, 0, 0, 0.3) 40%,rgba(0, 0, 0, 0.8) 100%),url(${
          img || '/Images/projectsBanner.jpg'
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1
        className='bottom-[10%] left-[50%] absolute text-center'
        style={{ transform: 'translate(-50%,0%)' }}
      >
        {heading || 'Banner Heading'}
      </h1>
    </div>
  );
};

export default Banner;
