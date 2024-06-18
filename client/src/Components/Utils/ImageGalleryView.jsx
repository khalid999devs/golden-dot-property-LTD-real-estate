import { MdClose } from 'react-icons/md';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGalleryView = ({ items, startIndex, closeGallery }) => {
  const renderCustomSlide = (item) => {
    return (
      <div className='image-gallery-image flex justify-center items-center relative'>
        {item.type === 'video' ? (
          <div
            className='w-full relative'
            onClick={() => {
              window.open(item.original, '_blank');
            }}
          >
            <img
              className='w-full h-full'
              src={item.thumbnail}
              alt='video Img'
            />
            <div
              className='absolute left-[50%] top-[50%]'
              style={{ transform: 'translate(-50%,-50%)' }}
            >
              <img
                className='w-[70px] h-[70px]'
                src='/Images/Icon/youtube.png'
                alt=''
              />
            </div>
          </div>
        ) : (
          <img src={item.original} alt={item.title} className={`w-full`} />
        )}
        <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-65 text-white p-2'>
          <h3 className='text-lg font-semibold'>{item.title}</h3>
          <p className='text-sm'>{item.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
      <button
        onClick={closeGallery}
        className='absolute z-10 top-[2%] right-[5%] bg-black bg-opacity-55 hover:bg-opacity-100 duration-500 text-white rounded-full flex items-center justify-center p-2 focus:outline-none'
      >
        <MdClose className='text-2xl' />
      </button>
      <div className='relative w-full md:w-3/4 lg:w-1/2'>
        <ImageGallery
          items={items}
          startIndex={startIndex}
          renderItem={renderCustomSlide}
          showThumbnails={true}
          showPlayButton={true}
          showFullscreenButton={true}
          showIndex={true}
          renderThumbInner={(item) => (
            <img
              src={item.thumbnail}
              alt={item.title}
              className='w-full h-[60px] object-cover'
            />
          )}
        />
      </div>
    </div>
  );
};

export default ImageGalleryView;
