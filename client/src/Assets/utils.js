import { BsBoxes } from 'react-icons/bs';
import { BsColumnsGap } from 'react-icons/bs';
import { BsHouseGear } from 'react-icons/bs';
import { BsLayersHalf } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { BsXDiamond } from 'react-icons/bs';

export const featureIcons = [
  BsBoxes,
  BsColumnsGap,
  BsHouseGear,
  BsLayersHalf,
  BsListCheck,
  BsReverseLayoutTextSidebarReverse,
  BsXDiamond,
];

export const getRandFeatureIcons = () => {
  const length = featureIcons.length;
  const RandomIcon = featureIcons[Math.floor(Math.random() * length)];

  return <RandomIcon />;
};

export const rowsOptions = [
  { title: 20, value: 20 },
  { title: 50, value: 50 },
  { title: 100, value: 100 },
];
