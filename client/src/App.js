import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { createContext, useContext } from 'react';
import { Helmet } from 'react-helmet-async';

const AppContext = createContext();

function App() {
  const ogImageUrl = '/Images/og-image.png';
  return (
    <AppContext.Provider value={{}}>
      {/* SEO optimization */}
      <Helmet>
        {/* Open Graph (OG) meta tags */}
        <meta property='og:title' content={'Golden Dot Properties LTD.'} />
        <meta
          property='og:description'
          content='Golden Dot Properties LTD is a trusted Real Estate company where we have both Apartment projects and Landshares available in reasonable price rate in Basundhara Riverview, South Keraniganj, Dhaka area.'
        />
        <meta property='og:url' content={'/'} />
        <meta
          property='og:image'
          content={process.env.PUBLIC_URL + ogImageUrl}
        />
        <meta property='og:type' content='website' />

        {/* Twitter meta tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Golden Dot Properties LTD.' />
        <meta
          name='twitter:description'
          content='Golden Dot Properties LTD is a trusted Real Estate company where we have both Apartment projects and Landshares available in reasonable price rate in Basundhara Riverview, South Keraniganj, Dhaka area.'
        />
        <meta
          name='twitter:image'
          content={process.env.PUBLIC_URL + ogImageUrl}
        />

        <title>Golden Dot Properties LTD.d</title>
        <meta
          name='description'
          content='Golden Dot Properties LTD is a trusted Real Estate company where we have both Apartment projects and Landshares available in reasonable price rate in Basundhara Riverview, South Keraniganj, Dhaka area.'
        />
        <link rel='canonical' href={`/`} />
      </Helmet>
      <div className='bg-primary-light text-text-main'>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
