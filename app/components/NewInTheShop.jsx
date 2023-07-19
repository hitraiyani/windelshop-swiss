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
  Button
} from '~/components';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {isDiscounted, productTranslate, translate} from '~/lib/utils';

export function NewInTheShop({products, title,locale}) {

  return (
    <section className={`new-in-Shop-section py-[15px] md:py-[30px]`}>
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-[#1C5F7B] text-[24px] font-bold text-left">
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
            className="myswiper2"
          >
            {products.map((product, index) => {
             
              const firstVariant = flattenConnection(product?.variants)[0];

              if (!firstVariant) return null;
              const {image, price, compareAtPrice} = firstVariant;

              const isOutOfStock = !firstVariant?.availableForSale;

              const productAnalytics = {
                productGid: product.id,
                variantGid: firstVariant.id,
                name: productTranslate(product,'title',locale) ,
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
                                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
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
                        <IconStar className={'w-[17px] h-[15px] fill-black'} />
                        <IconStar className={'w-[17px] h-[15px]'} />
                        <IconStar className={'w-[17px] h-[15px]'} />
                      </div> */}
                        <div className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
                            <Money withoutTrailingZeros data={price} />
                            {isDiscounted(price, compareAtPrice) && (
                              <CompareAtPrice
                                className={'opacity-50'}
                                data={compareAtPrice}
                              />
                            )}
                        </div>
                        <div className="buy-now-btn flex mt-[14px]">
                          
                        {isOutOfStock ? (
                            <Button
                              variant="secondary"
                              disabled
                              className='bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold'
                            >
                              <Text>{translate("sold_out",locale)}</Text>
                            </Button>
                          ) : (<AddToCartButton
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
                              { translate('add_to_cart', locale) }

                            </Text>
                          </AddToCartButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div
            id="swiper-button-prev-new-in-Shop"
            className="absolute left-[-20px] md:left-[-36px] top-1/2 translate-y-[-180%] xl:translate-y-[-140%] w-[50px] h-[50px] xl:w-[73px] xl:h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          >
            <IconChevronRight
              className={
                'w-[20px] h-[20px] xl:w-[14px] xl:h-[27px] rotate-[180deg] relative left-[-1px]'
              }
            />
          </div>
          <div
            id="swiper-button-next-new-in-Shop"
            className="absolute right-[-20px] md:right-[-36px] top-1/2 translate-y-[-180%] xl:translate-y-[-140%] w-[50px] h-[50px] xl:w-[73px] xl:h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          >
            <IconChevronRight
              className={'w-[20px] h-[20px] xl:w-[14px] xl:h-[27px] relative left-[3px]'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


