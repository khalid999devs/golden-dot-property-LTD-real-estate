import React, { useEffect, useRef, useState } from 'react';
import SingleCard from '../Properties/SingleCard';
import { cardInfos } from '../../Assets/contents';
import PrimaryButton from '../Buttons/PrimaryButton';

const PropertyCards = () => {
  // const [isOverflowing, setIsOverflowing] = useState(true);
  // const timeline = useRef();
  // const [wInnerWidth, setwInnerWidth] = useState(window.innerWidth);

  // const setInnerWidth = () => {
  //   setwInnerWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', setInnerWidth);
  //   return () => {
  //     window.removeEventListener('resize', setInnerWidth);
  //   };
  // }, []);

  //   const slickSettings = {
  //     swipeToSlide: true,
  //     infinite: true,
  //     speed: 1000,
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     variableWidth: true,
  //     arrows: false,
  //   };

  return (
    <div className=''>
      <div className='flex flex-wrap lg:flex-nowrap gap-7 sm:gap-4 justify-center max-w-[800px] w-full m-auto'>
        {cardInfos.map((card, index) => {
          return (
            <SingleCard
              key={index}
              img={card.img}
              heading={card.heading}
              subText={card.subText}
              value={card.value}
              classes={''}
            />
          );
        })}
      </div>
      <div className='w-full flex justify-center items-center mt-8'>
        <PrimaryButton text={'Explore All'} classes={'bg-primary-main'} />
      </div>
    </div>
  );
};

export default PropertyCards;
