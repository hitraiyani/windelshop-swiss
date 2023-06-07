import clsx from 'clsx';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconChevronRight, IconStar} from '~/components';

export function Popularproducts2({className}) {
  return (
    <section className={`${className} popularproduct-sec py-[50px]`}>
      <div className="container">
        <div className="flex gap-[30px]">
          <div className="col relative w-[50%]">
            <div className="col-inner px-[40px] py-[30px] bg-white rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
              <div className="title-wrap mb-[35px] flex flex-wrap gap-[20px] justify-between items-center">
                <div className="w-[82px]">
                  <img
                    className="max-w-full"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/pampers.svg?v=1685605760"
                    alt=""
                  />
                </div>
                <div className="slider-nav flex gap-[20px] items-center">
                  <div
                    id="swiper-button-prev-aktuelle"
                    className="w-[50px] h-[50px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={
                        'w-[14px] h-[20px] rotate-[180deg] relative left-[-1px]'
                      }
                    />
                  </div>
                  <div
                    id="swiper-button-next-aktuelle"
                    className="w-[50px] h-[50px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={'w-[14px] h-[20px] relative left-[1px]'}
                    />
                  </div>
                </div>
              </div>
              <div className="relative aktuelle-slider">
                <Swiper
                  modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={28}
                  slidesPerView={2}
                  navigation={{
                    nextEl: '#swiper-button-next-aktuelle',
                    prevEl: '#swiper-button-prev-aktuelle',
                  }}
                  // loop={true}
                  // autoplay={{
                  //   delay: 5000,
                  //   disableOnInteraction: false,
                  // }}
                  className="myswiper3"
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
                              <div className="lable flex absolute top-[10px] left-[10px] bg-[#CC3F13] text-white uppercase w-fit px-[10px] py-[7px] rounded-[89px] leading-none items-center justify-center text-center min-h-[40px]">
                                <span>SALE -6%</span>
                              </div>
                            </div>
                          </a>
                          <h4 className="pro-name text-[16px] text-[#292929] font-normal">
                            Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK) Sparpack
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 15.90
                            </span>
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
                              <div className="lable flex absolute top-[10px] left-[10px] bg-[#CC3F13] text-white uppercase w-fit px-[10px] py-[7px] rounded-[89px] leading-none items-center justify-center text-center min-h-[40px]">
                                <span>SALE -6%</span>
                              </div>
                            </div>
                          </a>
                          <h4 className="pro-name text-[16px] text-[#292929] font-normal">
                            Pampers Baby-Dry Gr.5 Junior 11-16kg (90 STK) Maxi
                            Pack
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 32.90
                            </span>
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
                            Pampers Premium Protection Gr.5 Junior 11-16kg (34
                            STK) Sparpack
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 16.90
                            </span>
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
                            Pampers Baby-Dry PANTS Gr. 7 XXL +17kg (126 STK)
                            Monatsbox
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 58.90
                            </span>
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
                            Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK)
                            Sparpack1
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 15.90
                            </span>
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
                            Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK)
                            Sparpack2
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 15.90
                            </span>
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
              </div>
            </div>
          </div>
          <div className="col relative w-[50%]">
            <div className="col-inner px-[40px] py-[30px] bg-white rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
              <div className="title-wrap mb-[35px] flex flex-wrap gap-[20px] justify-between items-center">
                <div className="w-[82px]">
                  <img
                    className="max-w-full"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/pingo_logo_2.png?v=1685447152"
                    alt=""
                  />
                </div>
                <div className="slider-nav flex gap-[20px] items-center">
                  <div
                    id="swiper-button-prev-popular-pro"
                    className="w-[50px] h-[50px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={
                        'w-[14px] h-[20px] rotate-[180deg] relative left-[-1px]'
                      }
                    />
                  </div>
                  <div
                    id="swiper-button-next-popular-pro"
                    className="w-[50px] h-[50px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={'w-[14px] h-[20px] relative left-[1px]'}
                    />
                  </div>
                </div>
              </div>
              <div className="relative beliebte-slider">
                <Swiper
                  modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={28}
                  slidesPerView={2}
                  navigation={{
                    nextEl: '#swiper-button-next-popular-pro',
                    prevEl: '#swiper-button-prev-popular-pro',
                  }}
                  // loop={true}
                  // autoplay={{
                  //   delay: 5000,
                  //   disableOnInteraction: false,
                  // }}
                  className="myswiper4"
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
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 15.90
                            </span>
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
                            Pampers Baby-Dry Gr.5 Junior 11-16kg (90 STK) Maxi
                            Pack
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 32.90
                            </span>
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
                            Pampers Premium Protection Gr.5 Junior 11-16kg (34
                            STK) Sparpack
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 16.90
                            </span>
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
                            Pampers Baby-Dry PANTS Gr. 7 XXL +17kg (126 STK)
                            Monatsbox
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 58.90
                            </span>
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
                            Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK)
                            Sparpack1
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 15.90
                            </span>
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
                            Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK)
                            Sparpack2
                          </h4>
                          <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar
                              className={'w-[17px] h-[15px] fill-black'}
                            />
                            <IconStar className={'w-[17px] h-[15px]'} />
                            <IconStar className={'w-[17px] h-[15px]'} />
                          </div>
                          <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                              -6%
                            </span>
                            <span className="text-[#777777] font-normal line-through">
                              CHF 15.90
                            </span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
