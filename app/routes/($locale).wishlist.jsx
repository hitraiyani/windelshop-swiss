import React from 'react'
import {Wishlist} from '~/components';
import {seoPayload} from '~/lib/seo.server';
import {json} from '@shopify/remix-oxygen';



export const loader = async ({request, context: {storefront}}) => {
  
  const seo = seoPayload.customPage({title : 'Meine Favoriten', url: request.url});

  return json(
    { seo},
    { 
    },
  );
};
export default function wishlist() {
  return (
    <div className="grid w-full gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start">
        < Wishlist />
    </div>
  )
}
