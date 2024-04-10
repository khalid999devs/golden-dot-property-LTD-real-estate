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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LenisGSAP>
    <RouterProvider router={router} />
  </LenisGSAP>
);
