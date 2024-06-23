import { GoPlus } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const AddPropertyCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className='bg-primary-light min-h-[270px] max-h-[280px] min-w-[260px] max-w-[200px] w-full relative group p-4 rounded-md cursor-pointer'
      onClick={() => {
        navigate(`add`);
      }}
    >
      <div className='border-2 border-dashed border-tertiary-main w-full h-full rounded-md border-opacity-65 flex items-center justify-center'>
        <div className='text-[6rem] text-tertiary-main opacity-75'>
          <GoPlus />
        </div>
      </div>
    </div>
  );
};

export default AddPropertyCard;
