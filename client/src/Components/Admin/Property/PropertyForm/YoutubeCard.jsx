import { FaYoutube } from 'react-icons/fa';

const YoutubeCard = ({ item }) => {
  return (
    <div
      className='max-h-[200px] relative h-auto rounded-md group cursor-pointer'
      id={item.id}
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
  );
};

export default YoutubeCard;
