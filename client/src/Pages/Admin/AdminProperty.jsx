import AddPropertyCard from '../../Components/Admin/Property/AddPropertyCard';

const AdminProperty = () => {
  return (
    <div className='min-h-screen py-2 pt-4 w-full'>
      <div className='flex flex-row gap-4'>
        <AddPropertyCard />
      </div>
    </div>
  );
};

export default AdminProperty;
