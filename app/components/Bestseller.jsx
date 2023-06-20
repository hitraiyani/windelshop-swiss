import clsx from 'clsx';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {
  IconChevronRight,
  IconStar,
  AddToCartButton,
  Text,
  Link,
  CompareAtPrice,
} from '~/components';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {isDiscounted} from '~/lib/utils';

export function Bestseller({products, title}) {
  return (
    <section
      className={`bestseller-section py-[20px] md:py-[30px] xl:py-[40px] 2xl:py-[50px]`}
    >
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-black text-[24px] font-bold text-left">
            {title}
          </h2>
        </div>
        <div className="relative new-in-Shop-slider">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={28}
            slidesPerView={4}
            navigation={{
              nextEl: '#swiper-button-next-bestseller',
              prevEl: '#swiper-button-prev-bestseller',
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
            className="myswiper2"
          >
            {products.map((item, index) => {
              const product = item?.node;
              const firstVariant = flattenConnection(product?.variants)[0];

              if (!firstVariant) return null;
              const {image, price, compareAtPrice} = firstVariant;

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
                        <Link
                          to={`/products/${product.handle}`}
                          prefetch="intent"
                          className="img-link"
                        >
                          <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                            {image && (
                              <Image
                                className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                                data={image}
                                alt={
                                  image.altText || `Picture of ${product.title}`
                                }
                              />
                            )}
                          </div>
                        </Link>
                        <h4 className="pro-name text-[14px] text-[#292929] font-normal">
                          {product.title}
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
                        <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center gap-[7px] flex flex-wrap items-center">
                          <Money withoutTrailingZeros data={price} />
                          {isDiscounted(price, compareAtPrice) && (
                            <CompareAtPrice
                              className={'opacity-50'}
                              data={compareAtPrice}
                            />
                          )}
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
                              totalValue: parseFloat(productAnalytics.price),
                            }}
                          >
                            <Text
                              as="span"
                              className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold"
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
                      Pampers Baby-Dry Gr.5 Junior 11-16kg (90 STK) Maxi Pack
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                      <span>CHF 32.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold"
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
                    <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                      <span>CHF 16.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold"
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
                      Pampers Baby-Dry PANTS Gr. 7 XXL +17kg (126 STK) Monatsbox
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                      <span>CHF 58.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold"
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
                      Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK) Sparpack1
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                      <span>CHF 15.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold"
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
                      Pampers Baby-Dry Gr.3 Midi 6- 10kg (52 STK) Sparpack2
                    </h4>
                    <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px] fill-black'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                      <IconStar className={'w-[17px] h-[15px]'} />
                    </div>
                    <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                      <span>CHF 15.90</span>
                    </div>
                    <div className="buy-now-btn flex mt-[14px]">
                      <a
                        href="#"
                        className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold"
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
            id="swiper-button-prev-bestseller"
            className="absolute left-[-20px] md:left-[-36px] top-1/2 translate-y-[-180%] xl:translate-y-[-140%] w-[50px] h-[50px] xl:w-[73px] xl:h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          >
            <IconChevronRight
              className={
                'w-[20px] h-[20px] xl:w-[14px] xl:h-[27px] rotate-[180deg] relative left-[-1px]'
              }
            />
          </div>
          <div
            id="swiper-button-next-bestseller"
            className="absolute right-[-20px] md:right-[-36px] top-1/2 translate-y-[-180%] xl:translate-y-[-140%] w-[50px] h-[50px] xl:w-[73px] xl:h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          >
            <IconChevronRight
              className={
                'w-[20px] h-[20px] xl:w-[14px] xl:h-[27px] relative left-[3px]'
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
