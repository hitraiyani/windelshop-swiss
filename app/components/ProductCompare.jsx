import React, { useContext, useEffect } from 'react'
import {useFetcher} from '@remix-run/react';
import {WishlistContext } from '~/store/WishlistContext';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';

import {
    Text,
    CompareAtPrice,
    AddToCartButton,
    IconCart,
    Link,
    Button
  } from '~/components';
  import {isDiscounted, stringTruncate, translate, productTranslate} from '~/lib/utils';

export function ProductCompare({locale}) {
    const {load, data, state} = useFetcher();

  const {productCompareItems, removeFromProductCompare } = useContext(WishlistContext);

  useEffect(() => {
    load(
      `/api/userWishListProducts?products=${JSON.stringify(productCompareItems)}`,
    );
  }, [productCompareItems]);


  return (
     <>
        {!data ? (
          'Loading...'
        ) : (
          <>
          {data?.products.length > 0 && (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <td colSpan="5" className="py-2 px-4 border-b border-gray-200">
                  <strong>{translate("product_compare",locale)}</strong>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">{translate("product",locale)}</th>
                {data?.products.map((product) => (
                  <td
                    key={product.id}
                    className="py-2 px-4 border-b border-gray-200"
                  >
                    <Link to={`/products/${product.handle}`} className="font-bold">{ productTranslate(product,'title',locale) }</Link>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">{translate("Bild",locale)}</th>
                {data?.products.map((product) => {
                  const cardProduct = product?.variants ? product : {};
                  if (!cardProduct?.variants?.nodes?.length) return null;

                  const firstVariant = flattenConnection(cardProduct.variants)[0];

                  if (!firstVariant) return null;
                  const {image} = firstVariant;
                  return (
                    <td
                      key={product.id}
                      className="py-2 px-4 border-b border-gray-200"
                    >
                      {image && (
                        <Image
                          width={220}
                          height={220}
                          data={image}
                          className="object-cover justify-center object-center w-24 h-24 border rounded md:w-28 md:h-28"
                          alt={product.title}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">{translate("price",locale)}</th>
                {data?.products.map((product) => {
                  const cardProduct = product?.variants ? product : {};
                  if (!cardProduct?.variants?.nodes?.length) return null;

                  const firstVariant = flattenConnection(cardProduct.variants)[0];

                  if (!firstVariant) return null;
                  const {image, price, compareAtPrice} = firstVariant;

                  const selectedVariant = product.selectedVariant ?? firstVariant;
                  const isOutOfStock = !selectedVariant?.availableForSale;

                  return (
                    <td
                      key={product.id}
                      className="py-2 px-4 border-b border-gray-200"
                    >
                      <Text className="flex gap-3 text-xs md:text-base lg:text-lg font-bold text-black">
                        <Money withoutTrailingZeros data={price} />
                        {isDiscounted(price, compareAtPrice) && (
                          <CompareAtPrice
                            className={'text-black line-through font-medium'}
                            data={compareAtPrice}
                          />
                        )}
                      </Text>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">
                  {translate("summary",locale)}
                </th>
                {data?.products.map((product) => {
                  return (
                    <td
                      key={product.id}
                      className="py-2 px-4 border-b border-gray-200"
                    >
                      {stringTruncate(productTranslate(product,'description',locale).replaceAll(/<\/?[^>]+(>|$)/gi, ""), 150)}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200"></th>
                {data?.products.map((product) => {
                  const cardProduct = product?.variants ? product : {};
                  if (!cardProduct?.variants?.nodes?.length) return null;

                  const firstVariant = flattenConnection(cardProduct.variants)[0];

                  if (!firstVariant) return null;
                  const {image, price, compareAtPrice} = firstVariant;

                  const selectedVariant = product.selectedVariant ?? firstVariant;
                  const isOutOfStock = !selectedVariant?.availableForSale;

                  return (
                    <td
                      key={product.id}
                      className="py-2 px-4 border-b border-gray-200"
                    >
                      {isOutOfStock ? (
                        <Button
                          variant="secondary"
                          disabled
                          className='bg-[#0A627E] rounded-[100px] w-full py-[15px] px-[15px] text-white text-center uppercase text-[15px] leading-none font-["Open_Sans"] font-bold flex gap-[5px] min-h-[52px] transition-all duration-500 hover:opacity-70 items-center justify-center'
                        >
                          <Text>{translate("sold_out",locale)}</Text>
                        </Button>
                      ) : (
                        <AddToCartButton
                          lines={[
                            {
                              merchandiseId: selectedVariant.id,
                              quantity: 1,
                            },
                          ]}
                          className='bg-[#0A627E] rounded-[100px] w-full py-[15px] px-[15px] text-white text-center uppercase text-[15px] leading-none font-["Open_Sans"] font-bold flex gap-[5px] min-h-[52px] transition-all duration-500 hover:opacity-70 items-center justify-center'
                          data-test="add-to-cart"
                        >
                          <IconCart className={'w-[15px] h-[14px]'} />+ {translate("add_to_cart",locale)}
                        </AddToCartButton>
                      )}
                      <button
                        onClick={() => {
                          removeFromProductCompare(product.id);
                        }}
                        className='bg-[#dc3545] rounded-[100px] mt-2 w-full py-[15px] px-[15px] text-white text-center uppercase text-[15px] leading-none font-["Open_Sans"] font-bold flex gap-[5px] min-h-[52px] transition-all duration-500 hover:opacity-70 items-center justify-center'
                      >
                        {translate("remove",locale)}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        )}
        {data?.products.length == 0 && (
          <section className="grid gap-6">
            <Text format>
                {translate("no_product_compare",locale)}
            </Text>
            <div>
              <Link to={'/'}>{translate("procesed_compare",locale)}</Link>
            </div>
          </section>
        )}
          </>
        )}
     </>
  );
}
