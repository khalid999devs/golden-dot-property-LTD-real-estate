import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import reqs from '../../Assets/requests';
import Loading from '../../Assets/Components/Loading';
import Navbar from '../../Components/Admin/Main/Navbar';
import './admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: '',
  });
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(reqs.IS_ADMIN_VALID, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          setData({ userName: res.data.result.userName });
          setLoading(false);
          setFetched(true);
        } else {
          setLoading(false);
          navigate('/admin-login', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/admin-login', { replace: true });
      });
  }, []);

  return (
    <div className='grid grid-cols-[auto,1fr] gap-1'>
      <Navbar data={data} />
      <div className='overflow-auto p-2'>
        {!loading && fetched ? (
          <Outlet />
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;