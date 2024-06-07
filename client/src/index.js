import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import AllProperties from './Pages/AllProperties';
import SingleProperty from './Pages/SingleProperty';
import Appoinment from './Pages/Appoinment';
import About from './Pages/About';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LenisGSAP from './LenisGSAP';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AdminLogin from './Pages/Admin/AdminLogin';
import Admin from './Pages/Admin/Admin';
import Dashboard from './Pages/Admin/Dashboard';
import Bookings from './Pages/Admin/Bookings.jsx';
import ContactMsg from './Pages/Admin/ContactMsg.jsx';
import AdminProperty from './Pages/Admin/AdminProperty.jsx';
import AdminSmsMail from './Pages/Admin/AdminSmsMail.jsx';
import AdSingleProperty from './Pages/Admin/AdSingleProperty.jsx';

import './axios/global.js';

gsap.registerPlugin(ScrollTrigger);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'properties/:category',
        element: <AllProperties />,
      },
      {
        path: 'property/:propName',
        element: <SingleProperty />,
      },
      {
        path: 'appointment/:propName',
        element: <Appoinment />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/admin-login',
    element: <AdminLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'bookings',
        element: <Bookings />,
      },
      {
        path: 'properties',
        element: <AdminProperty />,
      },
      {
        path: 'properties/:id',
        element: <AdSingleProperty />,
      },
      {
        path: 'sms-mail',
        element: <AdminSmsMail />,
      },
      {
        path: 'contacts',
        element: <ContactMsg />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LenisGSAP>
    <RouterProvider router={router} />
  </LenisGSAP>
);
