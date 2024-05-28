import React from 'react';
import Banner from '../Components/Properties/Banner';
import { AnimatedHeader, SubHeaders } from '../Components/Utils/Headers';
import PersonCard from '../Components/About/PersonCard';

const About = () => {
  return (
    <div className='min-h-[100vh]'>
      <Banner heading={'About Us'} img={'/Images/about.jpg'} />
      <div className='max-w-6xl m-auto py-[80px] px-2'>
        <div className='text-center'>
          <AnimatedHeader
            text={'Mission of Golden Dot Properties Ltd'}
            classes={'text-[25px] max-w-[400px] w-full m-auto'}
          />
        </div>
        <div className='text-center max-w-[500px] mt-10 w-full m-auto'>
          <p className='text-center'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            non, commodi consequatur eligendi nostrum earum et minima rerum odio
            error vero consequuntur doloribus numquam, minus quasi culpa impedit
            quo nobis, optio reiciendis? Culpa, tempore cumque vero autem
            dignissimos eos. Qui sed recusandae, quis magnam at eius asperiores
            error maxime dolores, provident nulla iste commodi iure? Rem tenetur
            incidunt tempore, iure porro, eius ullam saepe, consectetur placeat
            error ipsam veniam autem delectus corporis.
          </p>
        </div>
      </div>
      <div className='py-16 bg-secondary-main'>
        <div className='mb-8 text-center'>
          <SubHeaders text={'Board of Directors'} />
        </div>

        <div className='max-w-6xl m-auto flex flex-col sm:flex-row flex-wrap md:flex-nowrap gap-12 sm:gap-10 items-center justify-center'>
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </div>
      </div>
    </div>
  );
};

export default About;
