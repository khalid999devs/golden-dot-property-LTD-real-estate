import { FaCaretLeft } from 'react-icons/fa6';
import { FaCaretRight } from 'react-icons/fa6';

export const LeftArrowButton = ({ onClick, classes }) => {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-md w-7 h-9 bg-primary-main border flex items-center justify-center absolute left-[4%] sm:left-[2%] top-[50%] cursor-pointer opacity-75 transition-all duration-500 hover:opacity-100 shadow-md z-10 ' +
        classes
      }
      style={{ transform: 'translate(-50%,-50%)' }}
    >
      <FaCaretLeft className='text-text-main text-xl' />
    </button>
  );
};

export const RightArrowButton = ({ onClick, classes }) => {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-md w-7 h-9 bg-primary-main border flex items-center justify-center absolute  left-[96%] sm:left-[98%] top-[50%] cursor-pointer opacity-75 transition-all duration-500 hover:opacity-100 shadow-md z-10 ' +
        classes
      }
      style={{ transform: 'translate(-50%,-50%)' }}
    >
      <FaCaretRight className='text-text-main text-xl' />
    </button>
  );
};
