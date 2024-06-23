import { Icontext } from '../../Components/Utils/IconTexts';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import PropertyForm from '../../Components/Admin/Property/PropertyForm/PropertyForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import reqs from '../../Assets/requests';

const AdSingleProperty = () => {
  const navigate = useNavigate();
  const { propVal } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${reqs.GET_SINGLE_PROPERTY}/${propVal}`)
      .then((res) => {
        if (res.data.succeed) {
          setData(res.data.result);
        } else {
          alert('Some error happened fetching ' + propVal + ' data');
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }, []);

  return (
    <div className='py-2 pb-[60px] min-h-screen w-full'>
      <div className='py-2 mb-3'>
        <Icontext
          onClick={() => {
            navigate('/admin/properties');
          }}
          text={'Back to property listing'}
          icon={
            <MdKeyboardBackspace className='text-lg opacity-70 group-hover:opacity-85' />
          }
          textClasses={
            'text-onPrimary-main opacity-60 duration-300 group-hover:opacity-85'
          }
          classes={'text-sm mb-1.5 group cursor-pointer'}
        />
        <h1 className='text-3xl  text-tertiary-main '>
          {data.heading || propVal}
        </h1>
      </div>
      {data.heading && <PropertyForm data={data} />}
    </div>
  );
};

export default AdSingleProperty;
