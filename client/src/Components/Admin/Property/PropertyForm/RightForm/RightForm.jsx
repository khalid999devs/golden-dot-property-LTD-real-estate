import React, { useState } from 'react';
import ImgFileUpload from '../../../../Utils/ImgFileUpload';
import Checkbox from '../../../../Forms/Checkbox';
import GalleryImgs from './GalleryImgs';
import Keyplans from './Keyplans';

const RightForm = ({ rightData, setRightData, setAlert }) => {
  const [isBannerComp, setIsBannerComp] = useState(false);

  const handleValChange = (name, value) => {
    setRightData((rightData) => {
      return { ...rightData, [name]: value };
    });
  };

  return (
    <div>
      <div className='bg-primary-light p-3 pb-6 flex flex-col gap-4 rounded-lg !break-all'>
        {/* banner */}
        <div className='grid gap-2'>
          <div className='flex gap-4 justify-between'>
            <h4 className='text-sm font-bold opacity-90'>Banner:</h4>
            <Checkbox
              text={'Compress Image'}
              classes={'mr-1 -mb-1'}
              checked={isBannerComp}
              setChecked={setIsBannerComp}
              textClasses={'opacity-90 font-medium'}
            />
          </div>

          <div className='w-full min-h-[260px] md:min-h-[350px] lg:min-h-[250px] h-full max-h-[30s0px]'>
            <ImgFileUpload
              type='single'
              fileImg={rightData?.img}
              onLoad={(file) => {
                handleValChange('img', file);
              }}
              clearFileImg={() => {
                handleValChange('img', {});
              }}
              compress={{
                state: isBannerComp,
                maxSizeMb: 0.4,
                maxWidthOrHeight: 1920,
              }}
              placeholderText={'Drop banner Image'}
              dragActiveText={'Drop banner Image here'}
            />
          </div>
        </div>

        {/* Gallery Images */}
        <GalleryImgs
          setAlert={setAlert}
          handleValChange={handleValChange}
          rightData={rightData}
        />

        {/* keyPlans */}
        <Keyplans
          setAlert={setAlert}
          handleValChange={handleValChange}
          rightData={rightData}
        />
      </div>
    </div>
  );
};

export default RightForm;
