import { BsBoxes } from 'react-icons/bs';
import { BsColumnsGap } from 'react-icons/bs';
import { BsHouseGear } from 'react-icons/bs';
import { BsLayersHalf } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { BsXDiamond } from 'react-icons/bs';

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    // behavior: 'smooth',
  });
};

export const getYoutubeVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getYoutubeThumbnailURL = (url) => {
  const videoId = getYoutubeVideoId(url);
  if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  else return `https://placehold.co/600x350`;
};

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

export const categoryOptions = [
  { value: 'apartments', title: 'Apartments' },
  { value: 'landshares', title: 'Landshares' },
];

export const attributions = [
  '<a href="https://www.flaticon.com/free-icons/brands-and-logotypes" title="brands and logotypes icons">Brands and logotypes icons created by Freepik - Flaticon</a>',
];

export function normalizePath(path) {
  return path.replace(/\\/g, '/');
}
