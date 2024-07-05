import { IoClose } from 'react-icons/io5';

const YoutubeCard = ({ item, deletePerVideo }) => {
  return (
    <div
      className='max-h-[200px] relative h-auto rounded-md group cursor-pointer'
      id={item.id}
    >
      <div
        className='w-full h-full'
        onClick={() => {
          window.open(item.url, '_blank');
        }}
      >
        <img
          src={item.thumbnail}
          className='w-full h-full object-cover rounded-md'
          alt='youtube thumbnail'
        />
        <div
          className='absolute top-[50%] left-[50%]'
          style={{ transform: 'translate(-50%,-50%)' }}
        >
          <img
            src='/Images/Icon/youtube.png'
            className='h-[40px] w-[40px]'
            alt=''
          />
          {/* <FaYoutube className='text-4xl text-red-600' /> */}
        </div>
        <p className='text-xs opacity-0 w-full text-primary-light absolute left-0 bottom-0 p-1 duration-500 group-hover:opacity-80 bg-black bg-opacity-70'>
          {item.title}
        </p>
      </div>

      <div
        className='absolute right-[3%] top-[3%] bg-black bg-opacity-60 text-primary-main text-md duration-500 group-hover:bg-opacity-80 w-[22px] h-[22px] rounded-full hidden group-hover:flex items-center justify-center cursor-pointer'
        onClick={(e) => deletePerVideo(e, item.id)}
      >
        <IoClose />
      </div>
    </div>
  );
};

export default YoutubeCard;
