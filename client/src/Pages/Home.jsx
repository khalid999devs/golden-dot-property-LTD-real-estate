import React from 'react';
import Hero from './../Components/Home/Hero';
import Info from './../Components/Home/Info';
import PropertyCards from './../Components/Home/PropertyCards';
import WorkProcedure from './../Components/Home/WorkProcedure';
import ContactForm from './../Components/Contacts/ContactForm';

const Home = () => {
  return (
    <div className='min-h-[100vh]'>
      <Hero />
      <div className='max-w-6xl w-full m-auto px-2 flex flex-col gap-10'>
        <Info />
        <PropertyCards />
      </div>
      <WorkProcedure />
    </div>
  );
};

export default Home;
