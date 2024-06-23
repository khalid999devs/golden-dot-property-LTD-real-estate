import React, { useEffect, useState } from 'react';
import ValuedInput from '../../../../Forms/ValuedInput';
import OptionField from '../../../../Forms/OptionField';
import { categoryOptions } from '../../../../../Assets/utils';
import ProjectInfos from './ProjectInfos';

import Features from './Features';
import Videos from './Videos';
import VirtualTourVideo from './VirtualTourVideo';
import Location from './Location';
import PrimaryButton from '../../../../Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const LeftForm = ({
  leftData,
  handlePropertySubmit,
  handleDataReset,
  mode,
}) => {
  const naviagte = useNavigate();

  const [leftVals, setLeftVals] = useState({
    heading: '',
    value: '',
    subText: '',
    category: { value: 'apartments', title: 'Apartments' },
    projectInfos: [],
    features: [],
    videos: [],
    virtualTourVideo: {
      title: '',
      url: '',
    },
    location: {
      texts: [],
      gMap: {
        state: false,
        infos: {
          lat: 0,
          lng: 0,
        },
        url: '',
      },
      mapImg: {},
    },
  });

  useEffect(() => {
    if (leftData?.heading && !leftVals.heading) {
      setLeftVals((leftVals) => {
        return { ...leftVals, ...leftData };
      });
    }
  }, [leftData]);

  const handleValChange = (e) => {
    setLeftVals((prevVals) => {
      return { ...prevVals, [e.target.name]: e.target.value };
    });
  };

  const handleFullReset = () => {
    handleDataReset();
    if (leftData?.heading) {
      setLeftVals({ ...leftVals, ...leftData });
    } else {
      setLeftVals({
        heading: '',
        value: '',
        subText: '',
        category: { value: 'apartments', title: 'Apartments' },
        projectInfos: [],
        features: [],
        videos: [],
        virtualTourVideo: {
          title: '',
          url: '',
        },
        location: {
          texts: [],
          gMap: {
            state: false,
            infos: {
              lat: 0,
              lng: 0,
            },
            url: '',
          },
          mapImg: {},
        },
      });
    }
  };

  return (
    <div>
      <div className='bg-primary-light p-3 pb-6 flex flex-col gap-3 rounded-lg !break-all'>
        <h3 className='mb-2 font-bold text-lg'>General Information</h3>

        {/* project name & category */}
        <div className='grid sm:grid-cols-2 gap-3 gap-x-5'>
          <ValuedInput
            inputProps={{
              value: leftVals.heading,
              name: 'heading',
              onChange: handleValChange,
              required: true,
              placeholder: 'Project Heading',
            }}
            label={'Project Name: '}
          />
          <OptionField
            id={'category'}
            label={'Category:'}
            name={'category'}
            setValue={(e) => {
              setLeftVals((leftVals) => {
                return {
                  ...leftVals,
                  [e.target.name]: categoryOptions.find(
                    (catop) => catop.value === e.target.value
                  ),
                };
              });
            }}
            optionsObjs={categoryOptions}
            selectClass={'py-2.5'}
          />
        </div>

        {/* sub heading */}
        <div>
          <ValuedInput
            textArea={true}
            label={'Sub Heading:'}
            inputProps={{
              value: leftVals.subText,
              onChange: handleValChange,
              placeholder: 'Sub text',
              name: 'subText',
              rows: 1,
            }}
          />
        </div>

        {/* project infos */}
        <ProjectInfos leftVals={leftVals} setLeftVals={setLeftVals} />

        {/* Features */}
        <Features leftVals={leftVals} setLeftVals={setLeftVals} />

        {/* videos */}
        <Videos leftVals={leftVals} setLeftVals={setLeftVals} />

        {/* Virtual tour video */}
        <VirtualTourVideo leftVals={leftVals} setLeftVals={setLeftVals} />

        {/* Map and location */}
        <Location leftVals={leftVals} setLeftVals={setLeftVals} mode={mode} />
      </div>

      {/* submit buttons */}
      <div className='flex justify-between gap-4 mt-8'>
        {mode === 'add' ? (
          <div className='flex gap-4'>
            <PrimaryButton
              text={'Submit'}
              classes={
                'bg-onPrimary-main text-primary-main !px-2 md:!px-4 !py-1.5 md:!py-2.5'
              }
              textClasses={'text-xs md:text-sm'}
              onClick={() => {
                handlePropertySubmit({ lData: leftVals });
              }}
            />
            <PrimaryButton
              text={'Save as Draft'}
              classes={
                'bg-onPrimary-main text-primary-main !px-2 md:!px-4 !py-1.5 md:!py-2.5'
              }
              textClasses={'text-xs md:text-sm'}
              onClick={() => {
                console.log('draft saved');
              }}
            />
          </div>
        ) : (
          <PrimaryButton
            text={'Save'}
            classes={
              'bg-onPrimary-main text-primary-main !px-2 md:!px-4 !py-1.5 md:!py-2.5'
            }
            textClasses={'text-xs md:text-sm'}
            onClick={() => {
              console.log('editing saved');
            }}
          />
        )}

        <div className='flex gap-4'>
          <PrimaryButton
            text={'Cancel'}
            classes={
              'bg-primary-main text-onPrimary-main !px-2 md:!px-4 !py-1.5 md:!py-2.5'
            }
            textClasses={'text-xs md:text-sm'}
            onClick={() => {
              naviagte('/admin/properties');
            }}
          />
          <PrimaryButton
            text={'Reset'}
            type={'reset'}
            classes={
              'bg-primary-main text-onPrimary-main !px-2 md:!px-4 !py-1.5 md:!py-2.5'
            }
            textClasses={'text-xs md:text-sm'}
            onClick={() => {
              handleFullReset();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftForm;
