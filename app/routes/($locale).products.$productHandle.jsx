import {useRef, Suspense, useMemo, useState} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {defer} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Await,
  useSearchParams,
  useLocation,
  useNavigation,
} from '@remix-run/react';
import {AnalyticsPageType, Money, ShopPayButton} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';

import {
  Heading,
  IconCaret,
  IconCheck,
  IconClose,
  ProductGallery,
  ProductSwimlane,
  Section,
  Skeleton,
  Text,
  Link,
  AddToCartButton,
  Button,
  IconPlus,
  IconMinus,
  IconCart,
  IconWhishlist,
  IconCompar,
  IconStar,
  Tabs,
} from '~/components';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';

export const headers = routeHeaders;

export async function loader({params, request, context}) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const searchParams = new URL(request.url).searchParams;

  const selectedOptions = [];
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productAnalytics = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return defer(
    {
      product,
      shop,
      storeDomain: shop.primaryDomain.url,
      recommended,
      analytics: {
        pageType: AnalyticsPageType.product,
        resourceId: product.id,
        products: [productAnalytics],
        totalValue: parseFloat(selectedVariant.price.amount),
      },
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
}

export default function Product() {
  const {product, shop, recommended} = useLoaderData();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;

  return (
    <>
      <Section className="py-[50px] product-summary">
        <div className="container">
          <div className="flex flex-row gap-[33px]">
            <ProductGallery
              media={media.nodes}
              className="w-[516px] product-gallery-wrap"
            />
            <div className="flex-1">
              <section className="product-info">
                <div className="stock-delivery-info">
                  <div className="inner flex flex-wrap gap-[16px] items-center">
                    <span className='rounded-[20px] bg-[#26D12D] uppercase text-[11px] leading-none font-["Open_Sans"] font-semibold p-[5px] min-h-[27px] min-w-[106px] flex items-center justify-center text-center text-white'>
                      IN STOCK
                    </span>
                    <span className='rounded-[20px] bg-white uppercase text-[11px] leading-none font-["Open_Sans"] font-semibold p-[5px] min-h-[27px] min-w-[106px] flex items-center justify-center text-center text-black'>
                      delivery tomorrow
                    </span>
                  </div>
                </div>
                <div className="grid gap-2 mt-[7px] mb-[38px]">
                  <Heading
                    as="h1"
                    className="text-[28px] text-[#0A627E] font-bold"
                  >
                    {title}
                  </Heading>
                  {/* {vendor && (
                  <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                )} */}
                </div>
                <ProductForm />
                <div className="tab-wrap border-t-[1px] border-[#E7EFFF] pt-[34px] mt-[35px]">
                  <Tabs>
                    <div label="Beschreibung">
                     <div className='tab-content'>
                      <h4 className='text-[19px] text-[#0A627E] font-bold mb-[15px]'>Pampers Baby-Dry Gr.3 Midi 6-10kg (52 STK) Sparpack</h4>
                      <div className='desc text-[#666666] text-[14px] font-normal mb-[24px]'>
                        <p>Babys bewegen sich ständig im Schlaf. Deshalb bieten Pampers Baby-Dry mit Stop & Schutz Täschchen am Rücken bis zu 100 % Auslaufschutz die ganze Nacht. Die Sicherheit des Babys steht an erster Stelle. Pampers Baby-Dry Windeln enthalten 0% EU-Parfümallergene (gemäß EU-Kosmetikverordnung Nr. 1223/2009) und sind dermatologisch getestet. Sie sind getestet und zertifiziert gemäss Oeko-Tex-Standard 100.</p>
                        <ul>
                          <li>Mit Stop & Schutz Täschchen, das ein Auslaufen am Rücken verhindert</li>
                        </ul>
                      </div>
                     </div>
                    </div>
                    <div label="Schnellsuche">
                      <em>React</em> a JavaScript library for building user
                      interfaces.
                    </div>
                    <div label="Bewertungen (0)">
                      <em>Redux</em> is a predictable state container for
                      JavaScript apps.
                    </div>
                  </Tabs>
                </div>
                {/* <div className="grid gap-4 py-4">
                  {descriptionHtml && (
                    <ProductDetail
                      title="Product Details"
                      content={descriptionHtml}
                    />
                  )}
                  {shippingPolicy?.body && (
                    <ProductDetail
                      title="Shipping"
                      content={getExcerpt(shippingPolicy.body)}
                      learnMore={`/policies/${shippingPolicy.handle}`}
                    />
                  )}
                  {refundPolicy?.body && (
                    <ProductDetail
                      title="Returns"
                      content={getExcerpt(refundPolicy.body)}
                      learnMore={`/policies/${refundPolicy.handle}`}
                    />
                  )}
                </div> */}
              </section>
            </div>
          </div>
        </div>
      </Section>
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <ProductSwimlane title="Related Products" products={products} />
          )}
        </Await>
      </Suspense>
    </>
  );
}

