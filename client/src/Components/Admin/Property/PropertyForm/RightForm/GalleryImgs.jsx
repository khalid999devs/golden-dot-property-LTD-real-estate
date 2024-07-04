import React, { useState } from 'react';
import Checkbox from '../../../../Forms/Checkbox';
import ValuedInput from '../../../../Forms/ValuedInput';
import ImgFileUpload from '../../../../Utils/ImgFileUpload';
import PrimaryButton from '../../../../Buttons/PrimaryButton';
import { GoPlus } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { validFileWrapper } from '../../../../../Assets/requests';

const GalleryImgs = ({
  handleValChange,
  rightData,
  setAlert,
  mode,
  handleDeleteImg,
}) => {
  const [galleryInfo, setGalleryInfo] = useState({
    id: 0,
    thumbnail: {},
    title: '',
    url: {},
  });
  const [isMultiUpload, setIsMultiUpload] = useState(false);

  const handleGalleryInfoSubmit = (e) => {
    e.preventDefault();
    if (!galleryInfo.url.name) {
      setAlert({
        text: 'Please Add an image first',
        state: true,
        type: 'warning',
      });
      return;
    }
    handleValChange('galleryImgs', [
      ...rightData.galleryImgs,
      {
        ...galleryInfo,
        id: rightData.galleryImgs.length + 1 + '@' + Date.now(),
      },
    ]);
  };

  const removeTargetImg = (img) => {
    if (rightData.galleryImgs.length > 0) {
      const newImgs = rightData.galleryImgs.filter((item) => {
        return item.id !== img.id;
      });
      handleValChange('galleryImgs', newImgs);
      handleDeleteImg('galleryImgs', img.id);
    }
  };

  const onFileLoad = (original, thumbnail, isMultiUpload) => {
    // console.log(isMultiUpload);
    if (isMultiUpload == false) {
      setGalleryInfo((galleryInfo) => {
        return {
          ...galleryInfo,
          thumbnail: thumbnail,
          url: original,
        };
      });
    } else {
      console.log('hi');
      handleValChange('galleryImgs', [
        ...rightData.galleryImgs,
        {
          id: rightData.galleryImgs.length + 1 + '@' + Date.now(),
          thumbnail: thumbnail,
          url: original,
          title: galleryInfo.title,
        },
      ]);
    }
  };

  return (
    <div className='grid gap-2'>
      <div className='flex gap-4 justify-between'>
        <h4 className='text-sm font-bold opacity-90'>Gallery Images:</h4>
        <Checkbox
          text={'Multiple upload'}
          classes={'mr-1 -mb-1 hidden'}
          checked={isMultiUpload}
          setChecked={setIsMultiUpload}
          textClasses={'opacity-90 font-medium'}
        />
      </div>

      <form
        className='grid sm:grid-cols-[1fr,1.2fr] gap-4 items-start '
        onSubmit={handleGalleryInfoSubmit}
      >
        <div className='grid gap-4 grid-rows-[auto,1fr] h-full'>
          <ValuedInput
            labelClass={'!opacity-75 text-xs hidden'}
            inputProps={{
              value: galleryInfo?.title || '',
              onChange: (e) => {
                setGalleryInfo((galleryInfo) => {
                  return { ...galleryInfo, title: e.target.value };
                });
              },
              placeholder: 'Image title',
              name: 'title',
            }}
          />
          <div className='w-full h-auto'>
            <ImgFileUpload
              type={isMultiUpload ? 'multiple' : 'single'}
              onLoad={(original, thumbnail) =>
                onFileLoad(original, thumbnail, isMultiUpload)
              }
              textClasses={'!text-xs'}
              compress={{
                state: true,
                maxSizeMb: 0.15,
                maxWidthOrHeight: 1920,
              }}
              placeholderText={`Drop gallery ${
                isMultiUpload ? 'Images' : 'Image'
              }`}
              dragActiveText={`Drop gallery ${
                isMultiUpload ? 'Images' : 'Image'
              } here`}
              thumbnail={true}
            />
          </div>
        </div>

        {/* image preview and submit*/}
        {galleryInfo.url?.name ||
        (galleryInfo.url && typeof galleryInfo.url === 'string') ||
        rightData?.galleryImgs?.length > 0 ? (
          <div className='flex flex-col justify-between h-full gap-4 items-center'>
            <div className='w-full min-h-[120px] h-auto max-h-[250px]'>
              <ImgFileUpload
                type={isMultiUpload ? 'multiple' : 'single'}
                fileImg={
                  !isMultiUpload
                    ? galleryInfo.url
                    : rightData.galleryImgs[rightData.galleryImgs?.length - 1]
                        ?.url
                }
                defaultImg={true}
                onLoad={(original, thumbnail) =>
                  onFileLoad(original, thumbnail, isMultiUpload)
                }
                clearFileImg={() => {
                  setGalleryInfo({ id: 0, thumbnail: '', title: '', url: '' });
                }}
                compress={{
                  state: true,
                  maxSizeMb: 0.15,
                  maxWidthOrHeight: 1920,
                }}
                placeholderText={'Drop banner Image'}
                dragActiveText={'Drop banner Image here'}
                thumbnail={true}
              />
            </div>
            <div className='w-full'>
              <PrimaryButton
                type={'submit'}
                text={'Add'}
                icon={<GoPlus className='text-lg text-primary-main' />}
                classes={'bg-onPrimary-main text-primary-main !py-2 w-full'}
                textClasses={'text-xs'}
              />
            </div>
          </div>
        ) : (
          <div className='w-full rounded-lg h-full border-2 border-secondary-main flex justify-center items-center p-4'>
            <p className='text-sm opacity-65'>Image Preview</p>
          </div>
        )}
      </form>

      <div className='flex flex-row flex-wrap w-full h-auto gap-1 mt-3'>
        {rightData?.galleryImgs.map((item, key) => {
          return (
            <div
              key={key}
              className='h-[85px] relative group max-w-[95px] min-w-[50px] cursor-pointer'
              style={{
                flexBasis: '95px',
                flexGrow: 1,
                flexShrink: 1,
              }}
              onClick={() => {
                setGalleryInfo(item);
              }}
            >
              <img
                src={validFileWrapper(item.thumbnail)}
                className='w-full h-full object-cover'
                alt={'thumbnail image'}
              />
              {item.title && (
                <p className='absolute bottom-0 left-0 w-full p-1 !break-all bg-black bg-opacity-60 opacity-0 duration-300 group-hover:opacity-100 text-xs text-primary-light'>
                  {item.title}
                </p>
              )}
              <div
                className='absolute right-[3%] top-[3%] bg-black bg-opacity-60 text-primary-main text-md duration-500 group-hover:bg-opacity-80 w-[22px] h-[22px] rounded-full hidden group-hover:flex items-center justify-center cursor-pointer'
                onClick={() => removeTargetImg(item)}
              >
                <IoClose />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryImgs;
