import React, { useEffect, useRef } from 'react';
import { BsBuildings } from 'react-icons/bs';
import { PiStarThin } from 'react-icons/pi';
import { BsBoxArrowInDown } from 'react-icons/bs';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { BsClipboard2Check } from 'react-icons/bs';
import { PiHandshakeLight } from 'react-icons/pi';
import gsap from 'gsap';

const chooseArr = [
  {
    heading: 'BUILD YOUR DREAM',
    text: '100% Client Satisfaction',
    icon: <BsBuildings />,
  },
  {
    heading: 'BEST APARTMENTS',
    text: 'Fulfill All Your Needs',
    icon: <PiStarThin />,
  },
  {
    heading: 'REASONABLE PRICE',
    text: 'Price Within Your Expectations',
    icon: <BsBoxArrowInDown />,
  },
  {
    heading: 'SAFE & TRUSTWORTHY',
    text: 'Reliable Technologies Used',
    icon: <AiOutlineSafetyCertificate />,
  },
  {
    heading: 'QUALITY CONSTRUCTION',
    text: 'Following All The Building Codes',
    icon: <BsClipboard2Check />,
  },
  {
    heading: 'ON-TIME HANDOVER',
    text: 'Very Strict With Time Management',
    icon: <PiHandshakeLight />,
  },
];

const SingleSteps = ({ heading, text, icon, imgUrl, classes }) => {
  return (
    <div
      className={
        'scale-60 opacity-55 p-3 py-3 bg-secondary-main relative rounded-md flex flex-col justify-between gap-3 md:gap-4 min-h-[110px] lg:min-h-[120px] ' +
        classes
      }
    >
      <h1 className='w-95% pr-4 text-tertiary-main text-sm md:text-lg lg:text-xl xl:text-2xl lato-regular uppercase !font-bold'>
        {heading || 'card heading'}
      </h1>
      <div className='text-left flex flex-row gap-1 justify-between items-center'>
        <p
          className='pp-regular text-text-main text-xs md:text-[1rem] lg:text-lg'
          style={{ lineHeight: '1.5rem' }}
        >
          {text || 'Choose card Content text'}
        </p>
        <div className='text-[45px] text-text-main'>
          {icon || (
            <img
              src={imgUrl}
              alt=''
              className='w-[30px] md:w-[60px] object-cover'
            ></img>
          )}
        </div>
      </div>
      {/* <img
        src={iconImg}
        alt=''
        className='w-[30px] md:w-[60px] absolute right-0 bottom-0 object-cover max-h-[40px] '
      /> */}
    </div>
  );
};

const WorkProcedure = () => {
  const containerSec = useRef(null);
  const overlay = useRef(null);
  const contentHead = useRef(null);
  const contentsContainer = useRef(null);

  useEffect(() => {
    const mainContainer = containerSec.current;
    const contents = gsap.utils.toArray('.proc-content');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer,
        pin: true,
        scrub: true,
        start: 'top top',
        end: '+=' + mainContainer.offsetHeight * 1.5,
      },
    });
    tl.to(
      mainContainer,
      {
        scale: 1.01,
        height: '100%',
        width: '100%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      0
    );
    tl.to(
      overlay.current,
      {
        opacity: 0.6,
      },
      0
    );
    tl.to(
      contentHead.current,
      {
        opacity: 1,
      },
      0
    );
    tl.fromTo(
      contentsContainer.current,
      {
        y: 100,
      },
      {
        y: 0,
        display: 'grid',
        opacity: 1,
      },
      1
    );
    tl.to(contents, {
      stagger: 0.2,
      opacity: 0.95,
      scale: 1,
    });

    return () => {
      tl?.current?.kill();
    };
  }, [containerSec, overlay, contentHead, contentsContainer]);

  return (
    <section
      ref={containerSec}
      className='w-full m-auto min-h-[100vh] h-full relative overflow-hidden py-4 mt-8 flex items-center justify-center'
      style={{
        clipPath: 'polygon(5% 10%, 95% 10%, 95% 90%, 5% 90%)',
      }}
    >
      <div
        className='absolute inset-0 z-[2] bg-black opacity-30'
        ref={overlay}
      ></div>
      <div className='max-w-6xl m-auto z-10 relative pt-[60px] flex flex-col gap-2 translate-y-[-100px]'>
        <div className='text-center'>
          <h2
            className='inline timmonsny-regular !font-bold text-[35px] sm:text-[50px] md:text-[60px] text-primary-main uppercase opacity-0 transition-all duration-500'
            style={{
              letterSpacing: '3px',
            }}
            ref={contentHead}
          >
            Why Choose Us
          </h2>
        </div>
        <div
          className='hidden opacity-0 grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-8 w-[90%] xl:w-[98%] mx-auto'
          ref={contentsContainer}
        >
          {chooseArr.map((card, index) => {
            return (
              <SingleSteps
                key={index}
                heading={card.heading}
                text={card.text}
                icon={card.icon}
                classes={'proc-content'}
              />
            );
          })}
        </div>
      </div>
      {/* <div className='w-full h-full overflow-hidden'> */}
      <img
        src='./Images/choose.jpg'
        alt=''
        className='absolute inset-0 object-cover h-full w-full'
      />
      {/* </div> */}
    </section>
  );
};

export default WorkProcedure;
