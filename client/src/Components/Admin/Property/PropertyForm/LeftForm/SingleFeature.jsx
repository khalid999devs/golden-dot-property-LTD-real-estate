import React from 'react';
import { MdDelete } from 'react-icons/md';

const SingleFeature = ({ feature, deleteFeatureById }) => {
  return (
    <div
      id={feature.id}
      className='w-full flex flex-col gap-4 border border-1 rounded-md border-opacity-50 border-onPrimary-main p-4 '
    >
      <div className='flex justify-between items-center gap-2'>
        <h5 className='text-xs uppercase font-bold opacity-70 w-full'>
          {feature.title}
        </h5>
        <div
          className='cursor-pointer'
          onClick={() => deleteFeatureById(feature.id)}
        >
          <MdDelete className='text-lg text-onPrimary-main' />
        </div>
      </div>

      {feature.features?.length > 0 && (
        <div className='w-full'>
          {feature.features.map((feature, index) => {
            return (
              <div
                key={index}
                className='flex items-center pt-.5 pp-regular !font-[300] text-sm'
              >
                {index + 1}. &nbsp;
                <span>{feature}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SingleFeature;
