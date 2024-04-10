import React from 'react';
import { AnimatedHeader } from '../Utils/Headers';

const Info = () => {
  return (
    <div className='pt-[80px] text-center'>
      <div className='mb-5'>
        <div className='timmonsny-regular uppercase text-tertiary-main leading-[60px] mb-2'>
          <AnimatedHeader text={'Riverview'} />
          <h3 className='tracking-wider text-[45px] text-text-main opacity-60'>
            Series
          </h3>
        </div>
        <div>
          <h3 className='text-2xl pp-regular font-bolder'>
            Location, Luxury & lifestyle
          </h3>
        </div>
      </div>
      <div className='max-w-2xl m-auto '>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sunt
          non aut! Sunt quaerat, error rem a quos vero consequatur laudantium
          magnam cumque? Omnis, ipsum saepe? Ullam accusantium exercitationem,
          consectetur amet, explicabo soluta cumque quod eaque illo, quae modi
          architecto. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Facilis sit unde aspernatur reiciendis quos temporibus harum esse
          there cipato.
        </p>
      </div>
    </div>
  );
};

export default Info;
