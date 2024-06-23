import React, { useState } from 'react';
import ValuedInput from '../../Forms/ValuedInput';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { ComponentLoading } from '../../../Assets/Components/Loading';

const ReplyForm = ({ email, id, name, handleSubmit }) => {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <ComponentLoading imgClass={'!w-[50px] !h-[50px]'} />;
  } else {
    return (
      <form
        className='grid gap-1 w-full'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(reply, email, id, name, setLoading);
        }}
      >
        <ValuedInput
          inputProps={{
            value: reply,
            onChange: (e) => {
              setReply(e.target.value);
            },
            placeholder: 'Reply message',
            name: 'reply',
            rows: 2,
          }}
          textArea={true}
        />
        {reply.length > 0 && (
          <div className='flex w-full items-end justify-end'>
            <PrimaryButton
              classes={'!py-1.5 bg-secondary-main text-primary-light'}
              textClasses={'!text-xs'}
              text={'Reply'}
              type={'submit'}
            />
          </div>
        )}
      </form>
    );
  }
};

export default ReplyForm;
