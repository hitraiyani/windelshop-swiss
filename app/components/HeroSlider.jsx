import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconArrowRight,IconChevronRight, Link} from '~/components';
/**
 * Hero component that renders metafields attached to collection resources
 **/
export function HeroSlider({slides}) {
  const slideOne = slides[0] ? slides[0] : {};
  const slideTwo = slides[1] ? slides[1] : {};
 
  return (
    <section className="heroslider-section pt-[30px] pb-[50px]">
      <div className="container">
        <div className="heroslider-wrap relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: '#swiper-button-next-heroslider',
              prevEl: '#swiper-button-prev-heroslider',
            }}
            loop={true}
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            className='myswiper1'
          >
            {slideOne && (
              <SwiperSlide>
                <div className="slide-item h-full">
                  <div className="slide-item-inner flex flex-row overflow-hidden rounded-[30px] h-full">
                    <div className="content-left w-[40%]">
                      <div className="col-inner bg-[#E7EFFF] pt-[29px] pb-[37px] px-[70px] flex flex-col h-full">
                        <div className="brand-logo w-[145px] h-[95px]">
                          <img
                            className="w-full h-full block object-contain"
                            src={slideOne?.sub_image?.reference?.image?.url}
                            alt=""
                          />
                        </div>
                        <h2 className="title mt-[43px] text-[#00A49B] text-[25px] leading-[1] font-semibold">
                          {slideOne?.heading?.value}
                        </h2>
                        <div className="subtitle mt-[5px] mb-[119px] text-[#00A49B] leading-[1.2] text-[18px]">
                          {slideOne?.sub_heading?.value}
                        </div>
                        <div className="btn-wrap flex mt-auto">
                        <Link
                            to={slideOne?.cta_redirect?.value}
                            className='leading-none w-fit flex items-center justify-center text-center gap-[10px] text-[#00A49B] font-["Open_Sans"] uppercase font-bold text-[12px] hover:opacity-70 transition-all duration-500'
                          >
                            <span className="name">{slideOne?.cta_label?.value}</span>
                            <span className="icon">
                              <IconArrowRight className={'w-[22px] h-[12px]'} />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="img-col w-[60%]">
                      <div className="col-inner h-full">
                        <div className="img-wrap h-full relative overflow-hidden">
                          <img
                            className="absolute w-full inset-0 h-full object-cover"
                            src={slideOne?.main_image?.reference?.image?.url}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )}
            {slideTwo && (
              <SwiperSlide>
                <div className="slide-item h-full">
                  <div className="slide-item-inner flex flex-row overflow-hidden rounded-[30px] h-full">
                    <div className="content-left w-[40%]">
                      <div className="col-inner bg-[#DAEACB] pt-[29px] pb-[37px] px-[70px] flex flex-col h-full">
                        <div className="brand-logo w-[145px] h-[95px]">
                          <img
                            className="w-full h-full block object-contain"
                            src={slideTwo?.sub_image?.reference?.image?.url}
                            alt=""
                          />
                        </div>
                        <h2 className="title mt-[43px] text-[#1F5406] text-[25px] leading-[1] font-semibold">
                          {slideTwo?.heading?.value}
                        </h2>
                        <div className="subtitle mt-[5px] mb-[119px] text-[#1F5406] leading-[1.2] text-[18px]">
                          {slideTwo?.sub_heading?.value}
                        </div>
                        <div className="btn-wrap flex mt-auto">
                        <Link
                            to={slideTwo?.cta_redirect?.value}
                            className='leading-none w-fit flex items-center justify-center text-center gap-[10px] text-[#1F5406] font-["Open_Sans"] uppercase font-bold text-[12px] hover:opacity-70 transition-all duration-500'
                          >
                            <span className="name">{slideTwo?.cta_label?.value}</span>
                            <span className="icon">
                              <IconArrowRight className={'w-[22px] h-[12px]'} />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="img-col w-[60%]">
                      <div className="col-inner h-full">
                        <div className="img-wrap h-full relative overflow-hidden">
                          <img
                            className="absolute w-full inset-0 h-full object-cover"
                            src={slideTwo?.main_image?.reference?.image?.url}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          <div
            id="swiper-button-prev-heroslider"
            className="absolute left-[-36px] top-1/2 -translate-y-1/2 w-[73px] h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          ><IconChevronRight className={'w-[14px] h-[27px] rotate-[180deg] relative left-[-1px]'} /></div>
          <div
            id="swiper-button-next-heroslider"
            className="absolute right-[-36px] top-1/2 -translate-y-1/2 w-[73px] h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          ><IconChevronRight className={'w-[14px] h-[27px] relative left-[3px]'} /></div>
        </div>
      </div>
    </section>
  );
}
