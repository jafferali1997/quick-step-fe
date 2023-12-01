'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const slides = [
  { id: '1', image: '/assets/images/landing/partners/slide1.png' },
  { id: '2', image: '/assets/images/landing/partners/slide2.png' },
  { id: '3', image: '/assets/images/landing/partners/slide3.png' },
  { id: '4', image: '/assets/images/landing/partners/slide4.png' },
  { id: '5', image: '/assets/images/landing/partners/slide5.png' },
  { id: '6', image: '/assets/images/landing/partners/slide6.png' },
  { id: '7', image: '/assets/images/landing/partners/slide1.png' },
  { id: '8', image: '/assets/images/landing/partners/slide2.png' },
  { id: '9', image: '/assets/images/landing/partners/slide3.png' }
];

export default function Partners() {
  return (
    <div className="tw-mt-4 tw-px-4">
      <div className="">
        <h1 className="tw-text-center tw-font-dm tw-font-medium tw-leading-[60px] tw-text-text-ultra-light-gray xs:tw-text-[32px] lg:tw-text-[40px]">
          Accredited Partners
        </h1>

        <Swiper
          className="tw-mt-10 !tw-py-6"
          spaceBetween={115}
          slidesPerView="auto"
          loop={true}
          freeMode={true}
          slidesPerGroup={1}
          breakpoints={{
            320: {
              spaceBetween: 50
            },
            640: {
              spaceBetween: 50
            },
            768: {
              spaceBetween: 50
            },
            1024: {
              spaceBetween: 50
            },
            1200: {
              spaceBetween: 115
            }
          }}
        >
          {slides.map((slide) => {
            return (
              <SwiperSlide key={slide.id} className="!tw-w-fit">
                <img
                  className="tw-max-h-[72px] tw-object-contain"
                  alt="img"
                  src={slide.image}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
