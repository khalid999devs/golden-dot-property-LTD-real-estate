import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Slider from 'react-slick';
import { LeftArrowButton, RightArrowButton } from '../../Utils/ArrowButtons';
import { ImageItem, VideoItem } from './GalleryItems';

const Gallery = ({ galleryImages, videos }) => {
  const sectionH = useRef();
  const sliderRef = useRef();
  const [isOverflowing, setIsOverflowing] = useState(true);
  const timeline = useRef();
  const [wInnerWidth, setwInnerWidth] = useState(window.innerWidth);

  const setInnerWidth = () => {
    setwInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', setInnerWidth);
    return () => {
      window.removeEventListener('resize', setInnerWidth);
    };
  }, []);

  useEffect(() => {
    const sec_container = sectionH.current;
    const gallery_items = gsap.utils.toArray('.gallery-item');

    if (sec_container && gallery_items.length > 0) {
      // const totalWidth = gallery_items.reduce(
      //   (acc, curr) => acc + curr.offsetWidth,
      //   0
      // );
      const totalWidth =
        (galleryImages.length + videos.length) * gallery_items[0].offsetWidth;
      setIsOverflowing(totalWidth > sec_container.offsetWidth);

      if (totalWidth > sec_container.offsetWidth) {
        timeline.current = gsap.timeline();
        timeline.current.to(gallery_items, {
          xPercent: -30 * (gallery_items.length - 1),
          ease: 'sine.out',
          scrollTrigger: {
            trigger: sec_container,
            scrub: 3,
            start: 'top top+=60%',
            end: '+=' + sec_container.offsetWidth,
          },
        });
        return () => {
          timeline?.current?.kill();
        };
      } else {
        // gsap.to(gallery_items, { margin: 'auto' });
      }
    }
  }, [sectionH, galleryImages, wInnerWidth, videos]);

  const slickSettings = {
    swipeToSlide: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div ref={sectionH} className='horizontal w-full overflow-hidden'>
      <div className='container-gallery !w-full'>
        {isOverflowing ? (
          <div className='flex items-center w-full relative'>
            <LeftArrowButton onClick={handlePrevious} />
            <Slider
              {...slickSettings}
              className='gallery-content'
              ref={sliderRef}
            >
              {galleryImages.map((item, index) => {
                return <ImageItem item={item} key={index} />;
              })}
              {videos.map((item, index) => {
                return <VideoItem item={item} key={index} />;
              })}
            </Slider>
            <RightArrowButton onClick={handleNext} />
          </div>
        ) : (
          <div className='grid grid-flow-col justify-center items-center m-auto gap-4 py-10'>
            {galleryImages.map((item, index) => {
              return <ImageItem item={item} key={index} />;
            })}
            {videos.map((item, index) => {
              return <VideoItem item={item} key={index} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
