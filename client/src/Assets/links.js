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

export const hotlines = ['01755-500582', '01771-470882'];
// export const navPhones = ['017550-500582', '01771-470882'];

export const officeIframe =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.3415837171231!2d90.43783233789148!3d23.695070964025387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9c3a5b9bd23%3A0x79e4f56da84f9cc9!2sToah%20International.!5e0!3m2!1sen!2sbd!4v1718637845513!5m2!1sen!2sbd';
