const PrimaryButton = ({
  classes,
  onClick,
  icon,
  text,
  children,
  textClasses,
  props,
  disabled,
  type,
}) => {
  return (
    <button
      className={`px-4 py-3 text-md text-primary flex flex-row gap-2 uppercase items-center justify-center font-medium rounded-lg transition-transform hover:scale-105 ${
        disabled && ' opacity-30'
      } ${classes}`}
      onClick={onClick}
      disabled={disabled || false}
      type={type || 'button'}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {text && <p className={`text-sm ${textClasses}`}>{text}</p>}
          {icon && icon}
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
