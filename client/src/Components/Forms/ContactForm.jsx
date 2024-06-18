import React, { useState } from 'react';
import ValuedInput from './ValuedInput';
import PrimaryButton from './../Buttons/PrimaryButton';
import Popup from '../Utils/Popup';
import axios from 'axios';
import reqs from '../../Assets/requests';

const ContactForm = () => {
  const [contactVals, setContactVals] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const [popUp, setPopUp] = useState({
    text: '',
    state: false,
    type: '',
    loading: false,
  });

  const handlePopUp = (msg, loading, type, state) => {
    setPopUp({
      text: msg,
      type: type || 'normal',
      state: state || true,
      loading: loading,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    handlePopUp('Submittiong your info...', true);
    axios
      .post(reqs.SEND_MESSAGE_FROM_CLIENT, { ...contactVals })
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

  const handleValChange = (e) => {
    setContactVals((prevVals) => {
      return { ...prevVals, [e.target.name]: e.target.value };
    });
  };

  return (
    <form onSubmit={handleContactSubmit}>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-x-6 lg:gap-y-4 py-2'>
        <ValuedInput
          label={'Name*'}
          inputProps={{
            value: contactVals.name,
            onChange: handleValChange,
            name: 'name',
            required: true,
            placeholder: 'Your Name',
          }}
        />
        <ValuedInput
          label={'Email'}
          inputProps={{
            value: contactVals.email,
            onChange: handleValChange,
            name: 'email',
            placeholder: 'Email address',
          }}
        />
        <ValuedInput
          label={'Phone no.*'}
          inputProps={{
            value: contactVals.phone,
            onChange: handleValChange,
            name: 'phone',
            required: true,
            placeholder: '01XXXXXXXXX',
          }}
        />
        <ValuedInput
          label={'Address'}
          inputProps={{
            value: contactVals.address,
            onChange: handleValChange,
            name: 'address',
            placeholder: 'Your address(optional)',
          }}
        />
      </div>
      <div className='mt-2'>
        <ValuedInput
          label={'Message*'}
          textArea={true}
          inputProps={{
            value: contactVals.message,
            onChange: handleValChange,
            name: 'message',
            rows: 6,
            required: true,
            placeholder: 'Type your message here...',
          }}
        />
      </div>
      <div>
        <PrimaryButton
          text={'submit'}
          type={'submit'}
          classes={`bg-secondary-main w-full mt-4`}
          textClasses={`text-center w-full`}
        />
      </div>

      <Popup
        text={popUp.text}
        type={popUp.type}
        state={popUp.state}
        loading={popUp.loading}
        setPopup={setPopUp}
      />
    </form>
  );
};

export { ContactForm };
