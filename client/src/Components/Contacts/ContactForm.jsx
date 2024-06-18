import { officeIframe } from '../../Assets/links';
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
            src={officeIframe}
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
