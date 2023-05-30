import clsx from 'clsx';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
/**
 * Hero component that renders metafields attached to collection resources
 **/
export function HeroSlider() {
  return (
    <section
      className={clsx(
        'hero-section bg-[#EFF9FF] relative',
        top && '',
        height === 'full'
          ? ''
          : 'aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]',
      )}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // breakpoints={{
        //   0: {
        //     autoHeight:'false'
        //   },
        //   768: {
        //     autoHeight:'false'
        //   },
        // }}
      >
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
      </Swiper>
    </section>
  );
}
