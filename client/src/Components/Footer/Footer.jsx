import React, { useState } from 'react';
import { contactInfo, links, socialLinks } from '../../Assets/links';
import { Link } from 'react-router-dom';

import { ContactIconText, IconText } from '../Utils/IconTexts';
import Alert from '../Utils/Alert';
import PrimaryButton from '../Buttons/PrimaryButton';
import { FaFacebook } from 'react-icons/fa';
import ContactForm from '../Contacts/ContactForm';

const Footer = () => {
  const [alert, setAlert] = useState({ text: '', state: false });
  return (
    <>
      <ContactForm />
      <div className='w-full mt-24 md:mt-32 min-h-[200px] bg-onPrimary-main text-white text-opacity-50'>
        <div className='max-w-6xl w-full m-auto py-8 px-4 lg:px-2'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-2'>
            <div>
              <div className='flex gap-4 items-center'>
                <div>
                  <img src='/Images/logo.png' alt='' className='w-[60px]' />
                </div>
                <h2 className='font-bold text-primary-main opacity-80'>
                  GOLDEN DOT <br /> PROPERTIES LTD.
                </h2>
              </div>
              <p className='mt-3 w-[80%]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus
              </p>
            </div>

            {/* quick links */}
            <div className='grid justify-start md:justify-center items-start'>
              <div className='flex justify-start items-start flex-col gap-1 w-fit'>
                <h2 className='mb-2 -mx-0.5 w-fit text-primary-main opacity-80 font-semibold'>
                  Quick Links
                </h2>
                {links.map((link, index) => {
                  return (
                    <Link key={index} to={link.path}>
                      {link.name}
                    </Link>
                  );
                })}
                <Link to={''}>Privacy policy</Link>
              </div>
            </div>

            {/* social icons */}
            <div className='flex md:justify-end items-start'>
              <div className='flex justify-center items-start flex-col gap-1 w-fit'>
                <h2 className='mb-2 -mx-0.5 w-fit text-primary-main opacity-80 font-semibold'>
                  FInd Us
                </h2>
                <div className='flex flex-col w-full gap-0.5 mb-2'>
                  {contactInfo.map((info, index) => {
                    return (
                      <ContactIconText
                        type={info.type}
                        key={index}
                        icon={<info.icon className='text-lg' />}
                        text={info.value}
                        onClick={() => {
                          navigator.clipboard.writeText(info.value);
                          setAlert({
                            text: `${
                              info.type === 'phone'
                                ? 'Phone no.'
                                : info.type === 'email'
                                ? 'Email Address'
                                : info.value
                            } copied to clipboard`,
                            state: true,
                          });
                        }}
                      />
                    );
                  })}
                </div>
                <div>
                  <p>Basundhara Riverview,</p>
                  <p>South Keraniganj,</p>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-8 mt-10 '>
            <div className='flex gap-4 items-center justify-center'>
              {socialLinks.map((item, index) => {
                return (
                  <ContactIconText
                    key={index}
                    icon={
                      <item.icon
                        className={`text-3xl duration-200 opacity-75 hover:scale-105 text-primary-main hover:opacity-100`}
                      />
                    }
                    classes={'gap-0'}
                    type={item.type}
                    link={item.link}
                  />
                );
              })}
            </div>
            <p className='text-sm w-full text-center'>
              &copy;{new Date().getFullYear()} Golden Dot Properties Ltd. All
              rights reserved <br />
              <span className='text-xs opacity-90'>
                Developed with <span className='text-sm'>♥</span> by{' '}
                <a
                  href='https://khalidahammed.com'
                  target='_blank'
                  rel='noreferrer'
                  className='underline'
                >
                  Khalid Ahammed
                </a>
              </span>
            </p>
          </div>
        </div>

        <Alert text={alert.text} state={alert.state} setAlert={setAlert} />
      </div>
    </>
  );
};

export default Footer;
