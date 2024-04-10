import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { BiLogoGmail } from 'react-icons/bi';
import { CgMail } from 'react-icons/cg';

export const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Properties',
    path: '/properties/all',
  },
];

export const socialLinks = [
  {
    name: 'Facebook',
    icon: FaFacebook,
    link: 'https://facebook.com',
  },
  {
    name: 'Youtube',
    icon: FaYoutube,
    link: 'https://youtube.com',
  },
  {
    name: 'Email',
    type: 'email',
    icon: BiLogoGmail,
    link: 'goldendot@gmail.com',
  },
];

export const contactInfo = [
  {
    type: 'phone',
    icon: FiPhone,
    value: '01XXXXXXXXX',
  },
  {
    type: 'email',
    icon: BiLogoGmail,
    value: 'goldendot@gmail.com',
  },
];

export const hotlines = ['01716933161', '01XXXXXXXXX', '01XXXXXXXXX'];
