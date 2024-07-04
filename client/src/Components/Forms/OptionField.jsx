const OptionField = ({
  id,
  label,
  setValue,
  optionsObjs,
  name,
  containerClass,
  selectClass,
}) => {
  return (
    <div
      className={
        `w-full relative inline-block after:content-["▼"] after:absolute after:top-[57%] after:right-[10px] after:translate-[-50%,-50%] after:pointer-events-none after:text-white after:text-sm ` +
        containerClass
      }
    >
      <label htmlFor={id} className=' text-md'>
        {label}
      </label>
      <select
        name={name}
        id={id}
        className={
          'mt-1 pl-2 p-1 text-sm b-none rounded-sm appearance-none bg-onPrimary-main text-white cursor-pointer w-full outline-none ' +
          selectClass
        }
        onChange={setValue}
      >
        {optionsObjs.map((option, key) => {
          return (
            <option
              value={option.value}
              key={key}
              style={{ padding: '10px!important' }}
            >
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default OptionField;
