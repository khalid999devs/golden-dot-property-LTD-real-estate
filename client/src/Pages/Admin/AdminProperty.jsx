import { useEffect, useState } from 'react';
import AddPropertyCard from '../../Components/Admin/Property/AddPropertyCard';
import axios from 'axios';
import SingleCard from '../../Components/Properties/SingleCard';
import reqs from '../../Assets/requests';
import { useNavigate } from 'react-router-dom';

const AdminProperty = () => {
  const navigate = useNavigate();
  const [cardInfos, setCardInfos] = useState([]);

  useEffect(() => {
    axios
      .get(reqs.GET_ALL_PROPERTY)
      .then((res) => {
        if (res.data.succeed) {
          setCardInfos(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='min-h-screen py-2 pt-4 w-full'>
      <div className='py-2 mb-4'>
        <h1 className='text-3xl  text-tertiary-main '>All Properties</h1>
      </div>
      <div className='flex flex-row flex-wrap gap-4 '>
        <AddPropertyCard />
        {cardInfos.map((item, key) => {
          return (
            <SingleCard
              classes={'!max-h-[280px] !max-w-[200px]'}
              key={key}
              img={item.img}
              value={item.value}
              heading={item.heading}
              subText={item.subText}
              onClick={() => {
                navigate(`/admin/properties/${item.value}/edit`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminProperty;
