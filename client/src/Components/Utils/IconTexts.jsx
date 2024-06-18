import React from 'react';
import { Link } from 'react-router-dom';

const ContactIconText = ({
  type = '',
  icon,
  text,
  textClasses,
  classes,
  onClick,
  link,
}) => {
  return (
    <a
      href={
        type === 'phone'
          ? `tel:${text}`
          : type === 'email'
          ? `mailto:${text}`
          : link || '#home'
      }
      onClick={onClick}
      rel='noreferrer'
      target='_blank'
    >
      <div className={'flex gap-2 items-center ' + classes}>
        {icon}
        <span className={textClasses}>{text}</span>
      </div>
    </a>
  );
};

export const Icontext = ({
  icon,
  text,
  textClasses,
  classes,
  onClick,
  ipos = 'left',
  props,
}) => {
  return (
    <div onClick={onClick} {...props}>
      <div className={'flex gap-2 items-center ' + classes}>
        {ipos === 'left' ? icon : ''}
        <span className={textClasses}>{text}</span>
        {ipos !== 'left' ? icon : ''}
      </div>
    </div>
  );
};

export const HeadingIconText = ({ icon, text, textClasses, classes }) => {
  return (
    <div className={'flex gap-2 items-center text-primary-main ' + classes}>
      <div className='text-md text-primary-main'>{icon}</div>
      <span className={`${textClasses}`}>{text}</span>
    </div>
  );
};

export { ContactIconText };
