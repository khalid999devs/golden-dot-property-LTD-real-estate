import { SubHeaders } from '../../Utils/Headers';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { reqFileWrapper } from '../../../Assets/requests';

const LocationInfo = ({ location }) => {
  const navigate = useNavigate();
  return (
    <div className='w-full py-14'>
      <div className='grid md:grid-cols-[0.7fr,1fr] grid-cols-1 max-w-6xl w-full m-auto gap-12'>
        <div className='px-4 md:px-2 lg:px-0 flex items:start md:items-end justify-center flex-col gap-6 bg-opacity-40'>
          <div className='max-w-[400px]'>
            <div className='text-start mb-6'>
              <SubHeaders text={'Location'} />
            </div>

            <div className='flex flex-col gap-3 '>
              {location.texts.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=' inline-flex items-center pt-1 pb-4 relative pp-regular !font-[300] text-onPrimary-main'
                  >
                    <span>{item}</span>
                    <span className='absolute bottom-0 left-0 w-full h-[0.1px] opacity-30 bg-onPrimary-main'></span>
                  </div>
                );
              })}
            </div>

            <div className='flex items-center gap-3 mt-6'>
              <PrimaryButton
                text={'In Google Map'}
                classes={
                  'bg-primary-main duration-500 !transition-all opacity-85 hover:opacity-100'
                }
                onClick={() => {
                  window.open(location.gMap?.url, '_blank');
                }}
              />
            </div>
          </div>
        </div>
        <div className='px-4 flex items-center justify-start'>
          <div className='border max-w-[500px] w-full min-h-[250px] h-full'>
            <img
              src={reqFileWrapper(location.mapImg)}
              className='h-full w-full object-cover'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
