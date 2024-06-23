import React, { useEffect, useState } from 'react';
import LeftForm from './LeftForm/LeftForm';
import RightForm from './RightForm/RightForm';
import Alert from '../../../Utils/Alert';
import axios from 'axios';
import reqs from '../../../../Assets/requests';

const PropertyForm = ({ data }) => {
  const [rightData, setRightData] = useState({
    img: {},
    galleryImgs: [],
    keyPlans: [],
  });
  const [mode, setMode] = useState('add'); //add||edit

  const [alert, setAlert] = useState({ text: '', type: '', state: false });

  useEffect(() => {
    if (data?.heading && data?.img && !rightData.img?.name) {
      setRightData((rightData) => {
        return {
          ...rightData,
          img: data.img,
          galleryImgs: data.galleryImgs,
          keyPlans: data.keyPlans,
        };
      });
      setMode('edit');
    }
  }, [data]);

  const handleDataReset = () => {
    if (data?.heading) {
      setRightData({
        img: data.img,
        galleryImgs: data.galleryImgs,
        keyPlans: data.keyPlans,
      });
    } else {
      setRightData({ img: {}, galleryImgs: [], keyPlans: [] });
    }
  };

  const handlePropertySubmit = ({
    lData,
    // heading,
    // value,
    // subText,
    // category,
    // projectInfos,
    // features,
    // videos,
    // virtualTourVideo,
    // location
  }) => {
    if (!lData?.heading || !lData?.category) {
      setAlert({
        text: `heading or category must not be empty`,
        type: 'warning',
        state: true,
      });
      return;
    }
    if (!rightData.img) {
      setAlert({
        text: `A Property banner must be provided`,
        type: 'warning',
        state: true,
      });
      return;
    }

    let submitData = { ...lData, ...rightData };
    console.log(submitData);
    delete submitData.value;

    const fd = new FormData();

    let tempVideos = [];
    let tempKeyPlans = [];
    let tempGalleryImgs = [];

    for (let prop in submitData) {
      if (prop === 'img') continue;
      let obj = submitData[prop];
      if (prop === 'keyPlans') {
        tempKeyPlans = obj;
      } else if (prop === 'videos') {
        tempVideos = obj;
      } else if (prop === 'galleryImgs') {
        tempGalleryImgs = obj;
      }

      if (typeof obj === 'object' && obj !== null)
        obj = JSON.stringify(submitData[prop]);
      fd.append(prop, obj);
    }

    fd.append('banner', submitData.img);
    tempGalleryImgs.forEach((item) => {
      fd.append('bigimg', item.url, item.id);
      fd.append('thumbnail', item.thumbnail, item.id);
    });
    fd.append('mapImg', submitData.location.mapImg);
    tempKeyPlans.forEach((item) => {
      fd.append('planImg', item.planImg, item.id);
    });

    axios.post(reqs.ADD_PROPERTY, fd, { withCredentials: true });
  };

  return (
    <div className='flex flex-col-reverse gap-4 lg:grid lg:gap-4 lg:grid-cols-[1.5fr,1fr] max-w-[1320px] w-full m-auto'>
      <LeftForm
        leftData={data}
        handlePropertySubmit={handlePropertySubmit}
        handleDataReset={handleDataReset}
        mode={mode}
      />
      <RightForm
        rightData={rightData}
        setRightData={setRightData}
        mode={mode}
        setAlert={setAlert}
      />
      <Alert
        text={alert.text}
        type={alert.type}
        state={alert.state}
        setAlert={setAlert}
      />
    </div>
  );
};

export default PropertyForm;
