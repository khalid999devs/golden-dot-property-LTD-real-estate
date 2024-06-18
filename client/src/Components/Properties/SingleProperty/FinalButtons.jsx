import React from 'react';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { hotlines } from '../../../Assets/links';
import { useNavigate } from 'react-router-dom';

const FinalButtons = ({ value }) => {
  const navigate = useNavigate();
  return (
    <div className='grid w-full grid-cols-1 sm:grid-cols-2'>
      <div
        className='flex min-h-[250px] h-full w-full items-center justify-center sm:justify-end'
        style={{
          background: `linear-gradient(180deg,rgba(133, 84, 10, 0.8) 0%,rgba(225, 110, 9, 0.75) 40%,rgba(133, 84, 10, 0.8) 100%),url('/Images/projectsBanner.jpg')`,
        }}
      >
        <PrimaryButton
          text={'Appoint A Visit'}
          classes={
            'bg-primary-main bg-opacity-30 glass sm:!rounded-none text-white hover:z-10'
          }
          onClick={() => {
            navigate(`/appointment/${value}`);
          }}
        />
      </div>

      <div
        className='flex min-h-[250px] h-full w-full items-center justify-center sm:justify-start'
        style={{
          background: `linear-gradient(180deg,rgba(133, 84, 10, 0.5) 0%,rgba(225, 110, 9, 0.4) 40%,rgba(133, 84, 10, 0.5) 100%),url('/Images/sRandom.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <PrimaryButton
          text={'Enquiry'}
          classes={
            'bg-tertiary-main bg-opacity-30 glass sm:!rounded-none text-white hover:z-10'
          }
          onClick={() => {
            navigator.clipboard.write = hotlines[0];
            window.open(`tel:${hotlines[0]}`);
          }}
        />
      </div>
    </div>
  );
};

export default FinalButtons;
