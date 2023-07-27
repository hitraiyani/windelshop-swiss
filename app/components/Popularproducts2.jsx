import clsx from 'clsx';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconCart2, IconChevronRight, IconStar, IconWhishlist} from '~/components';

export function Popularproducts2({className}) {
  return (
    <section className={`${className} popularproduct-sec py-[15px] md:py-[30px]`}>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          <div className="col relative w-full lg:w-[50%]">
            <div className="col-inner px-[20px] md:px-[30px] xl:px-[40px] py-[20px] md:py-[30px] bg-white rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
              <div className="title-wrap mb-[35px] flex gap-[20px] justify-between items-center">
                <div className="w-[82px]">
                  <img
                    className="max-w-full"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/pampers.svg?v=1685605760"
                    alt=""
                  />
                </div>
                <div className="slider-nav flex gap-[13px] items-center w-[100px] justify-end">
                  <div
                    id="swiper-button-prev-aktuelle1"
                    className="w-[30px] h-[30px] bg-[#5E8127] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={
                        'w-[12px] h-[14px] rotate-[180deg] relative left-[-1px]'
                      }
                    />
                  </div>
                  <div
                    id="swiper-button-next-aktuelle1"
                    className="w-[30px] h-[30px] bg-[#5E8127] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={'w-[12px] h-[14px] relative left-[1px]'}
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
                    nextEl: '#swiper-button-next-aktuelle1',
                    prevEl: '#swiper-button-prev-aktuelle1',
                  }}
                  // loop={true}
                  // autoplay={{
                  //   delay: 5000,
                  //   disableOnInteraction: false,
                  // }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    }
                  }}
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col relative w-full lg:w-[50%]">
            <div className="col-inner px-[20px] md:px-[30px] xl:px-[40px] py-[20px] md:py-[30px] bg-white rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
              <div className="title-wrap mb-[35px] flex flex-wrap gap-[20px] justify-between items-center">
                <div className="w-[82px]">
                  <img
                    className="max-w-full"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/pingo_logo_2.png?v=1685447152"
                    alt=""
                  />
                </div>
                <div className="slider-nav flex gap-[13px] items-center w-[100px] justify-end">
                  <div
                    id="swiper-button-prev-popular-pro"
                    className="w-[30px] h-[30px] bg-[#5E8127] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={
                        'w-[12px] h-[14px] rotate-[180deg] relative left-[-1px]'
                      }
                    />
                  </div>
                  <div
                    id="swiper-button-next-popular-pro"
                    className="w-[30px] h-[30px] bg-[#5E8127] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={'w-[12px] h-[14px] relative left-[1px]'}
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
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    }
                  }}
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
                          <h4 className="pro-name text-[14px] text-[#292929] font-normal">
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
                          <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
                            <a
                              href="#"
                              className=""
                            >
                              {/* Jetzt Kaufen */}
                              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
                            </a>
                            <button>
                          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
                        </button>
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