export function ProductForm() {
  const {product, analytics, storeDomain} = useLoaderData();

  const [currentSearchParams] = useSearchParams();
  const {location} = useNavigation();

  /**
   * We update `searchParams` with in-flight request data from `location` (if available)
   * to create an optimistic UI, e.g. check the product option before the
   * request has completed.
   */
  const searchParams = useMemo(() => {
    return location
      ? new URLSearchParams(location.search)
      : currentSearchParams;
  }, [currentSearchParams, location]);

  const firstVariant = product.variants.nodes[0];

  /**
   * We're making an explicit choice here to display the product options
   * UI with a default variant, rather than wait for the user to select
   * options first. Developers are welcome to opt-out of this behavior.
   * By default, the first variant's options are used.
   */
  const searchParamsWithDefaults = useMemo(() => {
    const clonedParams = new URLSearchParams(searchParams);

    for (const {name, value} of firstVariant.selectedOptions) {
      if (!searchParams.has(name)) {
        clonedParams.set(name, value);
      }
    }

    return clonedParams;
  }, [searchParams, firstVariant.selectedOptions]);

  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const productAnalytics = {
    ...analytics.products[0],
    quantity: 1,
  };

  return (
    <div className="productForm-col">
      <div className="price-col">
        <div className="Price">
          <div className="discount-price flex flex-wrap items-center gap-[16px]">
            <span className="line-through text-black text-[22px] font-normal leading-none">
              CHF <span className="font-bold">21.95</span>
            </span>
            <span className="off bg-[#D12631] rounded-[20px] px-[10px] py-[3px] font-normal text-white text-[20px] uppercase font-['Open_Sans']">
              -28%
            </span>
          </div>
          <div className="sale-price text-[#D12631] text-[28px] font-normal mt-[16px] flex items-center gap-x-[74px]">
            <span>
              CHF <span className="font-bold">15.90</span>
            </span>
            <span className="price-without-VAT text-black text-opacity-[50%] text-[18px] font-medium">
              Preis ohne MWST CHF 14.76
            </span>
          </div>
        </div>
      </div>
      <div className="product-options-wrap border-t-[1px] border-[#E7EFFF] mt-[46px] pt-[37px] flex flex-row gap-[52px]">
        <ProductOptions
          options={product.options}
          searchParamsWithDefaults={searchParamsWithDefaults}
        />
      </div>
      <div className="product-crowd pt-[50px]">
        <h2 className='title mb-[17px] text-[14px] text-[#666666] uppercase font-bold font-["Open_Sans"]'>
          Menge
        </h2>
        <div className="col-inner flex justify-between gap-[20px]">
          <div className="flex w-[60%] flex-wrap gap-[20px]">
            <QuantityComponent />
            <div className="pro-btns flex flex-col flex-1">
              <button className='bg-[#0A627E] rounded-[100px] w-full py-[15px] px-[15px] text-white text-center uppercase text-[15px] leading-none font-["Open_Sans"] font-bold flex gap-[5px] min-h-[52px] transition-all duration-500 hover:opacity-70 items-center justify-center'>
                <IconCart className={'w-[15px] h-[14px]'} /> + Jetzt kaufen
              </button>
              <div className="btn-group flex items-center justify-center gap-[30px] mt-[11px]">
                <button className='flex items-center gap-[3px] text-black uppercase leading-none text-[11px] font-semibold font-["Open_Sans"] transition-all duration-500 hover:text-[#0A627E]'>
                  <IconWhishlist className={'w-[11px] h-[10px]'} />+ Wunschliste
                </button>
                <button className='flex items-center gap-[3px] text-black uppercase leading-none text-[11px] font-semibold font-["Open_Sans"] transition-all duration-500 hover:text-[#0A627E]'>
                  <IconCompar className={'w-[14px] h-[11px]'} />+ Vergleich
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 rating-wrap">
            <div className="flex gap-[7px] items-center text-black font-semibold font-['Open_Sans'] py-[17px] justify-end">
              <div className="rating flex gap-[3px] text-[#18A1DC]">
                <IconStar className={'w-[17px] h-[15px]'} />
                <IconStar className={'w-[17px] h-[15px]'} />
                <IconStar className={'w-[17px] h-[15px] fill-black'} />
                <IconStar className={'w-[17px] h-[15px]'} />
                <IconStar className={'w-[17px] h-[15px]'} />
              </div>
              <span>0 Bewertungen / + Bewertung</span>
            </div>
          </div>
        </div>
      </div>
      {/* {selectedVariant && (
          <div className="grid items-stretch gap-4">
            {isOutOfStock ? (
              <Button variant="secondary" disabled>
                <Text>Sold out</Text>
              </Button>
            ) : (
              <AddToCartButton
                lines={[
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                  },
                ]}
                variant="primary"
                data-test="add-to-cart"
                analytics={{
                  products: [productAnalytics],
                  totalValue: parseFloat(productAnalytics.price),
                }}
              >
                <Text
                  as="span"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Add to Cart</span> <span>·</span>{' '}
                  <Money
                    withoutTrailingZeros
                    data={selectedVariant?.price}
                    as="span"
                  />
                  {isOnSale && (
                    <Money
                      withoutTrailingZeros
                      data={selectedVariant?.compareAtPrice}
                      as="span"
                      className="opacity-50 strike"
                    />
                  )}
                </Text>
              </AddToCartButton>
            )}
            {!isOutOfStock && (
              <ShopPayButton
                width="100%"
                variantIds={[selectedVariant?.id]}
                storeDomain={storeDomain}
              />
            )}
          </div>
        )} */}
    </div>
  );
}

