import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { BiLogoGmail } from 'react-icons/bi';
import { CgMail } from 'react-icons/cg';

import { FaAddressBook } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { RiMailAddFill } from 'react-icons/ri';
import { GrContact } from 'react-icons/gr';

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

export const adminLinks = [
  {
    name: 'Dashboard',
    path: '',
    icon: MdDashboard,
  },
  {
    name: 'Bookings',
    path: 'bookings',
    icon: FaAddressBook,
  },
  {
    name: 'Properties',
    path: 'properties',
    icon: BsFillBuildingsFill,
  },
  {
    name: 'MAIL & SMS',
    path: 'sms-mail',
    icon: RiMailAddFill,
  },
  {
    name: 'Contacts',
    path: 'contacts',
    icon: GrContact,
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
