import {useEffect, useState} from 'react';
import {AICO_API_URL, AICO_API_TOKEN, STORE_LOCALE} from '~/lib/const';
import {
  Link
} from '~/components';

export function ShoppingByBrands({className}) {
  const [brandData, setbrandData] = useState([]);

  const loadBrandData = async () => {
    const brandResponse = await fetch(
      `${AICO_API_URL}brands?filter[isTopBrand]=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AICO_API_TOKEN}`,
        },
      },
    );
    const brandResponseData = await brandResponse.json();
    setbrandData(brandResponseData.data);
  };

  useEffect(() => {
    loadBrandData();
  }, []);


  return (
    <section className={`${className} shopping-by-brands-section py-[50px]`}>
      <div className="container">
        <div className="title-wrap mb-[70px]">
          <h2 className="text-black text-[24px] font-bold text-center">
            Einkaufen nach Marken
          </h2>
        </div>
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
                  <li key={index} className="w-[217px] h-[152px] flex items-center justify-center bg-[#E7EFFF] bg-opacity-[0.4] rounded-[10px]">
                    <Link to={'/'} className="p-[20px] block w-full h-full">
                      <img
                        className="w-full h-full object-contain transition-all duration-500"
                        src={brandImage}
                        alt=""
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
