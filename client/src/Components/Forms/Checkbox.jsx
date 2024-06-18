const Checkbox = ({
  checked,
  setChecked,
  name,
  text,
  extra,
  classes,
  textClasses,
}) => {
  return (
    <div
      className={
        'flex flex-row items-center justify-center gap-2 text-md ' + classes
      }
    >
      <input
        type='checkbox'
        className='form-checkbox h-3.5 w-3.5 bg-onPrimary-main cursor-pointer'
        name={name}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
        {...extra}
      />
      <h2 className={`text-tertiary-main text-sm !break-all ${textClasses}`}>
        {text}
      </h2>
    </div>
  );
};
export default Checkbox;
