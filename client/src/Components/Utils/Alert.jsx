import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import gsap from 'gsap';

const Alert = ({
  text,
  icon,
  classes,
  textClasses,
  type = '',
  state,
  setAlert,
}) => {
  const alertRef = useRef();
  const timeline = useRef();
  const [alertOn, setAlertOn] = useState(false);

  useEffect(() => {
    const el = alertRef.current;

    // Show or hide the alert based on the state prop
    if (alertOn !== state) setAlertOn(state);
    if (alertOn) {
      timeline.current = gsap.timeline();
      timeline.current
        .to(el, {
          display: 'flex',
        })
        .to(
          el,
          {
            scale: 1,
            opacity: 1,
            duration: 0.2,
          },
          0
        )
        .to(el, {
          delay: 2.5, // Auto-close after 2500 milliseconds
          scale: 0,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setAlertOn(false);
            setAlert((prev) => ({ ...prev, state: false }));
          },
        });
    } else {
      timeline.current = gsap.timeline();
      timeline.current
        .to(el, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
        })
        .to(el, {
          display: 'none',
        });
    }

    // Cleanup animations on unmount
    return () => {
      timeline?.current?.kill();
      gsap.killTweensOf(el);
    };
  }, [state, alertOn]);

  // Close the alert manually
  const closeAlert = () => {
    setAlertOn(false);
    setAlert((prev) => ({ ...prev, state: false }));
  };

  return (
    <div
      ref={alertRef}
      className={`p-3 hidden items-center gap-6 justify-between max-w-[400px] w-[100%] ${
        type === 'success'
          ? 'bg-green-700'
          : type === 'error'
          ? 'bg-red-700'
          : type === 'warning'
          ? 'bg-orange-500'
          : 'bg-text-main'
      } shadow-md rounded-md fixed top-[4%] z-50 left-[50%] ${classes}`}
      style={{ transform: 'translate(-50%,0%)' }}
    >
      <p
        className={`font-medium ${
          type === 'warning'
            ? 'text-text-main'
            : type === 'error'
            ? 'text-white'
            : 'text-secondary-main'
        } ${textClasses}`}
      >
        {text || 'Alert text'}
      </p>
      <p
        className='text-lg hover:text-primary-main cursor-pointer duration-100'
        onClick={closeAlert}
      >
        {icon || <IoMdClose />}
      </p>
    </div>
  );
};

export default Alert;
