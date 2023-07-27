import clsx from 'clsx';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconChevronRight, IconStar, ProductCardView} from '~/components';

export function YouMayAlsoLike({products, title,locale, className}) {
  
  return (
    <>
      {
        products?.length > 0 && (
          <section className={`${className} new-in-Shop-section py-[15px] md:py-[30px]`}>
            <div className="container">
              <div className="title-wrap mb-[22px]">
                <h2 className="text-[#5E8127] text-[24px] font-bold text-left">
                    {title}
                </h2>
              </div>
              <div className="relative new-in-Shop-slider">
                <Swiper
                  modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={28}
                  slidesPerView={4}
                  navigation={{
                    nextEl: '#swiper-button-next-new-in-Shop',
                    prevEl: '#swiper-button-prev-new-in-Shop',
                  }}
                  // loop={true}
                  // autoplay={{
                  //   delay: 5000,
                  //   disableOnInteraction: false,
                  // }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1280: {
                      slidesPerView: 4,
                      spaceBetween: 28,
                    },
                  }}
                  className='myswiper2'
                >
                  {products.map((product, index) => { 
                      return (
                        <SwiperSlide key={index}>
                          <div className="slide-item">
                                <ProductCardView product={product} locale={locale} />
                          </div>
                        </SwiperSlide>
                      );
                  })}
                </Swiper>
                <div
                  id="swiper-button-prev-new-in-Shop"
                  className="absolute left-[-20px] md:left-[-36px] top-1/2 translate-y-[-180%] xl:translate-y-[-140%] w-[50px] h-[50px] xl:w-[73px] xl:h-[73px] bg-[#5E8127] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                >
                  <IconChevronRight
                    className={
                      'w-[20px] h-[20px] xl:w-[14px] xl:h-[27px] rotate-[180deg] relative left-[-1px]'
                    }
                  />
                </div>
                <div
                  id="swiper-button-next-new-in-Shop"
                  className="absolute right-[-20px] md:right-[-36px] top-1/2 translate-y-[-180%] xl:translate-y-[-140%] w-[50px] h-[50px] xl:w-[73px] xl:h-[73px] bg-[#5E8127] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                >
                  <IconChevronRight
                    className={'w-[20px] h-[20px] xl:w-[14px] xl:h-[27px] relative left-[3px]'}
                  />
                </div>
              </div>
            </div>
          </section>
        )
      }
    </>
  );
}
