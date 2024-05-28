import React from 'react';

const PersonCard = ({ name, designation, pic }) => {
  return (
    <div className='w-[280px] h-[360px] sm:w-[220px] sm:h-[300px] '>
      <div className='w-full h-[85%] bg-primary-light p-2 border border-secondary-main'>
        <img
          src={pic}
          alt=''
          className='h-[99%] mx-auto w-[99%] object-cover'
        />
      </div>
      <div className='py-1.5 text-center'>
        <h3 className='text-text-main text-lg font-medium'>
          {name || 'Executive name'}
        </h3>
        <p className='text-md opacity-90 text-onPrimary-main mt-1'>
          {designation || 'Designation'}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
