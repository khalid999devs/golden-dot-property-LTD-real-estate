import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Hero.css';
import { imageContent, sliderContent } from '../../Assets/contents';
import { gsap } from 'gsap';
import PrimaryButton from '../Buttons/PrimaryButton';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let currentImageIndex = 2;
    let currentContentIndex = 1;
    const totalImages = 9;
    let isAnimating = false;

    function splitTextIntoSpans(selector) {
      let elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        let text = element.innerText;
        let splitText = text
          .split('')
          .map((char) => {
            return `<span>${char === ' ' ? '&nbsp;&nbsp;' : char}</span>`;
          })
          .join('');
        element.innerHTML = splitText;
      });
    }

    gsap.to('.slide-next-img', {
      clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',
      duration: 1.5,
      ease: 'power3.out',
      delay: 1,
    });

    const intervalId = setInterval(() => {
      if (isAnimating) return;

      isAnimating = true;
      splitTextIntoSpans('.slider-content-active h1');

      gsap.to('.slide-active img', {
        scale: 2,
        duration: 2,
        ease: 'power3.out',
      });

      gsap.to('.slider-content-active h1 span', {
        top: '-175px',
        stagger: 0.05,
        ease: 'power3.out',
        duration: 0.5,
        onComplete: () => {
          gsap.to('.slider-content-active', {
            top: '-175px',
            duration: 0.25,
            ease: 'power3.out',
          });
        },
      });

      splitTextIntoSpans('.slider-content-next h1');
      gsap.set('.slider-content-next h1 span', {
        top: '200px',
      });

      gsap.to('.slider-content-next', {
        top: '0',
        duration: 1.125,
        ease: 'power3.out',
        onComplete: () => {
          document.querySelector('.slider-content-active') &&
            document.querySelector('.slider-content-active').remove();
          gsap.to('.slider-content-next h1 span', {
            top: 0,
            stagger: 0.05,
            ease: 'power3.out',
            duration: 0.5,
          });

          const nextContent = document.querySelector('.slider-content-next');
          if (nextContent) {
            nextContent.classList.remove('slider-content-next');
            nextContent.classList.add('slider-content-active');
            nextContent.style.top = '0';
          }

          currentContentIndex = (currentContentIndex + 1) % totalImages;
          const nextContentText = sliderContent[currentContentIndex];
          const newContentHTML = `<div class="slider-content-next" style="top:200px;"><h1>${nextContentText}</h1></div>`;

          document.querySelector('.slider-content') &&
            document
              .querySelector('.slider-content')
              .insertAdjacentHTML('beforeend', newContentHTML);
        },
      });

      currentImageIndex = (currentImageIndex % totalImages) + 1;
      const newSlideHTML = `<div class="slide-next">
          <div class="slide-next-img">
            <img
              src="${imageContent[currentImageIndex]}"
              alt=""
            />
          </div>
        </div>`;

      document.querySelector('.slider') &&
        document
          .querySelector('.slider')
          .insertAdjacentHTML('beforeend', newSlideHTML);

      gsap.to('.slider .slide-next:last-child .slide-next-img', {
        clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5,
      });

      const slideNextImg = document.querySelector('.slide-next-img');
      gsap.to(slideNextImg, {
        width: '100%',
        height: '100vh',
        duration: 2,
        ease: 'power3.out',
        onComplete: () => {
          const currentActiveSlide = document.querySelector('.slide-active');
          if (currentActiveSlide) {
            currentActiveSlide.parentNode.removeChild(currentActiveSlide);
          }

          const nextSlide = document.querySelector('.slide-next');
          if (nextSlide) {
            nextSlide.classList.remove('slide-next');
            nextSlide.classList.add('slide-active');

            const nextSlideImg = nextSlide.querySelector('.slide-next-img');
            if (nextSlideImg) {
              nextSlideImg.classList.remove('slide-next-img');
              // nextSlideImg.classList.add('alide-active-img')
            }
          }

          setTimeout(() => {
            isAnimating = false;
          }, 500);
        },
      });
    }, 2500);

    return () => {
      clearInterval(intervalId);
      // Stop any ongoing GSAP animations
      gsap.killTweensOf('.slider');
      gsap.killTweensOf('.slide-next-img');
      gsap.killTweensOf('.slider-content-active h1 span');
    };
  }, [window.location.pathname]);

  return (
    <div className='min-h-[100vh] w-[100%]'>
      <div className='overlay z-[1]'></div>
      <div className='slider'>
        <div className='slide-active'>
          <img
            src='https://images.pexels.com/photos/392031/pexels-photo-392031.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt=''
          />
        </div>
        <div className='slide-next'>
          <div className='slide-next-img'>
            <img
              src='https://images.pexels.com/photos/8159/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
              alt=''
            />
          </div>
        </div>
      </div>

      <div
        className='absolute top-[60%] md:top-[65%] lg:top-[70%] left-[50%] flex gap-3 z-10'
        style={{
          transform: 'translate(-50%,-50%)',
        }}
      >
        <PrimaryButton
          text={'On Sale Projects'}
          textClasses={'md:text-lg'}
          classes={'bg-primary-main bg-opacity-70 hover:bg-primary-main'}
          onClick={() => {
            navigate(`/properties/all`);
          }}
        />

        <PrimaryButton
          text={'Landshares'}
          textClasses={'md:text-lg'}
          classes={'bg-primary-main bg-opacity-70 hover:bg-primary-main '}
          onClick={() => {
            navigate(`/properties/landshares`);
          }}
        />
      </div>

      <div
        className='!left-[50%] md:!left-[50%] slider-content !max-w-6xl w-[100%]'
        style={{
          transform: 'translate(-50%,-0%)',
        }}
      >
        <div className='slider-content-static'>
          <h1 className='text-primary-main'>We</h1>
        </div>
        <div className='slider-content-active'>
          <h1>BUILD</h1>
        </div>
        <div className='slider-content-next'>
          <h1>SELL</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
