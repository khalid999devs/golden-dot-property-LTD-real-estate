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
          Golden Dot Properties LTD is a trusted real estate company dedicated
          to offering high-quality residential options at competitive prices.
          Our portfolio includes a range of apartment projects and land shares,
          all situated in the desirable Basundhara Riverview and South
          Keraniganj areas of Dhaka. With a commitment to excellence and
          customer satisfaction, we provide affordable solutions for individuals
          and families looking to invest in their dream homes.
        </p>
      </div>
    </div>
  );
};

export default Info;
