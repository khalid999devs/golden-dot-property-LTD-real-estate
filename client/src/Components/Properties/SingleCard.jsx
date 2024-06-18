import { useNavigate } from 'react-router-dom';
import { reqFileWrapper } from '../../Assets/requests';

const SingleCard = ({ img, heading, subText, value, classes }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        'min-w-[260px] max-w-[320px] sm:max-w-[300px] w-full h-[380px] relative group cursor-pointer ' +
        classes
      }
      onClick={() => {
        navigate(`/property/${value}`);
      }}
    >
      <div className='w-full h-full img-sec overflow-hidden'>
        <img
          src={reqFileWrapper(img) || './Images/card1.jpg'}
          alt={heading}
          className='w-full scale-105 group-hover:scale-110 group-hover:grayscale-[0] h-full object-cover transition-all duration-1000 grayscale-[40%]'
        />
      </div>
      <div className='absolute bottom-0 left-0 w-full max-h-[40%] duration-700 bg-secondary-main bg-opacity-90 group-hover:bg-opacity-100 text-text-main p-2 py-3 text-center'>
        <h2 className='font-bold text-md'>
          {heading || 'GreenValley Basundhara'}
        </h2>
        <p className='text-sm opacity-90'>
          {subText || 'Residential project, Riverview'}
        </p>
      </div>
    </div>
  );
};

export default SingleCard;
