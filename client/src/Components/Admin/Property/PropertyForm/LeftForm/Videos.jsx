import PrimaryButton from '../../../../Buttons/PrimaryButton';
import { useState } from 'react';
import ValuedInput from '../../../../Forms/ValuedInput';
import {
  getYoutubeThumbnailURL,
  getYoutubeVideoId,
} from '../../../../../Assets/utils';
import YoutubeCard from '../YoutubeCard';

const Videos = ({ leftVals, setLeftVals }) => {
  const [videos, setVideos] = useState({
    id: '',
    title: '',
    url: '',
    thumbnail: '',
  });

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    setLeftVals((leftVals) => {
      return {
        ...leftVals,
        videos: [
          ...leftVals.videos,
          {
            id: getYoutubeVideoId(videos.url),
            title: videos.title,
            url: videos.url,
            thumbnail: getYoutubeThumbnailURL(videos.url),
          },
        ],
      };
    });
    setVideos({ id: 0, title: '', url: '', thumbnail: '' });
  };

  return (
    <div className='grid gap-1 mb-2'>
      <h4 className='text-sm font-bold opacity-90'>Videos:</h4>
      <form
        className='grid sm:grid-cols-[1fr,1fr,auto] gap-4 items-start '
        onSubmit={handleVideoSubmit}
      >
        <ValuedInput
          // label={'Feature title'}
          labelClass={'!opacity-65 text-xs'}
          inputProps={{
            value: videos.title,
            onChange: (e) => {
              setVideos((videos) => {
                return { ...videos, title: e.target.value };
              });
            },
            placeholder: 'Video title',
            required: true,
            name: 'title',
          }}
        />
        <ValuedInput
          // label={'Feature title'}
          labelClass={'!opacity-65 text-xs'}
          alert={{
            msg: 'please copy the share url from youtube',
            state: 'none',
          }}
          inputProps={{
            value: videos.url,
            onChange: (e) => {
              setVideos((videos) => {
                return { ...videos, url: e.target.value };
              });
            },
            placeholder: 'Video url (https://youtube.com/...)',
            required: true,
            name: 'url',
          }}
        />
        <div>
          <PrimaryButton
            text={'Add'}
            type={'submit'}
            classes={
              'text-sm bg-onPrimary-main text-primary-main !py-2.5 mb-0.5 w-full sm:mt-1.5'
            }
          />
        </div>
      </form>
      {leftVals.videos.length > 0 && (
        <div className='grid xs:grid-cols-2 sm:grid-cols-3 gap-2 mt-4 mb-3'>
          {leftVals.videos.map((item, key) => {
            return <YoutubeCard item={item} key={key} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Videos;
