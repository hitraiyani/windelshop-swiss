import clsx from 'clsx';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconChevronRight, IconStar} from '~/components';

export function NewInTheShop({className}) {
  return (
    <section className={`${className} new-in-Shop-section py-[50px]`}>
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-[#1C5F7B] text-[28px] font-bold text-left">
            Neu im Shop
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
            className='myswiper2'
          >
            <SwiperSlide>
              <div className="slide-item">
                <div className="product-card">
                  <div className="product-card-inner">
                    <a href="#" className="img-link">
                      <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                        <img
                          className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/0-81782904-DE-EPI-360x360_webp.png?v=1685613193"
                          alt=""
                        />
                      </div>
                    </a>
                    <h4 className="pro-name text-[16px] text-[#292929] font-normal">
                      Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK) Sparpack
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[18px] text-black font-bold mt-[12px]">
                      <span>CHF 15.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[45px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                      >
                        Jetzt Kaufen
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-item">
                <div className="product-card">
                  <div className="product-card-inner">
                    <a href="#" className="img-link">
                      <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                        <img
                          className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/0-81782904-DE-EPI-360x360.webp_2.png?v=1685613193"
                          alt=""
                        />
                      </div>
                    </a>
                    <h4 className="pro-name text-[16px] text-[#292929] font-normal">
                      Pampers Baby-Dry Gr.5 Junior 11-16kg (90 STK) Maxi Pack
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[18px] text-black font-bold mt-[12px]">
                      <span>CHF 32.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[45px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                      >
                        Jetzt Kaufen
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-item">
                <div className="product-card">
                  <div className="product-card-inner">
                    <a href="#" className="img-link">
                      <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                        <img
                          className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/0-81782904-DE-EPI-360x360.webp_1.png?v=1685613193"
                          alt=""
                        />
                      </div>
                    </a>
                    <h4 className="pro-name text-[16px] text-[#292929] font-normal">
                      Pampers Premium Protection Gr.5 Junior 11-16kg (34 STK)
                      Sparpack
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[18px] text-black font-bold mt-[12px]">
                      <span>CHF 16.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[45px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                      >
                        Jetzt Kaufen
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-item">
                <div className="product-card">
                  <div className="product-card-inner">
                    <a href="#" className="img-link">
                      <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                        <img
                          className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/0-81782904-DE-EPI-360x360.webp_3.png?v=1685613193"
                          alt=""
                        />
                      </div>
                    </a>
                    <h4 className="pro-name text-[16px] text-[#292929] font-normal">
                      Pampers Baby-Dry PANTS Gr. 7 XXL +17kg (126 STK) Monatsbox
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[18px] text-black font-bold mt-[12px]">
                      <span>CHF 58.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[45px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                      >
                        Jetzt Kaufen
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-item">
                <div className="product-card">
                  <div className="product-card-inner">
                    <a href="#" className="img-link">
                      <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                        <img
                          className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/0-81782904-DE-EPI-360x360_webp.png?v=1685613193"
                          alt=""
                        />
                      </div>
                    </a>
                    <h4 className="pro-name text-[16px] text-[#292929] font-normal">
                      Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK) Sparpack1
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[18px] text-black font-bold mt-[12px]">
                      <span>CHF 15.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[45px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                      >
                        Jetzt Kaufen
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-item">
                <div className="product-card">
                  <div className="product-card-inner">
                    <a href="#" className="img-link">
                      <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                        <img
                          className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                          src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/0-81782904-DE-EPI-360x360_webp.png?v=1685613193"
                          alt=""
                        />
                      </div>
                    </a>
                    <h4 className="pro-name text-[16px] text-[#292929] font-normal">
                      Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK) Sparpack2
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[18px] text-black font-bold mt-[12px]">
                      <span>CHF 15.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[45px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                      >
                        Jetzt Kaufen
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div
            id="swiper-button-prev-new-in-Shop"
            className="absolute left-[-36px] top-1/2 translate-y-[-160%] w-[73px] h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          >
            <IconChevronRight
              className={
                'w-[14px] h-[27px] rotate-[180deg] relative left-[-1px]'
              }
            />
          </div>
          <div
            id="swiper-button-next-new-in-Shop"
            className="absolute right-[-36px] top-1/2 translate-y-[-160%] w-[73px] h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          >
            <IconChevronRight
              className={'w-[14px] h-[27px] relative left-[3px]'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
