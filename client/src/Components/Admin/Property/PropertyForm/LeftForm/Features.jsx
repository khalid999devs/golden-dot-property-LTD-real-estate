import { GoPlus } from 'react-icons/go';
import SingleFeature from './SingleFeature';
import PrimaryButton from '../../../../Buttons/PrimaryButton';
import { useState } from 'react';
import ValuedInput from '../../../../Forms/ValuedInput';

const Features = ({ leftVals, setLeftVals }) => {
  const [features, setFeatures] = useState({
    id: 0,
    title: '',
    features: [],
  });
  const [singleFeature, setSingleFeature] = useState('');

  const handleFeatureValChange = (e) => {
    setFeatures((features) => {
      return {
        ...features,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFeatureTitleSubmit = (e) => {
    e.preventDefault();
    setFeatures((features) => {
      return {
        ...features,
        id: leftVals.features?.length + 1 + '@' + Date.now(),
      };
    });
  };

  const handleFeatureSubmit = (e) => {
    e.preventDefault();
    setLeftVals((leftVals) => {
      return { ...leftVals, features: [...leftVals.features, features] };
    });
    setFeatures({ id: 0, title: '', features: [] });
  };

  return (
    <div className='grid gap-1 mt-1'>
      <h4 className='text-sm font-bold opacity-90'>Features & Amenities:</h4>
      <div>
        <form
          className='grid sm:grid-cols-[1fr,auto] gap-4 items-end'
          onSubmit={handleFeatureTitleSubmit}
        >
          <ValuedInput
            // label={'Feature title'}
            labelClass={'!opacity-65 text-xs'}
            inputProps={{
              value: features.title,
              onChange: handleFeatureValChange,
              placeholder: 'Feature & Amenities title',
              required: true,
              name: 'title',
            }}
          />
          <div>
            <PrimaryButton
              text={'Add'}
              type={'submit'}
              classes={
                'text-sm bg-onPrimary-main text-primary-main !py-2.5 mb-0.5 w-full'
              }
            />
          </div>
        </form>
        {/* feature boxes */}
        <div className='grid xs:grid-cols-2 sm:grid-cols-3 gap-2 mt-4'>
          {features.title && features.id != 0 && (
            <div
              id={features.id}
              className=' border flex flex-col gap-2 justify-between border-1 rounded-md border-opacity-50 border-onPrimary-main p-4'
            >
              <div>
                <h5 className='text-xs uppercase font-bold opacity-65 mb-1.5'>
                  {features.title}
                </h5>
                <form
                  className='grid gap-4 grid-cols-[1fr,auto] items-end'
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFeatures((features) => {
                      return {
                        ...features,
                        features: [...features.features, singleFeature],
                      };
                    });
                    setSingleFeature('');
                  }}
                >
                  <ValuedInput
                    size='small'
                    inputProps={{
                      placeholder: 'Feature',
                      id: features.id + 'in',
                      required: true,
                      value: singleFeature,
                      onChange: (e) => {
                        setSingleFeature(e.target.value);
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
              </div>

              {features.features?.length > 0 && (
                <div>
                  {features.features.map((feature, index) => {
                    return (
                      <div
                        key={index}
                        className='flex flex-1 items-center pt-.5 pp-regular !font-[300] text-sm'
                      >
                        {index + 1}. &nbsp;
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div>
                <PrimaryButton
                  text={'Add Features'}
                  type={'submit'}
                  classes={
                    'bg-onPrimary-main text-primary-main !py-1.5 mb-0.5 w-full mt-2'
                  }
                  textClasses={'!text-xs tracking-widest'}
                  onClick={handleFeatureSubmit}
                />
              </div>
            </div>
          )}
          {leftVals.features.map((item, key) => {
            return <SingleFeature feature={item} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
