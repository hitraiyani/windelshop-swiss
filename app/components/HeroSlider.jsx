import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconArrowRight,IconChevronRight} from '~/components';
/**
 * Hero component that renders metafields attached to collection resources
 **/
export function HeroSlider() {
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
            <SwiperSlide>
              <div className="slide-item h-full">
                <div className="slide-item-inner flex flex-row overflow-hidden rounded-[30px] h-full">
                  <div className="content-left w-[40%]">
                    <div className="col-inner bg-[#E7EFFF] pt-[29px] pb-[37px] px-[70px] flex flex-col h-full">
                      <div className="brand-logo w-[145px] h-[95px]">
                        <img
                          className="w-full h-full block object-contain"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/pampers.svg?v=1685605760"
                          alt=""
                        />
                      </div>
                      <h2 className="title mt-[43px] text-[#00A49B] text-[25px] leading-[1] font-semibold">
                        Die sichere Windel
                      </h2>
                      <div className="subtitle mt-[5px] mb-[119px] text-[#00A49B] leading-[1.2] text-[18px]">
                        lange trocken
                      </div>
                      <div className="btn-wrap flex mt-auto">
                        <a
                          href="#"
                          className='leading-none w-fit flex items-center justify-center text-center gap-[10px] text-[#00A49B] font-["Open_Sans"] uppercase font-bold text-[12px] hover:opacity-70 transition-all duration-500'
                        >
                          <span className="name">MEHR ERFAREN</span>
                          <span className="icon">
                            <IconArrowRight className={'w-[22px] h-[12px]'} />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="img-col w-[60%]">
                    <div className="col-inner h-full">
                      <div className="img-wrap h-full relative overflow-hidden">
                        <img
                          className="absolute w-full inset-0 h-full object-cover"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/mother-and-baby-happy_1.jpg?v=1686120404"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-item h-full">
                <div className="slide-item-inner flex flex-row overflow-hidden rounded-[30px] h-full">
                  <div className="content-left w-[40%]">
                    <div className="col-inner bg-[#DAEACB] pt-[29px] pb-[37px] px-[70px] flex flex-col h-full">
                      <div className="brand-logo w-[145px] h-[95px]">
                        <img
                          className="w-full h-full block object-contain"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/swilet.svg?v=1685605760"
                          alt=""
                        />
                      </div>
                      <h2 className="title mt-[43px] text-[#1F5406] text-[25px] leading-[1] font-semibold">
                        Die nachhaltige Windel
                      </h2>
                      <div className="subtitle mt-[5px] mb-[119px] text-[#1F5406] leading-[1.2] text-[18px]">
                        besonders hautfreundlich
                      </div>
                      <div className="btn-wrap flex mt-auto">
                        <a
                          href="#"
                          className='leading-none w-fit flex items-center justify-center text-center gap-[10px] text-[#1F5406] font-["Open_Sans"] uppercase font-bold text-[12px] hover:opacity-70 transition-all duration-500'
                        >
                          <span className="name">MEHR ERFAREN</span>
                          <span className="icon">
                            <IconArrowRight className={'w-[22px] h-[12px]'} />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="img-col w-[60%]">
                    <div className="col-inner h-full">
                      <div className="img-wrap h-full relative overflow-hidden">
                        <img
                          className="absolute w-full inset-0 h-full object-cover"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/mother-and-baby-happy_1_1_774c1555-b98c-4998-8076-9cacb9d9b103.png?v=1685605795"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
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
