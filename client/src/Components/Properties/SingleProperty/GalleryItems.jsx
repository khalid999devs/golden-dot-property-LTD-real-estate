import { HiOutlinePlay } from 'react-icons/hi2';

const GalleryItems = ({ galleryImages, videos, slickSettings, sliderRef }) => {
  return <></>;
};

export const ImageItem = ({ item }) => {
  return (
    <div className='gallery-item !w-[280px] !h-[300px] border border-text-main relative group overflow-hidden cursor-pointer'>
      <img
        src={item.thumbnail}
        alt={item.title}
        className='w-full h-full object-cover scale-105 group-hover:scale-100 grayscale-20 transition-all duration-1000'
      />
      <p
        className='absolute bottom-[0%] left-[50%] bg-text-main bg-opacity-65 text-primary-main w-full p-1 text-sm text-center transition-all duration-1000 group-hover:bg-opacity-100'
        style={{
          transform: 'translate(-50%,-0%)',
        }}
      >
        {item.title}
      </p>
    </div>
  );
};

export const VideoItem = ({ item }) => {
  return (
    <div className='gallery-item !w-[280px] !h-[300px] border border-text-main relative group cursor-pointer overflow-hidden'>
      <img
        src={item.thumbnail}
        alt={item.title}
        className='w-full h-full object-cover scale-105 group-hover:scale-100 grayscale-20 transition-all duration-1000'
      />
      <div
        className='absolute top-[50%] left-[50%] p-3 rounded-lg glass !shadow-md opacity-65 bg-primary-main transition-all duration-1000'
        style={{
          transform: 'translate(-50%,-50%)',
        }}
      >
        <HiOutlinePlay className='text-2xl text-onPrimary-main' />
      </div>
    </div>
  );
};

export default GalleryItems;
