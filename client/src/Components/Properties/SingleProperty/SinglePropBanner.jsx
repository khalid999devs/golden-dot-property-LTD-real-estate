import PrimaryButton from '../../Buttons/PrimaryButton';
import { CiPlay1 } from 'react-icons/ci';

const SinglePropBanner = ({ img, galleryImages, virtualTourVideo }) => {
  return (
    <div
      className='w-full min-h-[400px] h-[80vh] bg-cover'
      style={{
        background: `linear-gradient(180deg,rgba(0, 0, 0, 0.7) 0%,rgba(0, 0, 0, 0.3) 40%,rgba(0, 0, 0, 0.8) 100%),url(${
          img || '/Images/projectsBanner.jpg'
        })`,
      }}
    >
      <div className='max-w-6xl m-auto relative w-[95%] h-full lg:w-[98%] xl:w-full'>
        {virtualTourVideo?.url && (
          <div className='absolute bottom-[5%] left-[0%]'>
            <PrimaryButton
              text={'Virtual Tour'}
              icon={<CiPlay1 className='' />}
              classes={
                'bg-primary-main opacity-75 !font-[600] hover:scale-100 transition-opacity hover:opacity-100 duration-500 '
              }
            />
          </div>
        )}
        {galleryImages.length > 0 && (
          <div className='absolute bottom-[5%] right-[0%]'>
            <div className='hidden sm:block sm:w-[120px] md:w-[160px] sm:h-[100px] md:h-[120px] p-2 rounded-md glass bg-primary-main relative bg-opacity-40'>
              <img
                src={galleryImages[0].thumbnail}
                alt=''
                className='h-full w-full object-cover'
              />
              {galleryImages.length > 1 && (
                <p
                  className='absolute top-[50%] left-[50%] text-2xl font-extrabold text-text-main'
                  style={{ transform: 'translate(-50%,-50%)' }}
                >
                  +{galleryImages.length - 1}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePropBanner;
