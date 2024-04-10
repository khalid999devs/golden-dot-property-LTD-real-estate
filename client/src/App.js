import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { createContext, useContext } from 'react';

const AppContext = createContext();

function App() {
  return (
    <AppContext.Provider value={{}}>
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
