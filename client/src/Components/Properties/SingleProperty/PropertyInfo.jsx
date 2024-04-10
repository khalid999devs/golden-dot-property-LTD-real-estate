import React from 'react';
import { AnimatedHeader } from '../../Utils/Headers';

const PropertyInfo = ({ heading, projectInfos }) => {
  return (
    <div className='grid gap-8'>
      <AnimatedHeader
        text={heading}
        classes={'text-center !text-[2rem]'}
        style={{ lineHeight: '120%' }}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 w-[95%] md:w-[80%] lg:w-[70%] m-auto'>
        {projectInfos.map((item, index) => {
          return (
            <div
              key={index}
              className='flex items-center pt-1 pb-4 relative pp-regular !font-[300]'
            >
              <span>{item.title}: &nbsp;</span>
              <span>{item.value}</span>
              <span className='absolute bottom-0 left-0 w-full h-[0.1px] opacity-30 bg-text-main'></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyInfo;
