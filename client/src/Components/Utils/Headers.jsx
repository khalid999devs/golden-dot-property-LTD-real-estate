import React from 'react';

const AnimatedHeader = ({ text, classes, style }) => {
  return (
    <h2 className={'text-[60px] uppercase font-bold ' + classes} style={style}>
      {text || 'Heading text'}{' '}
    </h2>
  );
};

const SubHeaders = ({ text, classes, style }) => {
  return (
    <h2
      className={`text-[2.2rem] capitalize pp-medium inline-block ${classes}`}
      style={style}
    >
      {text || 'Sub Heading'}
    </h2>
  );
};

export { AnimatedHeader, SubHeaders };
