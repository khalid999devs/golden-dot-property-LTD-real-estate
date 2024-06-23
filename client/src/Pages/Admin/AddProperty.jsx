import { Icontext } from '../../Components/Utils/IconTexts';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../../Components/Admin/Property/PropertyForm/PropertyForm';

const AddProperty = () => {
  const navigate = useNavigate();

  return (
    <div className='py-2 pb-[60px] min-h-screen w-full'>
      <div className='py-2 mb-3'>
        <Icontext
          onClick={() => {
            navigate('/admin/properties');
          }}
          text={'Back to property listing'}
          icon={
            <MdKeyboardBackspace className='text-lg opacity-70 group-hover:opacity-85' />
          }
          textClasses={
            'text-onPrimary-main opacity-60 duration-300 group-hover:opacity-85'
          }
          classes={'text-sm mb-1.5 group cursor-pointer'}
        />
        <h1 className='text-3xl  text-tertiary-main '>Create new Property</h1>
      </div>
      <PropertyForm />
    </div>
  );
};

export default AddProperty;
