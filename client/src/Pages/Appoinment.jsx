import React, { useEffect, useState } from 'react';
import Banner from '../Components/Properties/Banner';
import ValuedInput from '../Components/Forms/ValuedInput';
import axios from 'axios';
import reqs from '../Assets/requests';
import PrimaryButton from '../Components/Buttons/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../Components/Utils/Alert';
import { emailResExp, mobileResExp } from '../Assets/forms';
import SingleCard from '../Components/Properties/SingleCard';
import Popup from '../Components/Utils/Popup';
import { scrollToTop } from '../Assets/utils';

const Appoinment = () => {
  const { propName } = useParams();
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState({
    text: '',
    state: false,
    type: '',
    loading: false,
  });
  const [propertyData, setPropertyData] = useState({});
  const [clientData, setClientData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    property: {
      heading: '',
      img: '',
      value: '',
      subText: '',
      category: {},
      location: {},
    },
  });

  const [alert, setAlert] = useState({
    text: '',
    state: false,
    type: '',
  });

  const [inputAlert, setInputAlert] = useState({
    email: { msg: '', state: '' },
    phone: { msg: '', state: '' },
  });

  const resetInputAlert = () => {
    setInputAlert({
      email: { msg: '', state: '' },
      phone: { msg: '', state: '' },
    });
  };

  const handleValueChange = (e) => {
    setClientData((clientData) => {
      return { ...clientData, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [window.location.pathname]);

  useEffect(() => {
    axios
      .get(`${reqs.GET_SINGLE_CARD_PROPERTY}/${propName}`)
      .then((res) => {
        if (res.data.succeed) {
          setPropertyData(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [propName]);

  const handleInputAlert = (name, msg, state) => {
    setInputAlert((inputAlert) => {
      return {
        ...inputAlert,
        [name]: { msg, state },
      };
    });
  };

  const handlePopUp = (msg, loading, type, state) => {
    setPopUp({
      text: msg,
      type: type || 'normal',
      state: state || true,
      loading: loading,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    let isErr = false;

    if (!mobileResExp.test(clientData.phone)) {
      isErr = true;
      handleInputAlert('phone', 'Invalid phone number', 'error');
    } else {
      handleInputAlert('phone', '', '');
    }
    if (!emailResExp.test(clientData.email)) {
      isErr = true;
      handleInputAlert('email', 'Invalid email address', 'error');
    } else {
      handleInputAlert('email', '', '');
    }
    if (isErr) {
      setAlert({
        text: 'Please Enter your email id or phone no. correctly',
        state: true,
        type: 'warning',
      });
      return;
    }

    resetInputAlert();
    handlePopUp('Submittiong your info...', true);
    axios
      .post(reqs.BOOK_CLIENT, {
        ...clientData,
        property: { ...propertyData, category: propertyData.category.value },
      })
      .then((res) => {
        if (res.data.succeed) {
          handlePopUp(res.data.msg, false);
        } else {
          handlePopUp(res.data.msg, false, 'error');
        }
      })
      .catch((err) => {
        handlePopUp(err.response.data.msg, false, 'error');
        // console.log(err);
      });
  };

  return (
    <div className='min-h-[100vh]'>
      <Banner heading={'Book Appointment'} img={'/Images/about.jpg'} />
      <div className='mt-4 max-w-[620px] px-3 w-full m-auto pt-[60px] sm:pt-[80px] pb-[60px]'>
        <form
          className='grid sm:grid-cols-[1.2fr,1fr] gap-6 sm:gap-10'
          onSubmit={handleBookingSubmit}
        >
          <div className='grid gap-4'>
            <div className='m-auto mb-4 sm:hidden'>
              <SingleCard
                classes={''}
                img={propertyData.img}
                heading={propertyData.heading}
                subText={propertyData.subText}
                value={propertyData.value}
              />
            </div>
            <ValuedInput
              label={'Your Name'}
              inputProps={{
                onChange: handleValueChange,
                value: clientData.fullName,
                name: 'fullName',
                required: true,
                placeholder: 'Full name',
              }}
            />
            <ValuedInput
              label={'Email'}
              inputProps={{
                onChange: handleValueChange,
                value: clientData.email,
                name: 'email',
                placeholder: 'example@gmail.com',
              }}
              alert={inputAlert.email}
            />
            <ValuedInput
              label={'Phone No.'}
              inputProps={{
                onChange: handleValueChange,
                value: clientData.phone,
                name: 'phone',
                required: true,
                placeholder: '01XXXXXXXXX',
              }}
              alert={inputAlert.phone}
            />
            <ValuedInput
              label={'Address'}
              textArea={true}
              inputProps={{
                onChange: handleValueChange,
                value: clientData.address,
                name: 'address',
                placeholder: 'street no., city, district',
                rows: 2,
              }}
            />
          </div>

          <div className='flex sm:gap-4 justify-between flex-col py-1'>
            <div className='w-full h-min border rounded-lg grid place-items-center'>
              <SingleCard
                classes={'hidden sm:flex sm:!max-h-[280px]'}
                img={propertyData.img}
                heading={propertyData.heading}
                subText={propertyData.subText}
                value={propertyData.value}
              />
            </div>
            <PrimaryButton
              text={'Submit'}
              type={'submit'}
              classes={'bg-onPrimary-main text-primary-main w-full'}
            />
          </div>
        </form>
      </div>

      <Alert
        text={alert.text}
        setAlert={setAlert}
        type={alert.type}
        state={alert.state}
      />

      <Popup
        text={popUp.text}
        type={popUp.type}
        state={popUp.state}
        loading={popUp.loading}
        setPopup={setPopUp}
        onClose={() => {
          navigate(`/property/${propName}`);
        }}
      />
    </div>
  );
};

export default Appoinment;
