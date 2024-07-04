import React, { useState } from 'react';
import ValuedInput from '../../../../Forms/ValuedInput';
import { GoPlus } from 'react-icons/go';
import PrimaryButton from '../../../../Buttons/PrimaryButton';
import ImgFileUpload from '../../../../Utils/ImgFileUpload';

const Location = ({ leftVals, setLeftVals, mode, handleDeleteImg }) => {
  const [locaText, setLocaText] = useState('');

  const handleLocValChange = (name, value) => {
    setLeftVals((leftVals) => {
      return {
        ...leftVals,
        location: {
          ...leftVals.location,
          [name]: value,
        },
      };
    });
  };

  const handleLocTextSubmit = (e) => {
    e.preventDefault();
    setLeftVals((leftVals) => {
      return {
        ...leftVals,
        location: {
          ...leftVals.location,
          texts: [...leftVals.location.texts, locaText],
        },
      };
    });
    setLocaText('');
  };

  return (
    <div className='grid'>
      <h4 className='text-sm font-bold opacity-90'>Location and Map:</h4>
      <ValuedInput
        // label={'Feature title'}
        labelClass={'!opacity-65 text-xs'}
        alert={{
          msg: 'please copy the share url from google map',
          state: 'none',
        }}
        inputProps={{
          value: leftVals?.location?.gMap.url || '',
          onChange: (e) => {
            handleLocValChange('gMap', {
              ...leftVals.location?.gMap,
              url: e.target.value,
            });
          },
          placeholder: 'Google map url (https://maps.app.goo.gl/...)',
          name: 'url',
          type: 'url',
        }}
      />
      <div className='grid sm:grid-cols-[1fr,1.4fr] gap-4 items-start px-1 py-2'>
        <div>
          <form
            className='grid gap-4 grid-cols-[1fr,auto] items-end mt-2 mb-3'
            onSubmit={handleLocTextSubmit}
          >
            <ValuedInput
              size='small'
              // inputClasses={'!py-1'}
              label={'Address'}
              inputProps={{
                placeholder: 'Location text',
                required: true,
                value: locaText,
                onChange: (e) => {
                  setLocaText(e.target.value);
                },
              }}
            />
            <div>
              <PrimaryButton
                icon={<GoPlus className='text-sm' />}
                type={'submit'}
                classes={
                  'bg-onPrimary-main text-primary-main !py-1.5 !px-2 mb-0.5 w-full'
                }
              />
            </div>
          </form>
          {leftVals.location?.texts?.length > 0 && (
            <div className='px-3'>
              {leftVals.location.texts.map((text, index) => {
                return (
                  <div
                    key={index}
                    className='flex flex-1 items-center pt-.5 pp-regular !font-[300] text-sm'
                  >
                    {index + 1}. &nbsp;
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* location img */}
        <div className='p-2 min-h-[250px] md:min-h-[200px] h-full max-h-[300px]'>
          <ImgFileUpload
            type='single'
            fileImg={leftVals.location?.mapImg || {}}
            onLoad={(file) => {
              handleLocValChange('mapImg', file);
            }}
            clearFileImg={() => {
              handleLocValChange('mapImg', {});
              handleDeleteImg('location');
            }}
            placeholderText={'Drop map Image'}
            dragActiveText={'Drop map Image here'}
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
