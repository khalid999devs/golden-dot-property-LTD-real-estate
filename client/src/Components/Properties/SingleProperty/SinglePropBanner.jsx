import { reqFileWrapper } from '../../../Assets/requests';
import { normalizePath } from '../../../Assets/utils';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { CiPlay1 } from 'react-icons/ci';

const SinglePropBanner = ({ img, galleryImages, virtualTourVideo }) => {
  let bImg = reqFileWrapper(normalizePath(img));
  return (
    <div
      className='w-full min-h-[400px] h-[80vh]'
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.7) 0%,rgba(0, 0, 0, 0.3) 40%,rgba(0, 0, 0, 0.8) 100%),url(${
          bImg || '/Images/projectsBanner.jpg'
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundOrigin: 'center',
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
              onClick={() => {
                window.open(virtualTourVideo.url, '_blank');
              }}
            />
          </div>
        )}
        {galleryImages.length > 0 && (
          <div className='absolute bottom-[5%] right-[0%]'>
            <div className='hidden sm:block sm:w-[120px] md:w-[160px] sm:h-[100px] md:h-[120px] p-2 rounded-md glass bg-primary-main relative bg-opacity-40'>
              <img
                src={reqFileWrapper(galleryImages[0].thumbnail)}
                alt=''
                className='h-full w-full object-cover'
              />
              {galleryImages.length > 1 && (
                <div className='absolute top-[50%] left-[50%] z-10 bg-white p-1 bg-opacity-15'>
                  <p
                    className=' text-2xl font-extrabold text-text-main z-1'
                    style={{ transform: 'translate(-50%,-50%)' }}
                  >
                    +{galleryImages.length - 1}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePropBanner;
