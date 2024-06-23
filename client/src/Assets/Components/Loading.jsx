const PageLoading = ({ classes, imgClass }) => {
  return (
    <div
      className={
        'fixed z-50 w-full h-screen grid place-items-center ' + classes
      }
    >
      <img
        src='/Images/loading.gif'
        alt='Loading...'
        className={'h-[120px] w-[120px] ' + imgClass}
      />
    </div>
  );
};

const ComponentLoading = ({ classes, imgClass }) => {
  return (
    <div className={'w-full h-full grid place-items-center ' + classes}>
      <img
        src='/Images/loading.gif'
        alt='Loading...'
        className={'h-[80px] w-[80px] ' + imgClass}
      />
    </div>
  );
};

export { PageLoading, ComponentLoading };
