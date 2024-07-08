import React from 'react';
import Banner from '../Components/Properties/Banner';
import { AnimatedHeader, SubHeaders } from '../Components/Utils/Headers';
import PersonCard from '../Components/About/PersonCard';
import { aboutCards } from '../Assets/contents';

const About = () => {
  return (
    <div className='min-h-[100vh]'>
      <Banner heading={'About Us'} img={'/Images/about.jpg'} />
      <div className='max-w-6xl m-auto py-[80px] px-2'>
        <div className='text-center'>
          <AnimatedHeader
            text={'Mission of Golden Dot Properties Ltd'}
            classes={'!text-[28px] max-w-[400px] w-full m-auto'}
          />
        </div>
        <div className='text-center max-w-[550px] mt-10 w-full m-auto'>
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
          <SubHeaders classes={'normal-case'} text={'Board of Directors'} />
        </div>

        <div className='w-fit m-auto grid sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-10 items-center justify-center'>
          {aboutCards.map((item, key) => (
            <PersonCard
              key={key}
              pic={item.pic}
              name={item.name}
              designation={item.designation}
              otherInfos={item.otherInfos}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
