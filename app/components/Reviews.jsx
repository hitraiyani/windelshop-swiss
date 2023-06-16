import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconStar2} from '~/components';

export function Reviews({className}) {
  return (
    <section className={`${className} reviews-section py-[20px] md:py-[30px] xl:py-[40px] 2xl:py-[50px] overflow-hidden`}>
      <div className="container container-fluid-right">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-black text-[24px] font-bold text-left">
            Bewertungen
          </h2>
        </div>
        <div className="reviews-slider-wrap">
          <div className="reviews-slider">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={80}
              slidesPerView={3.5}
              // loop={true}
              autoHeight={false}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  spaceBetween: 15,
                  slidesPerView: 1.2,
                },
                768: {
                  spaceBetween: 30,
                  slidesPerView: 2.2,
                },
                1024: {
                  spaceBetween: 40,
                  slidesPerView: 2.5,
                },
                1280: {
                  spaceBetween: 60,
                  slidesPerView: 3.5,
                },
                1530: {
                  spaceBetween: 80,
                  slidesPerView: 3.5,
                },
              }}
              className="review-swiper !p-[20px] !m-[-20px]"
            >
              <SwiperSlide>
                <div className="review-item h-full">
                  <div className="review-item-inner overflow-hidden rounded-[17px] shadow-[1.71685px_3.43371px_8.58427px_rgba(0,0,0,0.15)] h-full flex flex-col">
                    <div className="review-star bg-[#E7EFFF] py-[20px]">
                      <div className="star flex gap-[10px] text-[#0A627E] justify-center">
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                      </div>
                    </div>
                    <div className='content bg-white pt-[15px] pb-[35px] flex flex-col h-full gap-y-[20px]'>
                      <div className='desc text-[14px] text-[#292929] font-normal px-[30px] text-center leading-[1.3] my-auto'>
                        <p>Wir sind seit 6 Jahren Kunde beim Windelshop und erhalten jeden Monat eine grosse Bestellung. Michael Hefti und sein ganzes Team sind super freundlich, hilfsbereit bei Fragen, unkompliziert und reagieren sehr schnell auf E-Mails & Bestellungen. Wir sind sehr zufrieden mit den Produkten, welche eine gute Qualität aufweisen! Eine bessere Preis-Leistung findet man sonst nirgends! Wirklich eine super Dienstleitung, die das Windelshop/Homerunner-Team liefert!</p>
                      </div>
                      <div className='name text-[17px] text-[#292929] text-center font-medium'>Kita Fuchsia</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="review-item h-full">
                  <div className="review-item-inner overflow-hidden rounded-[17px] shadow-[1.71685px_3.43371px_8.58427px_rgba(0,0,0,0.15)] h-full flex flex-col">
                    <div className="review-star bg-[#E7EFFF] py-[20px]">
                      <div className="star flex gap-[10px] text-[#0A627E] justify-center">
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                      </div>
                    </div>
                    <div className='content bg-white pt-[15px] pb-[35px] flex flex-col h-full gap-y-[20px]'>
                      <div className='desc text-[14px] text-[#292929] font-normal px-[30px] text-center leading-[1.3] my-auto'>
                        <p>Schnelle Lieferung und sehr kundenfreundlicher Service 👍 Habe nun schon mehrere Male bestellt und bin mit dem Service sehr zufrieden. Herzlichen Dank an das Team!</p>
                      </div>
                      <div className='name text-[17px] text-[#292929] text-center font-medium'>Rezzonico</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="review-item h-full">
                  <div className="review-item-inner overflow-hidden rounded-[17px] shadow-[1.71685px_3.43371px_8.58427px_rgba(0,0,0,0.15)] h-full flex flex-col">
                    <div className="review-star bg-[#E7EFFF] py-[20px]">
                      <div className="star flex gap-[10px] text-[#0A627E] justify-center">
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                      </div>
                    </div>
                    <div className='content bg-white pt-[15px] pb-[35px] flex flex-col h-full gap-y-[20px]'>
                      <div className='desc text-[14px] text-[#292929] font-normal px-[30px] text-center leading-[1.3] my-auto'>
                        <p>Top Preise, schnelle Lieferung und ausgezeichnete Dienstleistung und Kundenservice.Das Windelabo funktioniert super einfach und erleichtert mir und meiner Frau viel Aufwand und ist eine tolle Geschenksidee für andere Eltern!Unsere Lieblingsmarken sind die Pingu und Swilet Windeln welche perfekt passen und unser Kind sich mega wohlfühlt drin.</p>
                      </div>
                      <div className='name text-[17px] text-[#292929] text-center font-medium'>Aron Huber</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="review-item h-full">
                  <div className="review-item-inner overflow-hidden rounded-[17px] shadow-[1.71685px_3.43371px_8.58427px_rgba(0,0,0,0.15)] h-full flex flex-col">
                    <div className="review-star bg-[#E7EFFF] py-[20px]">
                      <div className="star flex gap-[10px] text-[#0A627E] justify-center">
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                      </div>
                    </div>
                    <div className='content bg-white pt-[15px] pb-[35px] flex flex-col h-full gap-y-[20px]'>
                      <div className='desc text-[14px] text-[#292929] font-normal px-[30px] text-center leading-[1.3] my-auto'>
                        <p>Super freundlich, sehr schnell und absolut faire Preise. Auch die Windelabos sind eine super Empfehlung/Geschenkidee!</p>
                      </div>
                      <div className='name text-[17px] text-[#292929] text-center font-medium'>Christian Kohler</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="review-item h-full">
                  <div className="review-item-inner overflow-hidden rounded-[17px] shadow-[1.71685px_3.43371px_8.58427px_rgba(0,0,0,0.15)] h-full flex flex-col">
                    <div className="review-star bg-[#E7EFFF] py-[20px]">
                      <div className="star flex gap-[10px] text-[#0A627E] justify-center">
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                        <IconStar2 className="w-[33px] h-[33px]" />
                      </div>
                    </div>
                    <div className='content bg-white pt-[15px] pb-[35px] flex flex-col h-full gap-y-[20px]'>
                      <div className='desc text-[14px] text-[#292929] font-normal px-[30px] text-center leading-[1.3] my-auto'>
                        <p>Wir sind seit 6 Jahren Kunde beim Windelshop und erhalten jeden Monat eine grosse Bestellung. Michael Hefti und sein ganzes Team sind super freundlich, hilfsbereit bei Fragen, unkompliziert und reagieren sehr schnell auf E-Mails & Bestellungen. Wir sind sehr zufrieden mit den Produkten, welche eine gute Qualität aufweisen! Eine bessere Preis-Leistung findet man sonst nirgends! Wirklich eine super Dienstleitung, die das Windelshop/Homerunner-Team liefert!</p>
                      </div>
                      <div className='name text-[17px] text-[#292929] text-center font-medium'>Kita Fuchsia</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
