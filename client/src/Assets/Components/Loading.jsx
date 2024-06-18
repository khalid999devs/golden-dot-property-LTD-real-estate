const PageLoading = () => {
  return (
    <div className='fixed z-50 w-full h-screen grid place-items-center'>
      <img
        src='/Images/loading.gif'
        alt='Loading...'
        className='h-[120px] w-[120px]'
      />
    </div>
  );
};

const ComponentLoading = () => {
  return (
    <div className='w-full h-full grid place-items-center'>
      <img
        src='/Images/loading.gif'
        alt='Loading...'
        className='h-[120px] w-[120px]'
      />
    </div>
  );
};

export { PageLoading, ComponentLoading };
