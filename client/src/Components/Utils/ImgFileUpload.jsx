import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { handleCompressImg } from './ImageCompression';
import { IoImageOutline } from 'react-icons/io5';
import PrimaryButton from '../Buttons/PrimaryButton';
import { RiImageAddLine } from 'react-icons/ri';
import { reqFileWrapper } from '../../Assets/requests';
import { IoClose } from 'react-icons/io5';

const ImgFileUpload = ({
  dragActiveText,
  fileImg,
  onLoad,
  type = 'multiple',
  compress = { state: false, maxSizeMb: 0.5, maxWidthOrHeight: 1920 },
  clearFileImg,
  placeholderText,
  dropContainerClass,
  imageContainerClass,
  thumbnail = false,
  textClasses,
  defaultImg,
}) => {
  const fileInputRef = useRef();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      // reader.onprogress = () => {
      //   console.log('progressing the upload');
      // };
      reader.onload = async () => {
        // const binaryStr = reader.result;
        // console.log(binaryStr);
        if (compress.state) {
          const compressedImg = await handleCompressImg(
            file,
            compress.maxSizeMb,
            compress.maxWidthOrHeight
          );
          if (thumbnail) {
            onLoad(file, compressedImg);
          } else {
            onLoad(compressedImg);
          }
        } else {
          onLoad(file);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    oClick: true,
    noKeyboard: true,
    multiple: type === 'multiple' ? true : false,
    // accept: 'image/*',
  });

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (fileImg?.name || typeof fileImg === 'string' || defaultImg) {
    return (
      <div
        className={
          'flex h-full w-full items-center justify-center relative cursor-pointer group ' +
          imageContainerClass
        }
      >
        <img
          src={
            typeof fileImg === 'object'
              ? window.URL.createObjectURL(fileImg)
              : reqFileWrapper(fileImg)
          }
          alt='FileImg'
          className='w-full h-full rounded-lg object-cover'
        />
        <div
          className='absolute right-[3%] top-[3%] bg-black bg-opacity-60 text-primary-main text-lg duration-500 group-hover:bg-opacity-80 w-[25px] h-[25px] rounded-full flex items-center justify-center cursor-pointer'
          onClick={clearFileImg}
        >
          <IoClose />
        </div>
        <div className='absolute left-0 bottom-0 w-max'>
          <PrimaryButton
            text={'Change Image'}
            icon={<RiImageAddLine className='text-sm text-primary-main' />}
            classes={
              '!py-1 !px-1.5 bg-black bg-opacity-60 group-hover:!bg-opacity-80 !rounded-none !transition-all hover:!scale-100'
            }
            textClasses={'!text-xm text-primary-main normal-case'}
            onClick={openFileSelector}
          />
          <input
            {...getInputProps()}
            ref={fileInputRef}
            style={{ display: 'none' }}
            multiple={type === 'multiple' ? true : false}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        {...getRootProps()}
        className={
          'flex w-full h-full items-center justify-center relative cursor-pointer flex-col border-2 border-secondary-main p-4 rounded-lg ' +
          dropContainerClass
        }
      >
        <input
          {...getInputProps()}
          multiple={type === 'multiple' ? true : false}
        />
        <div className='w-[80%] flex text-center items-center justify-center flex-col gap-2 group'>
          <IoImageOutline className='text-4xl text-onPrimary-main opacity-80' />

          <p className={'w-full opacity-80 !break-keep ' + textClasses}>
            {placeholderText ||
              `Drop your ${type === 'multiple' ? 'Images' : 'Image'}`}{' '}
            <br /> or{' '}
            <span
              className={
                'text-blue-600 text-sm duration-500 group-hover:underline ' +
                textClasses
              }
            >
              click to browse
            </span>
          </p>
        </div>
        <div
          className={`absolute top-[50%] left-[50%] text-onPrimary-main bg-secondary-main rounded-lg w-[97%] h-[95%] text-lg font-medium ${
            isDragActive ? 'flex' : 'hidden'
          } justify-center items-center text-md`}
          style={{ transform: 'translate(-50%,-50%)' }}
        >
          {dragActiveText || 'Drop files here'}
        </div>
      </div>
    );
  }
};

export default ImgFileUpload;
