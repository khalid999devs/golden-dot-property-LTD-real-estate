import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import reqs from '../../Assets/requests';
import Loading from '../../Assets/Components/Loading';
import Navbar from '../../Components/Admin/Main/Navbar';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
  });
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(reqs.IS_ADMIN_VALID, { withCredentials: true }).then((res) => {
      if (res.data.succeed) {
        setData({ username: res.data.username });
        setLoading(false);
        setFetched(true);
      } else {
        redirect('/admin-login');
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      {!loading && fetched ? (
        <Outlet />
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Admin;
