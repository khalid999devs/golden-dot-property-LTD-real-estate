import { hotlines, links } from '../../Assets/links';
import { RxHamburgerMenu } from 'react-icons/rx';
import PrimaryButton from '../Buttons/PrimaryButton';
import { Link, NavLink } from 'react-router-dom';
import MobileNav from './MobileNav';
import { useEffect, useState } from 'react';
import { FaPhone } from 'react-icons/fa';

const Navbar = () => {
  const [isMobOpen, setIsMobOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [onTop, setOnTop] = useState(true);

  const setNavState = (e) => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - prevScrollY;
    setPrevScrollY(currentScrollY);
    if (currentScrollY > 50) {
      setShowNavbar(diff >= 0 ? false : true);
      setOnTop(false);
    } else if (currentScrollY <= 50) {
      if (!onTop) {
        setOnTop(true);
      }
      if (showNavbar) {
        setShowNavbar(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setNavState);

    return () => {
      window.removeEventListener('scroll', setNavState);
    };
  }, [prevScrollY]);

  return (
    <div
      className={`w-full z-50 h-auto  px-3 md:px-[4] transition-all duration-500 bg-opacity-80 fixed top-0 left-0  ${
        showNavbar
          ? '!bg-secondary-main shadow-md  translate-y-0'
          : onTop
          ? 'bg-transparent translate-y-0'
          : 'bg-transparent translate-y-[-100%]'
      }`}
    >
      <div
        id='navbar'
        className='flex flex-row gap-2 sm:gap-4 m-auto max-w-6xl w-[100%] items-center justify-around '
      >
        {/* logo */}
        <Link to={'/'}>
          <div className='pr-0 md:pr-7 py-1'>
            <img
              src='/Images/logo.png'
              alt=''
              className='w-[150px] sm:w-[80px]'
            />
          </div>
        </Link>
        {/* main nav */}
        <div className='flex flex-row justify-center items-center md:justify-center w-full '>
          {/* menus */}
          <div className='hidden md:flex flex-row gap-5 px-4 items-center py-5 '>
            {links.map((item, value) => {
              return (
                <NavLink
                  key={value}
                  to={item.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'text-md transition-colors text-orange-500'
                      : isActive
                      ? 'text-md transition-colors text-primary-main'
                      : `text-md transition-colors hover:text-secondary-dark duration-200 ${
                          !showNavbar && 'text-primary-light'
                        }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <div
            className={`hidden md:flex py-1 flex-col ${
              showNavbar ? 'hidden' : '!text-primary-light'
            }`}
          >
            {hotlines.map((number, key) => (
              <p
                key={key}
                onClick={() => {
                  navigator.clipboard.writeText(number);
                }}
                className='cursor-pointer inline-block whitespace-nowrap'
              >
                {`${number}`}
              </p>
            ))}
          </div>

          <div className='py-3 md:hidden flex gap-4'>
            <PrimaryButton
              icon={
                <FaPhone
                  fontSize={'1.4rem'}
                  className={!showNavbar && 'text-primary-main opacity-80'}
                />
              }
              text={'Hotline'}
              textClasses={!showNavbar && 'text-primary-main'}
              classes={`${
                showNavbar && 'border border-text-main'
              } rounded-full px-2 py-2`}
              onClick={() => {
                window.open(`tel:${hotlines[0]}`, '_blank');
              }}
            />
            <PrimaryButton
              icon={
                <RxHamburgerMenu
                  fontSize={'1.4rem'}
                  className={!showNavbar && 'text-primary-main'}
                />
              }
              textClasses={!showNavbar && 'text-primary-main'}
              classes={`${
                showNavbar && 'border border-text-main'
              } rounded-full px-2 py-2`}
              onClick={() => {
                setIsMobOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      <MobileNav setIsMobOpen={setIsMobOpen} isMobOpen={isMobOpen} />
    </div>
  );
};

export default Navbar;
