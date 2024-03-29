import clsx from 'clsx';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {
  IconChevronRight,
  IconStar,
  Link,
  CompareAtPrice,
  AddToCartButton,
  Text,
  Button,
  IconCart2,
  IconWhishlist,
  
} from '~/components';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {isDiscounted, productTranslate, translate} from '~/lib/utils';

export function Popularproducts({
  className,
  left_section_title,
  right_section_title,
  left_section_products,
  right_section_products,
  locale
}) {
  return (
    <section
      className={`${className} popularproduct-sec py-[15px] md:py-[30px]`}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          <div className="col relative w-full lg:w-[50%]">
            <div className="col-inner px-[20px] md:px-[30px] lg:px-[40px] py-[20px] md:py-[30px] bg-[#E5EFD4] rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
              <div className="title-wrap mb-[35px] flex gap-[20px] justify-between items-center">
                <h2 className="text-[#5E8127] text-[24px] font-bold text-left flex-1">
                  {left_section_title}
                </h2>
                <div className="slider-nav flex gap-[13px] items-center w-[100px] justify-end">
                  <div
                    id="swiper-button-prev-aktuelle2"
                    className="w-[30px] h-[30px] bg-[#5E8127] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
                  >
                    <IconChevronRight
                      className={
                        'w-[12px] h-[14px] rotate-[180deg] relative left-[-1px]'
                      }
                    />
                  </div>
                  <div
                    id="swiper-button-next-aktuelle2"
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
                    nextEl: '#swiper-button-next-aktuelle2',
                    prevEl: '#swiper-button-prev-aktuelle2',
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
                    },
                  }}
                  className="myswiper3"
                >
                  {left_section_products.map((product, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="slide-item">
                          <ProductCardView
                            product={product?.node}
                            key={index}
                            locale={locale}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col relative w-full lg:w-[50%]">
            <div className="col-inner px-[20px] md:px-[30px] lg:px-[40px] py-[20px] md:py-[30px] bg-[#E5EFD4] rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
              <div className="title-wrap mb-[35px] flex gap-[20px] justify-between items-center">
                <h2 className="text-[#5E8127] text-[24px] font-bold text-left flex-1">
                  {right_section_title}
                </h2>
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
                    },
                  }}
                  className="myswiper4"
                >
                  {right_section_products.map((product, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="slide-item">
                          <ProductCardView
                            product={product?.node}
                            key={index}
                            locale={locale}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductCardView({product,locale}) {
  const firstVariant = flattenConnection(product?.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  const isOutOfStock = !firstVariant?.availableForSale;

  const isDiscountedPrice = isDiscounted(price, compareAtPrice);

  let dicountedPr = 0;
  if (isDiscountedPrice) {
    dicountedPr = Math.round(
      ((parseFloat(price.amount) - parseFloat(compareAtPrice.amount)) /
        parseFloat(price.amount)) *
        100,
    );
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
    <div className="product-card relative">
      <div className="product-card-inner">
        <Link to={`/products/${product.handle}`} className="img-link">
          <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
            {image && (
              <Image
                className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
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
          {productTranslate(product,'title',locale) }
        </h4>
        {/* <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
            <IconStar className={'w-[17px] h-[15px]'} />
            <IconStar className={'w-[17px] h-[15px]'} />
            <IconStar className={'w-[17px] h-[15px] fill-black'} />
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
        <div className="btn-wrap flex justify-center w-full items-center gap-[20px] absolute bg-[#CCDDF1] rounded-[0px_0px_20px_20px] p-[15px] opacity-0">
          {isOutOfStock ? (
            <Button
              variant="secondary"
              disabled
              className=''
            >
              {/* <Text>{translate("sold_out",locale)}</Text> */}
              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'}  />
            </Button>
          ) : (
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
              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500'} />
              {/* <Text
                as="span"
                className="bg-[#5E8127] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold"
              >
                Jetzt Kaufen
              </Text> */}
            </AddToCartButton>
          )}
          <IconWhishlist className="w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#284181] hover:text-black transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}
