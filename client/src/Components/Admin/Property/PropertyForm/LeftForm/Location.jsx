import React, { useEffect, useState } from 'react';
import ValuedInput from '../../../../Forms/ValuedInput';
import { GoPlus } from 'react-icons/go';
import PrimaryButton from '../../../../Buttons/PrimaryButton';
import ImgFileUpload from '../../../../Utils/ImgFileUpload';
import { MdDelete } from 'react-icons/md';

const Location = ({
  leftVals,
  setLeftVals,
  mode,
  handleDeleteImg,
  handleUpdateImg,
}) => {
  const [locaText, setLocaText] = useState('');
  const [isLocImgUpdated, setIsLocImgUpdated] = useState(false);

  const handleLocValChange = (name, value) => {
    if (name === 'mapImg' && value.name) setIsLocImgUpdated(true);
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

  useEffect(() => {
    if (isLocImgUpdated) {
      handleUpdateImg('mapImg', null, {
        file: leftVals.location.mapImg,
      });
      setIsLocImgUpdated(false);
    }
  }, [isLocImgUpdated]);

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

  const deletePerLocText = (targetText) => {
    setLeftVals((leftVals) => {
      return {
        ...leftVals,
        location: {
          ...leftVals.location,
          texts: leftVals.location.texts.filter((item) => item !== targetText),
        },
      };
    });
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
                    className='flex flex-1 justify-between gap-3 items-center pt-.5 pp-regular !font-[300] text-sm hover:border-b-onPrimary-main hover:border-b-[1px] hover:border-opacity-55 group'
                  >
                    <div>
                      {index + 1}. &nbsp;
                      <span>{text}</span>
                    </div>

                    <div
                      className='cursor-pointer opacity-0 transition-all duration-300 group-hover:opacity-100'
                      onClick={() => deletePerLocText(text)}
                    >
                      <MdDelete className='text-lg text-onPrimary-main' />
                    </div>
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
