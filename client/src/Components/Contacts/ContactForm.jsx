import React from 'react';
import { ContactForm as CForm } from '../Forms/ContactForm';
import { AnimatedHeader } from '../Utils/Headers';

const ContactForm = () => {
  return (
    <div className='pt-[80px] mt-8 max-w-6xl m-auto w-full p-2 px-4 lg:px-2'>
      <div className='timmonsny-regular uppercase text-tertiary-main leading-[60px] mb-2 text-center'>
        <AnimatedHeader text={'connect with us'} />
      </div>
      <div className='flex flex-col md:flex-row gap-8 mt-14'>
        <div className='flex-1'>
          <CForm />
        </div>
        <div className='flex-1 pt-2'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d322.9767390982745!2d90.42972089301466!3d23.673644901992212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9e4ba9bf0bf%3A0x4fb25b0e9552bfed!2zQVBPTkFMT1kg4KaG4Kaq4Kao4Ka-4Kay4Kef!5e0!3m2!1sen!2sbd!4v1712344899884!5m2!1sen!2sbd'
            // src={`https://maps.google.com/maps?q=${53.3387},${-6.261}&z=${15}&output=embed`}
            width='100%'
            height='100%'
            className='min-h-[300px]'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='map'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
