import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SinglePropBanner from '../Components/Properties/SingleProperty/SinglePropBanner';
import axios from 'axios';
import PropertyInfo from '../Components/Properties/SingleProperty/PropertyInfo';
import Plans from '../Components/Properties/SingleProperty/Plans';
import Gallery from '../Components/Properties/SingleProperty/Gallery';
import Features from '../Components/Properties/SingleProperty/Features';
import LocationInfo from '../Components/Properties/SingleProperty/LocationInfo';
import FinalButtons from '../Components/Properties/SingleProperty/FinalButtons';
import FloatingActionBtn from '../Components/Properties/SingleProperty/FloatingActionBtn';

const SingleProperty = () => {
  const { propName } = useParams();
  const [propertyData, setPropertyData] = useState({
    img: '/Images/card1.jpg',
    heading: 'Green Valley Basundhara',
    value: 'green-valley-basundhara',
    subText: 'Residential project, Basundhara Riverview',
    category: { value: 'apartments', title: 'Apartments' },
    galleryImgs: [
      { id: 1, thumbnail: '', title: 'Main Img', url: '' },
      { id: 2, thumbnail: '', title: 'Main Img 1', url: '' },
      { id: 3, thumbnail: '', title: 'Main Img 2', url: '' },
      { id: 4, thumbnail: '', title: 'Main Img 3', url: '' },
      { id: 5, thumbnail: '', title: 'Main Img 4', url: '' },
    ],
    videos: [
      { id: 1, title: 'video1', url: '', thumbnail: '' },
      { id: 2, title: 'video2', url: '', thumbnail: '' },
    ],
    virtualTourVideo: {
      title: '',
      url: 'https://youtu.be/xGppycSuaHY?si=uHnxwq8NNvMefle6',
    },
    projectInfos: [
      {
        title: 'Project Address',
        value: 'Basundhara riverview',
      },
      {
        title: 'Type',
        value: 'Apartment (Residential building)',
      },
      {
        title: 'Land Area',
        value: '5 katha',
      },
      {
        title: 'Est. Total Price ',
        value: '70 lakh',
      },
      {
        title: 'No. of Level/storied ',
        value: 'G+08',
      },
    ],
    keyPlans: [
      { id: 1, title: 'Typical Level Plan', thumbnail: '', original: '' },
      { id: 2, title: 'Ground Level', thumbnail: '', original: '' },
      { id: 3, title: 'Roof Level', thumbnail: '', original: '' },
    ],
    features: [
      {
        id: 1,
        title: 'feature1 heading',
        features: [
          'Feature 1',
          'Feature 2',
          'Feature 3',
          'Feature 4',
          'Feature 5',
          'Feature 6',
          'Feature 7',
        ],
      },
      {
        id: 2,
        title: 'feature2 heading',
        features: [
          'Feature 1',
          'Feature 2',
          'Feature 3',
          'Feature 4',
          'Feature 5',
          'Feature 6',
          'Feature 7',
        ],
      },
      {
        id: 2,
        title: 'feature2 heading',
        features: [
          'Feature 1',
          'Feature 2',
          'Feature 3',
          'Feature 4',
          'Feature 5',
          'Feature 6',
          'Feature 7',
        ],
      },
    ],
    location: {
      texts: [
        'Basundhara Riverview, South Keraniganj, Dhaka',
        'Near Mahanagar Super Market',
      ],
      gMap: {
        state: true,
        infos: {
          lat: 61.2176,
          lng: -149.8997,
        },
        url: '',
      },
    },
  });

  useEffect(() => {
    axios
      .get('')
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally((_) => {
        // setPropertyData(
        //   {
        //   img: '/Images/card1.jpg',
        //   heading: 'Green Valley Basundhara',
        //   value: 'green-valley-basundhara',
        //   subText: 'Residential project, Basundhara Riverview',
        //   category: { value: 'apartments', title: 'Apartments' },
        //   galleryImgs: [
        //     { id: 1, thumbnail: '', title: 'Main Img', url: '' },
        //     { id: 2, thumbnail: '', title: 'Main Img 1', url: '' },
        //     { id: 3, thumbnail: '', title: 'Main Img 2', url: '' },
        //     { id: 4, thumbnail: '', title: 'Main Img 2', url: '' },
        //     { id: 5, thumbnail: '', title: 'Main Img 2', url: '' },
        //   ],
        //   videos: [
        //     { id: 1, title: 'video1', url: '' },
        //     { id: 2, title: 'video1', url: '' },
        //   ],
        //   virtualTourVideo: {
        //     title: '',
        //     url: '',
        //   },
        //   projectInfos: [
        //     {
        //       title: 'Project Address',
        //       value: 'Basundhara riverview',
        //     },
        //     {
        //       title: 'Type',
        //       value: 'Apartment (Residential building)',
        //     },
        //     {
        //       title: 'Land Area',
        //       value: '5 katha',
        //     },
        //     {
        //       title: 'Est. Total Price ',
        //       value: '70 lakh',
        //     },
        //     {
        //       title: 'No. of Level/storied ',
        //       value: 'G+08',
        //     },
        //   ],
        //   keyPlans: [
        //     { id: 1, title: 'Typical Level Plan', thumbnail: '', original: '' },
        //     { id: 2, title: 'Ground Level', thumbnail: '', original: '' },
        //     { id: 3, title: 'Roof Level', thumbnail: '', original: '' },
        //   ],
        //   features: [
        //     {
        //       id: 1,
        //       title: 'feature1',
        //     },
        //     {
        //       id: 2,
        //       title: 'feature2',
        //     },
        //     {
        //       id: 3,
        //       title: 'feature3',
        //     },
        //     {
        //       id: 4,
        //       title: 'feature4',
        //     },
        //   ],
        //   location: {
        //     texts:
        //       '1000-1001 No. Plot, Basundhara Riverview, South Keraniganj, Dhaka',
        //     gMap: {
        //       state: true,
        //       infos: {
        //         lat: 61.2176,
        //         lng: -149.8997,
        //       },
        //     },
        //   },
        // });
      });
  }, [propName]);

  return (
    <div className='min-h-[100vh]'>
      <SinglePropBanner
        img={propertyData.img}
        virtualTourVideo={propertyData.virtualTourVideo}
        galleryImages={propertyData.galleryImgs}
      />
      <div className='max-w-6xl m-auto px-2 md:px-0 py-8 pt-[60px] grid gap-12'>
        <PropertyInfo
          heading={propertyData.heading}
          projectInfos={propertyData.projectInfos}
        />
      </div>
      <div className='mt-8'>
        <Plans keyPlans={propertyData.keyPlans} />
        <Gallery
          galleryImages={propertyData.galleryImgs}
          videos={propertyData.videos}
        />
        <Features features={propertyData.features} />
        <LocationInfo location={propertyData.location} />
        <FinalButtons />
      </div>
      <FloatingActionBtn value={propertyData.value} />
    </div>
  );
};

export default SingleProperty;
