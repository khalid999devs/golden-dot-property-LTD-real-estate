import React, { useEffect, useState } from 'react';
import PrimaryButton from './../../Buttons/PrimaryButton';
import { FaPeopleCarry } from 'react-icons/fa';
import { MdCall } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { hotlines } from '../../../Assets/links';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';

const FloatingActionBtn = ({ value }) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const setScrollOpen = () => {
    if (window.scrollY > 200 && count < 1) {
      if (!open) {
        setOpen(true);
        setCount(count + 1);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', setScrollOpen);
    return () => {
      window.removeEventListener('scroll', setScrollOpen);
    };
  }, [count]);

  return (
    <div
      className={`fixed bottom-[1%] left-[50%] glass bg-tertiary-main bg-opacity-40 z-10 w-max duration-500 transition-all transform translate-x-[-50%] ${
        open ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      <div className='flex items-center gap-2 flex-row relative p-2'>
        <PrimaryButton
          text={'Appoint Visit'}
          icon={<FaPeopleCarry className='text-primary-main' />}
          classes={'bg-onPrimary-main'}
          textClasses={'text-primary-main'}
          onClick={() => {
            navigate(`/appointment/${value}`);
          }}
        />
        <PrimaryButton
          text={'Call Us'}
          icon={<MdCall />}
          textClasses={'text-onPrimary-main'}
          classes={'bg-primary-main'}
          onClick={() => {
            navigator.clipboard.write = hotlines[0];
            window.open(`tel:${hotlines[0]}`);
          }}
        />
        <button
          className={`absolute left-[101%] p-1 opacity-70 duration-500 transition-all hover:opacity-100 glass bg-tertiary-main ${
            !open ? 'bottom-[100%]' : 'bottom-[50%]'
          }`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <p className='text-primary-main text-xl'>
            {open ? <FaAngleDown /> : <FaAngleUp />}
          </p>
        </button>
      </div>
    </div>
  );
};

export default FloatingActionBtn;
