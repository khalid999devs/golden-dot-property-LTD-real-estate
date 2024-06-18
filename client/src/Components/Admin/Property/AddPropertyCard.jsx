import { GoPlus } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const AddPropertyCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className='bg-primary-light max-w-[200px] w-full h-[220px] p-4 rounded-lg cursor-pointer'
      onClick={() => {
        navigate(`add`);
      }}
    >
      <div className='border-2 border-dashed border-tertiary-main w-full h-full rounded-lg border-opacity-65 flex items-center justify-center'>
        <div className='text-[6rem] text-tertiary-main opacity-75'>
          <GoPlus />
        </div>
      </div>
    </div>
  );
};

export default AddPropertyCard;
