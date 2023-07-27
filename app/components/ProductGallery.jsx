import {ATTR_LOADING_EAGER} from '~/lib/const';
import React, {useEffect, useState} from 'react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
  Controller,
} from 'swiper';
import {Link} from '~/components';
import {MediaFile} from '@shopify/hydrogen';

import {Swiper, SwiperSlide} from 'swiper/react';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({media, dicountedPr,  className}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!media.length) {
    return null;
  }
  let thumbsParams = {
    modules: [Controller],
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
    onSwiper: setThumbsSwiper, // Get swiper instance callback
    style: {
      width: '100px',
    },
  };

  return (
    <div className={` ${className}`}>
      <div className="slider__flex flex flex-col gap-[30px]">
        <div className="slider__images w-full">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
            thumbs={{swiper: thumbsSwiper}}
            spaceBetween={30}
            onSwiper={(swiper) => {}}
            autoHeight="true"
          >
            {media.map((med, i) => {
              let mediaProps = {};
              const data = {
                ...med,
                image: {
                  // @ts-ignore
                  ...med.image,
                  altText: med.alt || 'Product image',
                },
              };

              switch (med.mediaContentType) {
                case 'IMAGE':
                  mediaProps = {
                    width: 800,
                    widths: [400, 800, 1200, 1600, 2000, 2400],
                  };
                  break;
                case 'VIDEO':
                  mediaProps = {
                    width: '100%',
                    autoPlay: true,
                    controls: false,
                    muted: true,
                    loop: true,
                    preload: 'auto',
                  };
                  break;
                case 'EXTERNAL_VIDEO':
                  mediaProps = {width: '100%'};
                  break;
                case 'MODEL_3D':
                  mediaProps = {
                    width: '100%',
                    interactionPromptThreshold: '0',
                    ar: true,
                    loading: ATTR_LOADING_EAGER,
                    disableZoom: true,
                  };
                  break;
              }

              if (i === 0 && med.mediaContentType === 'IMAGE') {
                mediaProps.loading = ATTR_LOADING_EAGER;
              }

              return (
                <SwiperSlide key={i}>
                  <div className='relative p-[38px] bg-[#E5EFD44D] bg-opacity-30 rounded-[10px]'
                    // @ts-ignore
                    key={med.id || med.image.id}
                  >
                    {/* TODO: Replace with MediaFile when it's available */}

                    <MediaFile
                      tabIndex="0"
                      className={`w-full h-auto fadeIn object-contain rounded-[20px]`}
                      data={data}
                      sizes={
                        '(min-width: 64em) 30vw, (min-width: 48em) 25vw, 90vw'
                      }
                      // @ts-ignore
                      options={{
                        crop: 'center',
                        scale: 2,
                      }}
                      {...mediaProps}
                    />
                    {dicountedPr != 0 && (
                      <div className='lable absolute text-white text-[20px] leading-none font-["Open_Sans"] bg-[#D12631] border-[4px] border-white py-[6px] px-[10px] font-bold top-[20px] left-[10px] uppercase rounded-[20px]'>
                        <span>sale-{dicountedPr}%</span>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="slider__col w-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Navigation, Thumbs]}
            direction="horizontal"
            spaceBetween={30}
            centeredSlides="false"
            centeredSlidesBounds="true"
            slidesPerView={3}
            watchOverflow="true"
            watchslidesvisibility="true"
            watchSlidesProgress="true"
            className="swiper-container1"
            breakpoints={{
              0: {
                direction: 'horizontal',
              },
              768: {
                direction: 'horizontal',
              },
            }}
          >
            {media.map((med, i) => {
              let mediaProps = {};
              const isFirst = i === 0;
              const data = {
                ...med,
                image: {
                  // @ts-ignore
                  ...med.image,
                  altText: med.alt || 'Product image',
                },
              };

              switch (med.mediaContentType) {
                case 'IMAGE':
                  mediaProps = {
                    width: 800,
                    widths: [400, 800, 1200, 1600, 2000, 2400],
                  };
                  break;
                case 'VIDEO':
                  mediaProps = {
                    width: '100%',
                    autoPlay: true,
                    controls: false,
                    muted: true,
                    loop: true,
                    preload: 'auto',
                  };
                  break;
                case 'EXTERNAL_VIDEO':
                  mediaProps = {width: '100%'};
                  break;
                case 'MODEL_3D':
                  mediaProps = {
                    width: '100%',
                    interactionPromptThreshold: '0',
                    ar: true,
                    loading: ATTR_LOADING_EAGER,
                    disableZoom: true,
                  };
                  break;
              }

              if (i === 0 && med.mediaContentType === 'IMAGE') {
                mediaProps.loading = ATTR_LOADING_EAGER;
              }

              return (
                <SwiperSlide key={i}>
                  <div
                    // @ts-ignore
                    key={med.id || med.image.id}
                  >
                    <MediaFile
                      tabIndex="0"
                      className={`w-full !aspect-square object-contain rounded-[10px] h-full cursor-pointer`}
                      data={data}
                      sizes={
                        '(min-width: 64em) 30vw, (min-width: 48em) 25vw, 90vw'
                      }
                      // @ts-ignore
                      options={{
                        crop: 'center',
                        scale: 2,
                      }}
                      {...mediaProps}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
