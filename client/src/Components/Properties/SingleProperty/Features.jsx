import { getRandFeatureIcons } from '../../../Assets/utils';
import { SubHeaders } from '../../Utils/Headers';
import { HeadingIconText } from '../../Utils/IconTexts';

const FeatureContents = ({ feature }) => {
  return (
    <div className='p-3 max-w-[220px]'>
      <HeadingIconText
        classes={'mb-3'}
        textClasses={'uppercase text-[0.9rem] font-[600]'}
        text={feature.title}
        icon={getRandFeatureIcons()}
      />
      <ul
        className='flex flex-col gap-1.5 pl-5 list-disc'
        style={{
          listStyleImage: '',
        }}
      >
        {feature?.features.map((item, index) => {
          return (
            <li className='text-[0.9rem] lato' key={index}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Features = ({ features }) => {
  return (
    <div className='w-full py-[40px] bg-secondary-main '>
      <div className='max-w-6xl m-auto w-full flex flex-col gap-6'>
        <div className='text-center'>
          <SubHeaders text={'Features & Amenities'} />
        </div>
        <div className='flex flex-row flex-wrap items-start justify-center gap-6'>
          {features.map((feature, index) => {
            return <FeatureContents key={index} feature={feature} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
