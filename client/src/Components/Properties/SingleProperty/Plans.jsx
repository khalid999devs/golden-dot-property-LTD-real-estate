import React, { useState } from 'react';
import { SubHeaders } from '../../Utils/Headers';
import { reqFileWrapper } from '../../../Assets/requests';
import ImageGalleryView from '../../Utils/ImageGalleryView';

const Plans = ({ keyPlans }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = keyPlans.map((item, index) => {
    return {
      ...item,
      original: reqFileWrapper(item.planImg),
      thumbnail: reqFileWrapper(item.planImg),
    };
  });

  const openGallery = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <div
      className='w-full min-h-[450px]'
      style={{
        background: `linear-gradient(180deg,rgba(133, 84, 10, 0.8) 0%,rgba(225, 110, 9, 0.75) 40%,rgba(133, 84, 10, 0.8) 100%),url('/Images/projectsBanner.jpg')`,
      }}
    >
      <div className='max-w-6xl m-auto w-full h-full flex items-center justify-start flex-col gap-12 px-2 lg:px-0 py-[80px]'>
        <div className='flex items-center justify-center'>
          <SubHeaders text={'Key Plans'} classes={'text-primary-main'} />
        </div>

        <div className='flex flex-row flex-wrap justify-center gap-4'>
          {keyPlans.map((item, index) => {
            return (
              <div
                key={index}
                className='p-2 flex items-center justify-center bg-secondary-main rounded-md w-[120px] h-[100px] bg-opacity-70 transition-all  duration-500 group hover:bg-text-main cursor-pointer'
                onClick={() => {
                  openGallery(index);
                }}
              >
                <p className='text-center text-md text-text-main group-hover:text-secondary-main duration-500 transition-all'>
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {isOpen && (
        <ImageGalleryView
          items={items}
          startIndex={currentIndex}
          closeGallery={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Plans;
