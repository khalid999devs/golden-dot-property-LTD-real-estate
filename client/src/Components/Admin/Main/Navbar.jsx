import { NavLink } from 'react-router-dom';
import { adminLinks } from '../../../Assets/links';

const Navbar = ({ data }) => {
  return (
    <div className='mr-2 h-screen flex items-center justify-center'>
      <div
        className='p-1 py-1 pb-4 bg-onPrimary-main rounded-md sticky left-0'
        style={{ top: '50%', transform: 'translate(0%,-50%)' }}
      >
        <div className='border-b-2 border-b-secondary-main bottom-2 mb-4 p-1'>
          <h2 className='text-center text-2xl uppercase text-primary-light font-bold'>
            {data.userName?.slice(0, 1)}
          </h2>
        </div>
        <nav className='flex flex-col items-center justify-center gap-5 p-1'>
          {adminLinks.map((link, key) => {
            return (
              <NavLink
                key={key}
                to={link.path}
                className={({ isActive, isPending }) => {
                  return `text-2xl transition-all duration-500 cursor-pointer hover:text-primary-light ${
                    isPending ? 'text-primary-main' : ''
                  } ${
                    isActive
                      ? 'text-primary-light scale-110'
                      : 'text-primary-main'
                  } ${
                    window.location.pathname !== '/admin' && link.path == ''
                      ? '!text-primary-main'
                      : ''
                  }`;
                }}
              >
                <link.icon />
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
