import clsx from 'clsx';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {
  IconChevronRight,
  IconStar,
  Link,
  CompareAtPrice,
  AddToCartButton,
  Text
} from '~/components';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {isDiscounted} from '~/lib/utils';

export function ProductsByBrands({brand_one_products, brand_two_products}) {
  
  return (
    <section className={` popularproduct-sec py-[20px] md:py-[30px] xl:py-[40px] 2xl:py-[50px]`}>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          <div className="col relative w-full lg:w-[50%]">
            <div className="col-inner px-[20px] md:px-[30px] xl:px-[40px] py-[20px] md:py-[30px] bg-white rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
              <div className="title-wrap mb-[35px] flex gap-[20px] justify-between items-center">
                <div className="w-[82px]">
                  <img
                    className="max-w-full"
                    src={
                      brand_one_products?.brand_image_1?.reference?.image?.url
                    }
                    alt=""
                  />
                </div>
                <div className="slider-nav flex gap-[13px] items-center w-[100px] justify-end">
                  <div
                    id="swiper-button-prev-aktuelle3"
                    className="w-[30px] h-[30px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={
                        'w-[12px] h-[14px] rotate-[180deg] relative left-[-1px]'
                      }
                    />
                  </div>
                  <div
                    id="swiper-button-next-aktuelle3"
                    className="w-[30px] h-[30px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
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
                    nextEl: '#swiper-button-next-aktuelle3',
                    prevEl: '#swiper-button-prev-aktuelle3',
                  }}
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
                  {brand_one_products?.nodes?.map((product, index) => {
                    
                    const firstVariant = flattenConnection(
                      product?.variants,
                    )[0];

                    if (!firstVariant) return null;
                    const {image, price, compareAtPrice} = firstVariant;

                    const isDiscountedPrice = isDiscounted(
                      price,
                      compareAtPrice,
                    );

                    let dicountedPr = 0;
                    if (isDiscountedPrice) {
                        dicountedPr = Math.round(((parseFloat(price.amount) - parseFloat(compareAtPrice.amount)) / parseFloat(price.amount)) * 100);
                    }

                    const productAnalytics = {
                      productGid: product.id,
                      variantGid: firstVariant.id,
                      name: product.title,
                      variantName: firstVariant.title,
                      brand: product.vendor,
                      price: firstVariant.price.amount,
                      quantity: 1,
                    };

                    return (
                      <SwiperSlide key={index}>
                        <div className="slide-item">
                          <div className="product-card">
                            <div className="product-card-inner">
                              <Link to={`/products/${product.handle}`} className="img-link">
                                <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                                  {image && (
                                    <Image
                                      className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                                      data={image}
                                      alt={
                                        image.altText ||
                                        `Picture of ${product.title}`
                                      }
                                    />
                                  )}
                                  {isDiscountedPrice && (
                                    <div className="lable flex absolute top-[10px] left-[10px] bg-[#CC3F13] text-white uppercase w-fit px-[10px] py-[7px] rounded-[89px] leading-none items-center justify-center text-center min-h-[40px]">
                                      <span>SALE {dicountedPr}%</span>
                                    </div>
                                  )}
                                </div>
                              </Link>
                              <h4 className="pro-name text-[14px] text-[#292929] font-normal">
                                {product?.title}
                              </h4>
                              {/* <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                                   <IconStar className={'w-[17px] h-[15px]'} />
                                   <IconStar className={'w-[17px] h-[15px]'} />
                                   <IconStar
                                     className={'w-[17px] h-[15px] fill-black'}
                                   />
                                   <IconStar className={'w-[17px] h-[15px]'} />
                                   <IconStar className={'w-[17px] h-[15px]'} />
                                 </div> */}
                              <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                                {isDiscountedPrice && (
                                    <>
                                      <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                                        {dicountedPr}%
                                      </span>
                                    <CompareAtPrice
                                      className="text-[#777777] font-normal line-through"
                                      data={compareAtPrice}
                                    />
                                    </>
                                )}
                                <span>
                                  <Money withoutTrailingZeros data={price} />
                                </span>
                              </div>
                              <div className="buy-now-btn flex mt-[14px]">
                                <AddToCartButton
                                  lines={[
                                    {
                                      quantity: 1,
                                      merchandiseId: firstVariant.id,
                                    },
                                  ]}
                                  variant="secondary"
                                  analytics={{
                                    products: [productAnalytics],
                                    totalValue: parseFloat(
                                      productAnalytics.price,
                                    ),
                                  }}
                                >
                                  <Text
                                    as="span"
                                    className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                                  >
                                    Jetzt Kaufen
                                  </Text>
                                </AddToCartButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
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
                    src={
                      brand_two_products?.brand_image_2?.reference?.image?.url
                    }
                    alt=""
                  />
                </div>
                <div className="slider-nav flex gap-[13px] items-center w-[100px] justify-end">
                  <div
                    id="swiper-button-prev-popular-pro"
                    className="w-[30px] h-[30px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={
                        'w-[12px] h-[14px] rotate-[180deg] relative left-[-1px]'
                      }
                    />
                  </div>
                  <div
                    id="swiper-button-next-popular-pro"
                    className="w-[30px] h-[30px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
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
                   {brand_two_products?.nodes?.map((product, index) => {
                    
                    const firstVariant = flattenConnection(
                      product?.variants,
                    )[0];

                    if (!firstVariant) return null;
                    const {image, price, compareAtPrice} = firstVariant;

                    const isDiscountedPrice = isDiscounted(
                      price,
                      compareAtPrice,
                    );

                    let dicountedPr = 0;
                    if (isDiscountedPrice) {
                        dicountedPr = Math.round(((parseFloat(price.amount) - parseFloat(compareAtPrice.amount)) / parseFloat(price.amount)) * 100);
                    }

                    const productAnalytics = {
                      productGid: product.id,
                      variantGid: firstVariant.id,
                      name: product.title,
                      variantName: firstVariant.title,
                      brand: product.vendor,
                      price: firstVariant.price.amount,
                      quantity: 1,
                    };

                    return (
                      <SwiperSlide key={index}>
                        <div className="slide-item">
                          <div className="product-card">
                            <div className="product-card-inner">
                              <Link to={`/products/${product.handle}`} className="img-link">
                                <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                                  {image && (
                                    <Image
                                      className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                                      data={image}
                                      alt={
                                        image.altText ||
                                        `Picture of ${product.title}`
                                      }
                                    />
                                  )}
                                  {isDiscountedPrice && (
                                    <div className="lable flex absolute top-[10px] left-[10px] bg-[#CC3F13] text-white uppercase w-fit px-[10px] py-[7px] rounded-[89px] leading-none items-center justify-center text-center min-h-[40px]">
                                      <span>SALE {dicountedPr}%</span>
                                    </div>
                                  )}
                                </div>
                              </Link>
                              <h4 className="pro-name text-[14px] text-[#292929] font-normal">
                                {product?.title}
                              </h4>
                              {/* <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                                   <IconStar className={'w-[17px] h-[15px]'} />
                                   <IconStar className={'w-[17px] h-[15px]'} />
                                   <IconStar
                                     className={'w-[17px] h-[15px] fill-black'}
                                   />
                                   <IconStar className={'w-[17px] h-[15px]'} />
                                   <IconStar className={'w-[17px] h-[15px]'} />
                                 </div> */}
                              <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                                {isDiscountedPrice && (
                                    <>
                                      <span className="off bg-[#CC3F13] rounded-[17px] px-[10px] py-[3px] font-normal text-white">
                                        {dicountedPr}%
                                      </span>
                                    <CompareAtPrice
                                      className="text-[#777777] font-normal line-through"
                                      data={compareAtPrice}
                                    />
                                    </>
                                )}
                                <span>
                                  <Money withoutTrailingZeros data={price} />
                                </span>
                              </div>
                              <div className="buy-now-btn flex mt-[14px]">
                                <AddToCartButton
                                  lines={[
                                    {
                                      quantity: 1,
                                      merchandiseId: firstVariant.id,
                                    },
                                  ]}
                                  variant="secondary"
                                  analytics={{
                                    products: [productAnalytics],
                                    totalValue: parseFloat(
                                      productAnalytics.price,
                                    ),
                                  }}
                                >
                                  <Text
                                    as="span"
                                    className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                                  >
                                    Jetzt Kaufen
                                  </Text>
                                </AddToCartButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                  {/* <SwiperSlide>
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
                          <div className="buy-now-btn flex mt-[14px]">
                            <a
                              href="#"
                              className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
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
                          <div className="buy-now-btn flex mt-[14px]">
                            <a
                              href="#"
                              className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
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
                          <div className="buy-now-btn flex mt-[14px]">
                            <a
                              href="#"
                              className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
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
                          <div className="buy-now-btn flex mt-[14px]">
                            <a
                              href="#"
                              className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
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
                          <div className="buy-now-btn flex mt-[14px]">
                            <a
                              href="#"
                              className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
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
                          <div className="buy-now-btn flex mt-[14px]">
                            <a
                              href="#"
                              className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                            >
                              Jetzt Kaufen
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide> */}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
