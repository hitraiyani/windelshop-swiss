import React from 'react'
import {Wishlist} from '~/components/Wishlist';
import {seoPayload} from '~/lib/seo.server';
import {json} from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { translate} from '~/lib/utils';

export const loader = async ({request, context: {storefront}}) => {
  const {language, country} = storefront.i18n;

  const seo = seoPayload.customPage({title : translate('my_favorite', storefront.i18n.language), url: request.url});

  return json(
    { seo,language},
    { 
    },
  );
};
export default function wishlist() {
  const {
    seo,
    language,
  } = useLoaderData();
  
  return (
    <div className="grid w-full gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start">
      
        <Wishlist locale={language} />
    </div>
  )
}
