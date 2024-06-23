import React, { useState } from 'react';
import Checkbox from '../../../../Forms/Checkbox';
import ValuedInput from '../../../../Forms/ValuedInput';
import ImgFileUpload from '../../../../Utils/ImgFileUpload';
import PrimaryButton from '../../../../Buttons/PrimaryButton';
import { GoPlus } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { validFileWrapper } from '../../../../../Assets/requests';

const Keyplans = ({ handleValChange, rightData, setAlert, mode }) => {
  const [keyplanInfo, setKeyplanInfo] = useState({
    id: 0,
    title: '',
    planImg: {},
  });
  const [isCompress, setIsCompress] = useState(false);

  const handleKeyplansInfoSubmit = (e) => {
    e.preventDefault();
    if (!keyplanInfo.planImg.name) {
      setAlert({
        text: 'Please Add an image first',
        state: true,
        type: 'warning',
      });
      return;
    }
    handleValChange('keyPlans', [
      ...rightData.keyPlans,
      {
        ...keyplanInfo,
        id: rightData.keyPlans.length + 1 + '@' + Date.now(),
      },
    ]);

    setKeyplanInfo({
      id: 0,
      title: '',
      planImg: {},
    });
  };

  const removeTargetPlan = (plan) => {
    if (rightData.keyPlans.length > 0) {
      const newPlans = rightData.keyPlans.filter((item) => {
        return item.id !== plan.id;
      });
      handleValChange('keyPlans', newPlans);
    }
  };

  const onFileLoad = (file) => {
    setKeyplanInfo((keyplanInfo) => {
      return {
        ...keyplanInfo,
        planImg: file,
      };
    });
  };

  return (
    <div className='grid gap-2'>
      <div className='flex gap-4 justify-between'>
        <h4 className='text-sm font-bold opacity-90'>Key Plans:</h4>
        <Checkbox
          text={'Compress Image'}
          classes={'mr-1 -mb-1 hidden'}
          checked={isCompress}
          setChecked={setIsCompress}
          textClasses={'opacity-90 font-medium'}
        />
      </div>

      <form
        className='grid gap-4 items-start '
        onSubmit={handleKeyplansInfoSubmit}
      >
        <div className='grid gap-4 grid-rows-[1fr,auto] h-full'>
          <div className='w-full min-h-[180px] h-auto max-h-[300px]'>
            <ImgFileUpload
              type={'single'}
              fileImg={keyplanInfo.planImg}
              onLoad={(file) => onFileLoad(file)}
              compress={{
                state: isCompress,
                maxSizeMb: 0.15,
                maxWidthOrHeight: 1920,
              }}
              clearFileImg={() => onFileLoad({})}
              placeholderText={`Drop Keyplan Image`}
              dragActiveText={`Drop Keyplan Image here`}
            />
          </div>
          <div className='grid grid-cols-[1fr,auto] w-full gap-4'>
            <ValuedInput
              labelClass={'!opacity-75 text-xs hidden'}
              inputProps={{
                value: keyplanInfo?.title || '',
                onChange: (e) => {
                  setKeyplanInfo((keyplanInfo) => {
                    return { ...keyplanInfo, title: e.target.value };
                  });
                },
                placeholder: 'Key plan title',
                name: 'title',
              }}
            />
            <PrimaryButton
              type={'submit'}
              text={'Add'}
              icon={<GoPlus className='text-lg text-primary-main' />}
              classes={'bg-onPrimary-main text-primary-main !py-2 w-full'}
              textClasses={'text-xs'}
            />
          </div>
        </div>
      </form>

      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 w-full h-auto gap-2 mt-3'>
        {rightData?.keyPlans?.map((item, key) => {
          return (
            <div
              key={key}
              className='h-auto max-h-[135px] relative group rounded-lg cursor-pointer'
              onClick={() => {
                setKeyplanInfo(item);
              }}
            >
              <img
                src={validFileWrapper(item.planImg)}
                className='w-full h-full object-cover'
                alt={'thumbnail image'}
              />
              {item.title && (
                <p className='absolute bottom-0 left-0 w-full p-1 !break-all bg-black bg-opacity-60 opacity-0 duration-300 group-hover:opacity-100 text-xs text-primary-light'>
                  {item.title}
                </p>
              )}
              <div
                className='absolute right-[3%] top-[3%] bg-black bg-opacity-60 text-primary-main text-md duration-500 group-hover:bg-opacity-80 w-[22px] h-[22px] rounded-full hidden group-hover:flex items-center justify-center cursor-pointer'
                onClick={() => removeTargetPlan(item)}
              >
                <IoClose />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Keyplans;
