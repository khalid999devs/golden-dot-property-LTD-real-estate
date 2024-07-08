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
import reqs from '../Assets/requests';
import { Helmet } from 'react-helmet-async';

const SingleProperty = () => {
  const { propName } = useParams();
  const [propertyData, setPropertyData] = useState({
    id: 1,
    img: '',
    heading: 'Green Valley Basundhara',
    value: 'green-valley-basundhara',
    subText: 'Residential project, Basundhara Riverview',
    category: { value: 'apartments', title: 'Apartments' },
    galleryImgs: [],
    videos: [],
    virtualTourVideo: {
      title: '',
      url: '',
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
      { id: 1, title: 'Typical Level Plan', planImg: '' },
      { id: 2, title: 'Ground Level', planImg: '' },
      { id: 3, title: 'Roof Level', planImg: '' },
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
      mapImg: '',
    },
  });

  useEffect(() => {
    axios
      .get(`${reqs.GET_SINGLE_PROPERTY}/${propName}`)
      .then((res) => {
        if (res.data.succeed) {
          setPropertyData(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((_) => {});
  }, [propName]);

  return (
    <div className='min-h-[100vh]'>
      {/* SEO optimization */}
      <Helmet>
        {/* Open Graph (OG) meta tags */}
        <meta
          property='og:title'
          content={propertyData.heading + ' | Golden Dot Properties LTD.'}
        />
        <meta property='og:description' content={propertyData.subText} />
        <meta property='og:url' content={`/property/${propertyData.value}`} />
        <meta property='og:image' content={propertyData.img} />
        <meta property='og:type' content='website' />

        {/* Twitter meta tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content={propertyData.heading + ' | Golden Dot Properties LTD.'}
        />
        <meta name='twitter:description' content={propertyData.subText} />
        <meta name='twitter:image' content={propertyData.img} />

        {/* page metas */}
        <title>{propertyData.heading + ' | Golden Dot Properties LTD.'}</title>
        <meta name='description' content={propertyData.subText} />
        <link rel='canonical' href={`/property/${propertyData.value}`} />
      </Helmet>

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
        {propertyData.keyPlans?.length > 0 && (
          <Plans keyPlans={propertyData.keyPlans} />
        )}

        {propertyData.galleryImgs?.length > 0 && (
          <Gallery
            galleryImages={propertyData.galleryImgs}
            videos={propertyData.videos}
          />
        )}
        {propertyData.features?.length > 0 && (
          <Features features={propertyData.features} />
        )}
        {(propertyData.location?.texts.length > 0 ||
          propertyData.location?.gMap?.url) && (
          <LocationInfo location={propertyData.location} />
        )}
        <FinalButtons value={propertyData.value} />
      </div>
      <FloatingActionBtn value={propertyData.value} />
    </div>
  );
};

export default SingleProperty;