function QuantityComponent() {
  const [quantity, setQuantity] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <div className="flex items-center flex-wrap">
      <input
        type="number"
        id="quantity"
        className='h-[52px] w-[80px] flex items-center justify-center border-[2px] !border-[#18A1DC] rounded-[10px] mr-[9px] text-[16px] font-bold font-["Open_Sans"] text-[#18A1DC] !ring-0 !shadow-none appearance-none text-center'
        value={quantity}
      />
      <button
        onClick={decreaseQuantity}
        disabled={quantity === 0}
        className={`${
          quantity === 0 ? '!bg-[#E7EFFF]' : ''
        } w-[37px] h-[37px] flex items-center justify-center text-[14px] text-[#18A1DC] bg-[#CCDDF1] rounded-[100px] mr-[2px]`}
      >
        <IconMinus />
      </button>
      <button
        onClick={increaseQuantity}
        className="w-[37px] h-[37px] flex items-center justify-center text-[14px] text-[#18A1DC] bg-[#CCDDF1] rounded-[100px] mr-[2px]"
      >
        <IconPlus />
      </button>
    </div>
  );
}

function ProductOptions({options, searchParamsWithDefaults}) {
  const closeRef = useRef(null);
  return (
    <>
      {options
        .filter((option) => option.values.length > 1)
        .map((option) => (
          <div key={option.name} className="flex flex-col flex-wrap gap-[17px]">
            <Heading
              as="legend"
              size="lead"
              className="text-[14px] text-[#666666] uppercase font-bold font-['Open_Sans']"
            >
              {option.name}
            </Heading>
            <div className="flex flex-wrap gap-[6px]">
              {/**
               * First, we render a bunch of <Link> elements for each option value.
               * When the user clicks one of these buttons, it will hit the loader
               * to get the new data.
               *
               * If there are more than 7 values, we render a dropdown.
               * Otherwise, we just render plain links.
               */}
              {option.values.length > 7 ? (
                <div className="relative w-full">
                  <Listbox>
                    {({open}) => (
                      <>
                        <Listbox.Button
                          ref={closeRef}
                          className={clsx(
                            'flex items-center justify-between w-full py-3 px-4 border border-primary',
                            open
                              ? 'rounded-b md:rounded-t md:rounded-b-none'
                              : 'rounded',
                          )}
                        >
                          <span>
                            {searchParamsWithDefaults.get(option.name)}
                          </span>
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Listbox.Button>
                        <Listbox.Options
                          className={clsx(
                            'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b',
                            open ? 'max-h-48' : 'max-h-0',
                          )}
                        >
                          {option.values.map((value) => (
                            <Listbox.Option
                              key={`option-${option.name}-${value}`}
                              value={value}
                            >
                              {({active}) => (
                                <ProductOptionLink
                                  optionName={option.name}
                                  optionValue={value}
                                  className={clsx(
                                    'text-primary w-full p-2 transition rounded flex justify-start items-center text-left cursor-pointer',
                                    active && 'bg-primary/10',
                                  )}
                                  searchParams={searchParamsWithDefaults}
                                  onClick={() => {
                                    if (!closeRef?.current) return;
                                    closeRef.current.click();
                                  }}
                                >
                                  {value}
                                  {searchParamsWithDefaults.get(option.name) ===
                                    value && (
                                    <span className="ml-2">
                                      <IconCheck />
                                    </span>
                                  )}
                                </ProductOptionLink>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </>
                    )}
                  </Listbox>
                </div>
              ) : (
                <>
                  {option.values.map((value) => {
                    const checked =
                      searchParamsWithDefaults.get(option.name) === value;
                    const id = `option-${option.name}-${value}`;

                    return (
                      <Text key={id} className={'w-fit min-h-[52px]'}>
                        <ProductOptionLink
                          optionName={option.name}
                          optionValue={value}
                          searchParams={searchParamsWithDefaults}
                          className={clsx(
                            'border-[2px] border-[#18A1DC] flex items-center justify-center transition-all duration-500 text-[#18A1DC] text-[16px] leading-none h-full w-full rounded-[10px] font-bold font-["Open_Sans"] px-[15px] py-[10px] hover:opacity-100 min-w-[60px]',
                            checked ? 'opacity-100 bg-[#E7EFFF]' : 'opacity-70',
                          )}
                        />
                      </Text>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

function ProductOptionLink({
  optionName,
  optionValue,
  searchParams,
  children,
  ...props
}) {
  const {pathname} = useLocation();
  const isLocalePathname = /\/[a-zA-Z]{2}-[a-zA-Z]{2}\//g.test(pathname);
  // fixes internalized pathname
  const path = isLocalePathname
    ? `/${pathname.split('/').slice(2).join('/')}`
    : pathname;

  const clonedSearchParams = new URLSearchParams(searchParams);
  clonedSearchParams.set(optionName, optionValue);

  return (
    <Link
      {...props}
      preventScrollReset
      prefetch="intent"
      replace
      to={`${path}?${clonedSearchParams.toString()}`}
    >
      {children ?? optionValue}
    </Link>
  );
}

function ProductDetail({title, content, learnMore}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({open}) => (
        <>
          <Disclosure.Button className="text-left">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={clsx(
                  'transition-transform transform-gpu duration-200',
                  !open && 'rotate-[45deg]',
                )}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{__html: content}}
            />
            {learnMore && (
              <div className="">
                <Link
                  className="pb-px border-b border-primary/30 text-primary/50"
                  to={learnMore}
                >
                  Learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

async function getRecommendedProducts(storefront, productId) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts
    .map((item) => item.id)
    .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);

  return mergedProducts;
}
