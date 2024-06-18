import ValuedInput from '../../../../Forms/ValuedInput';

const VirtualTourVideo = ({ leftVals, setLeftVals }) => {
  const handleVirtualChange = (e) => {
    setLeftVals((leftVals) => {
      return {
        ...leftVals,
        virtualTourVideo: {
          ...leftVals.virtualTourVideo,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  return (
    <div className='grid'>
      <h4 className='text-sm font-bold opacity-90'>Virtual Tour Video:</h4>
      <div className='grid sm:grid-cols-[1fr,1fr] gap-4 items-start '>
        <ValuedInput
          // label={'Feature title'}
          labelClass={'!opacity-65 text-xs'}
          inputProps={{
            value: leftVals?.virtualTourVideo?.title || '',
            onChange: handleVirtualChange,
            placeholder: 'Video title',
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
            value: leftVals?.virtualTourVideo?.url || '',
            onChange: handleVirtualChange,
            placeholder: 'Video url (https://youtube.com/...)',
            name: 'url',
            type: 'url',
          }}
        />
      </div>
    </div>
  );
};

export default VirtualTourVideo;
