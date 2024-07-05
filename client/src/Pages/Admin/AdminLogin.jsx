import { useState } from 'react';
import ValuedInput from '../../Components/Forms/ValuedInput';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import axios from 'axios';
import reqs from '../../Assets/requests';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    state: '',
    msg: '',
  });
  const [data, setData] = useState({
    userName: '',
    password: '',
  });
  const [show, setShow] = useState(false);
  const onShowClick = () => {
    setShow(!show);
  };

  const handleValChange = (e) => {
    setData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.userName && data.password) {
      axios
        .post(reqs.ADMIN_LOGIN, data, { withCredentials: true })
        .then((res) => {
          if (res.data.succeed) {
            navigate('/admin', { replace: true });
          } else {
            setAlert({
              state: 'error',
              msg: res.data.msg,
            });
          }
        })
        .catch((err) => {
          setAlert({
            state: 'error',
            msg: err.response.data.msg,
          });
        });
    } else {
      setAlert({
        state: 'warning',
        msg: 'username or password must not be empty!',
      });
    }
  };

  return (
    <div className='w-full min-h-screen p-8 flex items-center justify-center flex-col'>
      <div className='max-w-[350px] w-full m-auto p-2 -translate-y-5'>
        <h1 className='text-lg uppercase text-center mb-5 text-onPrimary-main'>
          Admin Login
        </h1>
        <div>
          <form className='grid px-1 gap-3' onSubmit={handleSubmit}>
            <ValuedInput
              alert={alert}
              type={'text'}
              inputProps={{
                value: data.userName,
                onChange: handleValChange,
                name: 'userName',
                required: true,
                placeholder: 'username',
              }}
            />
            <ValuedInput
              alert={alert}
              show={show}
              onShowClick={onShowClick}
              type={show ? 'text' : 'password'}
              inputProps={{
                value: data.password,
                onChange: handleValChange,
                name: 'password',
                required: true,
                placeholder: 'password',
              }}
            />
            <PrimaryButton
              type={'submit'}
              text={'Submit'}
              classes={'mt-2 bg-onPrimary-main text-primary-main'}
              textClasses={'text-pimary-main'}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
