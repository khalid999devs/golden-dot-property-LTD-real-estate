import { useEffect, useState } from 'react';
import Banner from '../Components/Properties/Banner';
import { Link, useParams } from 'react-router-dom';
import { cardInfos } from '../Assets/contents';
import SingleCard from '../Components/Properties/SingleCard';

const AllProperties = () => {
  const { category } = useParams();
  const [propertyCats, setPropertyCats] = useState([]);

  useEffect(() => {
    setPropertyCats(
      cardInfos.reduce((catArr, item) => {
        if (!catArr.some((cat) => cat.value === item.category.value)) {
          return [...catArr, item.category];
        }
        return catArr;
      }, [])
    );
  }, [cardInfos]);

  const divideBasedOnCategory = (type, cardInfos) => {
    if (type === 'all') {
      return cardInfos;
    } else {
      return cardInfos.filter((item) => item.category.value === type);
    }
  };

  return (
    <div className='min-h-[100vh]'>
      <Banner heading={'All Projects'} />

      <div className='max-w-6xl w-full m-auto p-2 pt-[50px] pb-[40px]'>
        <div className='flex items-center justify-center md:justify-start flex-wrap w-full gap-4 mb-12'>
          <Link
            to={`/properties/all`}
            className={`text-lg text-text-main ${
              category === 'all' ? 'opacity-100 underline' : 'opacity-60'
            }`}
          >
            All
          </Link>
          {propertyCats.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/properties/${item.value}`}
                className={`text-lg text-text-main ${
                  category === item.value
                    ? 'opacity-100 underline'
                    : 'opacity-60'
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
        <div className='flex flex-wrap justify-center md:justify-start lg:flex-nowrap gap-7 sm:gap-4'>
          {divideBasedOnCategory(category, cardInfos).map((card, index) => {
            return (
              <SingleCard
                key={index}
                img={card.img}
                heading={card.heading}
                subText={card.subText}
                value={card.value}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
