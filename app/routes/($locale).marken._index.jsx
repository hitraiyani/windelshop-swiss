import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from '@remix-run/react';

import {seoPayload} from '~/lib/seo.server';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';

import {useEffect, useState} from 'react';
import {AICO_API_URL, AICO_API_TOKEN, STORE_LOCALE} from '~/lib/const';
import {translate} from '~/lib/utils';

import {
  Section,
  Text,
} from '~/components';
import { Image } from '@shopify/hydrogen';

export const headers = routeHeaders;

export const loader = async ({request, context: {storefront}}) => {
  const {language, country} = storefront.i18n;

  const seo = seoPayload.customPage({
    title: translate('marken', storefront.i18n.language),
    url: request.url,
  });

  return json({seo, language}, {});
};

export default function Marken() {
  const {seo, language} = useLoaderData();

  const [brandData, setbrandData] = useState([]);
  const [isloading, setIsLoading] = useState(true);


  const loadBrandData = async () => {
    //?filter[isTopBrand]=1
    const brandResponse = await fetch(
      `${AICO_API_URL}brands`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AICO_API_TOKEN}`,
        },
      },
    );
    const brandResponseData = await brandResponse.json();

    //console.log(brandResponseData.data);

    const brandResponseNew =  brandResponseData.data.sort((a, b) => b.attributes.isTopBrand - a.attributes.isTopBrand);
     console.log(brandResponseNew);
     console.log("brandResponseNew");
   // setbrandData(brandResponseData.data);
   setbrandData(brandResponseNew);
    setIsLoading(false);
  };
  useEffect(() => {
    loadBrandData();
  }, []);
  

  return (
    <>
     
      <section className={`shopping-by-brands-section py-[15px] md:py-[30px]`}>
        <div className="container">
          <div className="title-wrap mb-[22px]">
            <h2 className="text-black text-[24px] font-bold text-center">
              {translate('shop_by_brand', language)}
            </h2>
          </div>
          {isloading && <><h2>Loading...</h2></>}
          <div className="logo-lists-wrap">
            <div className="logo-list">
              <ul className="flex flex-wrap gap-x-[14px] gap-y-[12px] max-w-[910px] items-center justify-center mx-auto">
                {brandData?.map((item, index) => {
                  let brandImage = '';
                  let brandRedirectUrl = '';
                  if (item?.attributes?.translations != null) {
                    const itemTrans = item?.attributes?.translations;
                    for (var nc = 0; nc < itemTrans.length; nc++) {
                      if (itemTrans[nc].locale == STORE_LOCALE) {
                        brandImage = itemTrans[nc].image;
                        brandRedirectUrl = itemTrans[nc].videoUrl;
                        var prefix = 'http://';
                        if (
                          brandRedirectUrl &&
                          brandRedirectUrl.substr(0, prefix.length) !== prefix
                        ) {
                          brandRedirectUrl = prefix + brandRedirectUrl;
                        }
                      }
                    }
                  }
                  return (
                    <div   key={index}>
                    {brandImage != null && (
                      <li
                      key={index}
                      className=" w-[117px] md:w-[197px] lg:w-[217px] h-[92px] md:h-[132px] lg:h-[152px] flex items-center justify-center bg-[#E5EFD4] bg-opacity-[0.4] rounded-[10px] relative overflow-hidden"
                    >
                     
                        <Link
                        to={'/'}
                        className="block w-full h-full absolute inset-0"
                      >
                        <img
                          className="p-[5px] md:p-[10px] lg:p-[20px] w-full h-full object-contain transition-all duration-500 absolute inset-0"
                          src={brandImage}
                          alt=""
                        />
                      </Link>
                      
                      
                      
                    </li>
                    )}
                    
                    </div>
                  );

                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
