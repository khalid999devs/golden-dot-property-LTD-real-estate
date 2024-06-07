import { IoEye } from 'react-icons/io5';
import { IoEyeOff } from 'react-icons/io5';

const ValuedInput = ({
  inputProps,
  label,
  alert,
  type,
  show,
  onShowClick,
  classes,
  inputClasses,
  textArea = false,
}) => {
  return (
    <div className={'grid gap-1.5 w-full ' + classes}>
      <label
        htmlFor={inputProps.name}
        className='text-sm font-medium opacity-90'
      >
        {label}
      </label>
      <div className='relative'>
        {!textArea ? (
          <input
            type={type || 'text'}
            {...inputProps}
            className={
              'p-3 py-2.5 text-sm border border-opacity-50 border-onPrimary-main outline-none rounded-md w-full placeholder:text-secondary-main placeholder:opacity-100 placeholder:font-extralight bg-transparent text-text-main ' +
              inputClasses
            }
          />
        ) : (
          <textarea
            {...inputProps}
            className={
              'p-3 py-2.5 text-sm border border-opacity-50 border-onPrimary-main outline-none rounded-md w-full bg-transparent placeholder:text-secondary-main placeholder:opacity-80 placeholder:font-extralight text-text-main ' +
              inputClasses
            }
          ></textarea>
        )}
        {(show === true || show === false) && (
          <div
            className={`absolute right-[3%] top-[50%] cursor-pointer`}
            style={{ transform: 'translate(-50%,-50%)' }}
            onClick={onShowClick}
          >
            {show ? <IoEye /> : <IoEyeOff />}
          </div>
        )}
      </div>

      {alert?.msg && (
        <p
          className={`${
            alert.state === 'error' ? 'text-red-700' : 'text-orange-600'
          } text-xs ml-1 -mt-1.5`}
        >
          {alert.msg}
        </p>
      )}
    </div>
  );
};

export default ValuedInput;
