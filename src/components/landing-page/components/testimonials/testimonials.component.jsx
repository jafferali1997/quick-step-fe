'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';

const testimoials = [
  {
    id: '1',
    comment:
      'The CCET course was structured in a way that made it very informative and manageable. The short videos were really useful and allowed for great flexibility in completion of the course. Thank you to Kate and Rebecca for all of your support and feedback.',
    stars: '★★★★★',
    image: '/assets/images/usr.png',
    name: 'Niamh Brennan',
    ago: '6 months ago'
  },
  {
    id: '2',
    comment:
      'The CCET course was structured in a way that made it very informative and manageable. The short videos were really useful and allowed for great flexibility in completion of the course. Thank you to Kate and Rebecca for all of your support and feedback.',
    stars: '★★★',
    image: '/assets/images/usr.png',
    name: 'Niamh Brennan',
    ago: '6 months ago'
  },
  {
    id: '3',
    comment:
      'The CCET course was structured in a way that made it very informative and manageable. The short videos were really useful and allowed for great flexibility in completion of the course. Thank you to Kate and Rebecca for all of your support and feedback.',
    stars: '★★★★',
    image: '/assets/images/usr.png',
    name: 'Niamh Brennan',
    ago: '6 months ago'
  },
  {
    id: '4',
    comment:
      'The CCET course was structured in a way that made it very informative and manageable. The short videos were really useful and allowed for great flexibility in completion of the course. Thank you to Kate and Rebecca for all of your support and feedback.',
    stars: '★★★★★',
    image: '/assets/images/usr.png',
    name: 'Niamh Brennan',
    ago: '6 months ago'
  }
];

export default function Testimonials() {
  return (
    <div className="tw-bg-bg-gray tw-px-4 tw-py-[100px]">
      <div className="tw-m-auto tw-w-full tw-max-w-7xl">
        <h1 className="tw-text-center tw-font-dm tw-text-[40px] tw-font-bold tw-leading-10 tw-text-text-dark-gray">
          Our <span class="tw-font-bold tw-text-primary-blue">Testimonials</span>
        </h1>

        <div className="tw-mt-[40px]">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 8,
              slideShadows: true
            }}
            navigation={true}
            loop={true}
            modules={[EffectCoverflow, Navigation]}
            className="testimonial-slider !tw-px-3 !tw-py-4"
          >
            {testimoials.map((slide) => {
              return (
                <SwiperSlide
                  key={slide.id}
                  className="tw-flex tw-max-w-[730px] tw-flex-col tw-items-center tw-justify-center tw-rounded-lg tw-bg-white tw-px-[40px] tw-py-[50px] tw-text-center tw-shadow-md"
                >
                  <div className="tw-flex tw-gap-4">
                    <img
                      className="flex-auto tw-block tw-h-8 tw-w-[44px] xs:tw-hidden md:tw-block"
                      src="/assets/images/landing/testimoials/quote-left.svg"
                      alt="Quote Left"
                    />

                    <div className="flex-1 tw-text-center tw-font-dm tw-text-base tw-font-normal tw-leading-7 tw-text-text-gray2">
                      {slide.comment}
                    </div>

                    <img
                      className="flex-auto tw-mt-auto tw-block tw-h-8 tw-w-[44px] xs:tw-hidden md:tw-block"
                      src="/assets/images/landing/testimoials/quote-right.svg"
                      alt="Quote Right"
                    />
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-py-2">
                    <i className="tw-text-2xl tw-text-yellow-400">{slide.stars}</i>
                  </div>
                  <div className="tw-mt-6 tw-flex tw-items-center tw-justify-center tw-gap-3">
                    <img
                      className="tw-h-14 tw-w-14 tw-rounded-full"
                      alt="img"
                      src={slide.image}
                    />
                    <div className="card-user-data">
                      <h4 className="tw-text-left tw-font-dm tw-text-base tw-font-bold tw-leading-8 tw-text-black">
                        Niamh Brennan
                      </h4>
                      <p className="tw-text-left tw-font-dm tw-text-base tw-font-normal tw-leading-6 tw-text-text-light-gray2">
                        6 months ago
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
