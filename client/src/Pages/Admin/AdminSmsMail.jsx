import React from 'react';
import { RichTextEditor } from '../../Components/Utils/Rich_text_editor/RichTextEditor';

const AdminSmsMail = () => {
  return (
    <div className='min-h-screen py-4 w-full'>
      <div className='py-2 mb-4'>
        <h1 className='text-3xl  text-tertiary-main '>MAIL and SMS sender</h1>
      </div>

      <div className='max-w-[700px] w-full m-auto mt-12 p-4 bg-white shadow-lg rounded-lg'>
        <RichTextEditor />
      </div>
    </div>
  );
};

export default AdminSmsMail;
