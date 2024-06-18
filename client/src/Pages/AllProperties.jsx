import { useEffect, useState } from 'react';
import Banner from '../Components/Properties/Banner';
import { Link, useParams } from 'react-router-dom';
import SingleCard from '../Components/Properties/SingleCard';
import axios from 'axios';
import reqs from '../Assets/requests';
import { scrollToTop } from '../Assets/utils';

const AllProperties = () => {
  const { category } = useParams();
  const [propertyCats, setPropertyCats] = useState([]);
  const [cardInfos, setCardInfos] = useState([]);

  const managePropCategories = (data) => {
    setPropertyCats(
      data.reduce((catArr, item) => {
        if (!catArr.some((cat) => cat.value === item.category.value)) {
          return [...catArr, item.category];
        }
        return catArr;
      }, [])
    );
  };

  useEffect(() => {
    if (category === 'all') scrollToTop();
  }, [category]);

  useEffect(() => {
    axios
      .get(reqs.GET_ALL_PROPERTY)
      .then((res) => {
        if (res.data.succeed) {
          managePropCategories(res.data.result);
          setCardInfos(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const divideBasedOnCategory = (type, cardInfos) => {
    if (type === 'all') {
      return cardInfos;
    } else {
      return cardInfos.filter((item) => item.category.value === type);
    }
  };

  const cards = divideBasedOnCategory(category, cardInfos);

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
        {cards.length > 0 ? (
          <div className='flex flex-wrap justify-center md:justify-start lg:flex-nowrap gap-7 sm:gap-4'>
            {cards.map((card, index) => {
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
        ) : (
          <div className='h-[200px] sm:h-[250px] grid place-items-center'>
            <h2 className='text-xl text-tertiary-main font-bold opacity-75'>
              {category !== 'all'
                ? `No Property available for this category`
                : `No property available right now`}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
