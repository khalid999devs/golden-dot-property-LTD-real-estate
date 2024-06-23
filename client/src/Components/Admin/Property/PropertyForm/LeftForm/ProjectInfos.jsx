import { useState } from 'react';
import ValuedInput from '../../../../Forms/ValuedInput';
import PrimaryButton from '../../../../Buttons/PrimaryButton';

const ProjectInfos = ({ setLeftVals, leftVals }) => {
  const [projectInfos, setProjectInfos] = useState({
    id: 0,
    title: '',
    value: '',
  });

  const handleProjectInfoChange = (e) => {
    setProjectInfos((prevVals) => {
      return { ...prevVals, [e.target.name]: e.target.value };
    });
  };

  const handleProjectInfoSubmit = (e) => {
    e.preventDefault();
    setLeftVals((leftVals) => {
      return {
        ...leftVals,
        projectInfos: [
          ...leftVals.projectInfos,
          {
            ...projectInfos,
            id: leftVals.projectInfos?.length + 1 + '@' + Date.now(),
          },
        ],
      };
    });
    setProjectInfos({ id: 0, title: '', value: '' });
  };

  return (
    <div className='grid gap-1.5'>
      <h4 className='text-sm font-bold opacity-90'>Project Infos:</h4>
      <div className='border border-1 rounded-md border-opacity-50 border-onPrimary-main p-4'>
        <form
          className='grid sm:grid-cols-[1fr,1fr,auto] gap-4 items-center'
          onSubmit={handleProjectInfoSubmit}
        >
          <div className='grid grid-cols-[1fr,auto] sm:gap-3 items-center'>
            <ValuedInput
              inputProps={{
                value: projectInfos.title,
                onChange: handleProjectInfoChange,
                name: 'title',
                placeholder: 'Title',
                required: true,
              }}
              size='small'
            />
            <span className='hidden sm:block font-extrabold opacity-70'>:</span>
          </div>

          <ValuedInput
            inputProps={{
              value: projectInfos.value,
              onChange: handleProjectInfoChange,
              name: 'value',
              placeholder: 'Value',
              required: true,
            }}
            size='small'
          />

          <div>
            <PrimaryButton
              text={'Add'}
              type={'submit'}
              classes={
                'text-sm bg-onPrimary-main text-primary-main !py-2.5 mb-0.5 w-full'
              }
            />
          </div>
        </form>
        <div className='mt-4 px-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
          {leftVals?.projectInfos.map((item, index) => {
            return (
              <div
                key={index}
                className='flex gap-1 items-center pt-1 pp-regular !font-[300] text-sm'
                id={item.id || index + 1}
              >
                {index + 1}. &nbsp;
                <span className='font-[600] opacity-80'>
                  {item.title}: &nbsp;
                </span>
                <span>{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfos;
