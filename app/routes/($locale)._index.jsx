import {defer, json} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {
  ProductSwimlane,
  FeaturedCollections,
  Hero,
  HeroSlider,
  BestsellerCategories,
  NewInTheShop,
  CtaBanner,
  Popularproducts,
  CustomerSatisfaction,
  Bestseller,
  ShoppingByBrands,
  ProductsByBrands,
  SeasonalSets,
  QuickRequest,
  Reviews,
  Faq,
  Subscribe,
} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';

export const headers = routeHeaders;
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export async function action({request}) {
  const formData = await request.formData();
  const inquiryData = Object.fromEntries(formData);
  console.log(inquiryData);
  const responseData = {
    status: false,
    message: 'E-Mail ist obligatorisch.',
  };

  if (inquiryData.name.trim().length < 3) {
    responseData.status = false;
    responseData.message = 'Invalid name - must be at least 3 characters long.';
  } else if (!isValidEmail(inquiryData.email)) {
    responseData.status = false;
    responseData.message = 'Email ist ungültig.';
  } else if (inquiryData.inquiry.trim().length < 5) {
    responseData.status = false;
    responseData.message =
      'Invalid inquiry - must be at least 5 characters long.';
  } else {
    responseData.status = true;
    responseData.message = 'success';
  }

  return responseData;

  return json({
    ...responseData,
  });
}
export async function loader({params, context}) {
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop, hero, home_hero_slider} = await context.storefront.query(
    HOMEPAGE_SEO_QUERY,
    {
      variables: {handle: 'freestyle'},
    },
  );

  const {data: productsbyBrandMetaInfo} = await context.storefront.query(
    HOMEPAGE_PRODUCTS_BY_BRAND_QUERY,
    {
      variables: {metaObjectId: 'gid://shopify/Metaobject/1700102421'},
    },
  );

  const seo = seoPayload.home();

  return defer(
    {
      shop,
      primaryHero: hero,
      homeHeroSlider: home_hero_slider,
      bestsellerCategories: context.storefront.query(
        HOMEPAGE_TOP_COLLECTION_QUERY,
        {
          variables: {metaObjectId: 'gid://shopify/Metaobject/1672904981'},
        },
      ),
      bestsellerProducts: context.storefront.query(
        HOMEPAGE_BEST_SELLER_PRODUCTS_QUERY,
        {
          variables: {metaObjectId: 'gid://shopify/Metaobject/1691681045'},
        },
      ),
      sleepingChildBanner: context.storefront.query(
        HOMEPAGE_SLEEPING_CHILD_BANNER_QUERY,
        {
          variables: {metaObjectId: 'gid://shopify/Metaobject/1691582741'},
        },
      ),
      seasonalSets: context.storefront.query(HOMEPAGE_SEASONAL_SETS_QUERY, {
        variables: {metaObjectId: 'gid://shopify/Metaobject/1692401941'},
      }),
      faqSets: context.storefront.query(FAQ_SETS_QUERY, {
        variables: {metaObjectId: 'gid://shopify/Metaobject/1710620949'},
      }),

      productsbyBrandMetaInfo,
      productsByBrandsData: context.storefront.query(
        HOMEPAGE_PRODUCTS_BY_VENDOR_QUERY,
        {
          variables: {
            brandNameOneQuery: `vendor:"${productsbyBrandMetaInfo.brand_name_1.value}"`,
            brandNameTwoQuery: `vendor:"${productsbyBrandMetaInfo.brand_name_2.value}"`,
          },
        },
      ),
      // These different queries are separated to illustrate how 3rd party content
      // fetching can be optimized for both above and below the fold.
      latestProducts: context.storefront.query(HOMEPAGE_LATEST_PRODUCTS_QUERY, {
        variables: {
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      }),
      analytics: {
        pageType: AnalyticsPageType.home,
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

export default function Homepage() {
  const {
    primaryHero,
    homeHeroSlider,
    bestsellerCategories,
    bestsellerProducts,
    productsbyBrandMetaInfo,
    productsByBrandsData,
    seasonalSets,
    faqSets,
    latestProducts,
    sleepingChildBanner,
  } = useLoaderData();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <>
      <HeroSlider slides={homeHeroSlider?.nodes} />
      {bestsellerCategories && (
        <Suspense>
          <Await resolve={bestsellerCategories}>
            {({data}) => {
              if (!data) return <></>;
              return <BestsellerCategories data={data} />;
            }}
          </Await>
        </Suspense>
      )}

      <CustomerSatisfaction className={''} />
      {latestProducts && (
        <Suspense>
          <Await resolve={latestProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <NewInTheShop products={products.nodes} title="Neu im Shop" />
              );
            }}
          </Await>
        </Suspense>
      )}
      {sleepingChildBanner && (
        <Suspense>
          <Await resolve={sleepingChildBanner}>
            {({data}) => {
              return <CtaBanner banner={data.banner} />;
            }}
          </Await>
        </Suspense>
      )}
      <Popularproducts className={''} />
      {bestsellerProducts && (
        <Suspense>
          <Await resolve={bestsellerProducts}>
            {({data}) => {
              return (
                <Bestseller
                  products={data?.products?.references?.edges}
                  title={data?.title?.value}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
      <ShoppingByBrands className={''} />
      {productsByBrandsData && (
        <Suspense>
          <Await resolve={productsByBrandsData}>
            {(data) => {
              return (
                <ProductsByBrands
                  brand_one_products={{
                    ...data.brand_one_products,
                    brand_image_1: productsbyBrandMetaInfo.brand_image_1,
                  }}
                  brand_two_products={{
                    ...data.brand_two_products,
                    brand_image_2: productsbyBrandMetaInfo.brand_image_2,
                  }}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
      {seasonalSets && (
        <Suspense>
          <Await resolve={seasonalSets}>
            {({data}) => {
              return <SeasonalSets data={data} />;
            }}
          </Await>
        </Suspense>
      )}

      {/* <SeasonalSets className={''} /> */}
      <QuickRequest className={''} />
      <Reviews className={''} />
      {faqSets && (
        <Suspense>
          <Await resolve={faqSets}>
            {({data}) => {
              return <Faq data={data} />;
            }}
          </Await>
        </Suspense>
      )}

      <Subscribe className={''} />
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
`;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    home_hero_slider : metaobjects(type: "home_hero_slider", first: 5) {
      nodes {
        id
        heading: field(key: "heading") {
          value
        }
        sub_heading: field(key: "sub_heading") {
          value
        }
        main_image: field(key: "main_image") {
          reference {
            ...Media
          }
        }
        sub_image: field(key: "sub_image") {
          reference {
            ...Media
          }
        }
        cta_label: field(key: "cta_label") {
          value
        }
        cta_redirect: field(key: "cta_redirect") {
          value
        }
      }
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
`;

const HOMEPAGE_BEST_SELLER_PRODUCTS_QUERY = `#graphql
  query homeTopCollections($metaObjectId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    data : metaobject(id : $metaObjectId) {
      handle
      id
      type
      title : field(key: "title") {
        value
      }
      collection_images_override : field(key: "collection_images_override") {
        value
      }
      products: field(key: "products") {
        references(first: 5) {
          edges {
            node {
              ... on Product {
                ...ProductCard
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

const HOMEPAGE_TOP_COLLECTION_QUERY = `#graphql
  query homeTopCollections($metaObjectId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    data : metaobject(id : $metaObjectId) {
      handle
      id
      type
      title : field(key: "title") {
        value
      }
      collection_images_override : field(key: "collection_images_override") {
        value
      }
      collections : field(key: "collections") {
        references(first: 5) {
          edges {
            node {
              ... on Collection {
                id
                handle
                title
                image {
                  id
                  url
                }
                products(first: 1) {
                  nodes {
                    id
                    handle
                    variants(first: 1) {
                      nodes {
                        id
                        image {
                          id
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
      
  }
`;
const HOMEPAGE_SLEEPING_CHILD_BANNER_QUERY = `#graphql
${MEDIA_FRAGMENT}
  query homeTopCollections($metaObjectId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    data : metaobject(id : $metaObjectId) {
      handle
      id
      type
      banner : field(key: "banner") {
        reference {
          ...Media
        }
      }
    }
      
  }
`;

const HOMEPAGE_PRODUCTS_BY_BRAND_QUERY = `#graphql
${MEDIA_FRAGMENT}
  query homeTopCollections($metaObjectId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    data : metaobject(id : $metaObjectId) {
      handle
      id
      type
      brand_name_1 : field(key: "brand_name_1") {
        value
      }
      brand_name_2 : field(key: "brand_name_2") {
        value
      }
      brand_image_1 : field(key: "brand_image_1") {
        reference {
          ...Media
        }
      }
      brand_image_2 : field(key: "brand_image_2") {
        reference {
          ...Media
        }
      }
    }
  }
`;

const HOMEPAGE_SEASONAL_SETS_QUERY = `#graphql
${MEDIA_FRAGMENT}
  query homeTopCollections($metaObjectId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    data : metaobject(id : $metaObjectId) {
      handle
      id
      type
      title : field(key: "title") {
        value
      }
      set_1_title : field(key: "set_1_title") {
        value
      }
      set_1_image : field(key: "set_1_image") {
        reference {
          ...Media
        }
      }
      set_1_redirect : field(key: "set_1_redirect") {
        value
      }
      set_2_title : field(key: "set_2_title") {
        value
      }
      set_2_image : field(key: "set_2_image") {
        reference {
          ...Media
        }
      }
      set_2_redirect : field(key: "set_2_redirect") {
        value
      }
      set_3_title : field(key: "set_3_title") {
        value
      }
      set_3_image : field(key: "set_3_image") {
        reference {
          ...Media
        }
      }
      set_3_redirect : field(key: "set_3_redirect") {
        value
      }
    }
  }
`;

const FAQ_SETS_QUERY = `#graphql
  query homeTopCollections($metaObjectId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    data : metaobject(id : $metaObjectId) {
      id  
      title : field(key: "title") {
        value
      }
       description : field(key: "description") {
        value
      }
       faq_json : field(key: "faq_data") {
        value
      }
    }
  }
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/products
export const HOMEPAGE_PRODUCTS_BY_VENDOR_QUERY = `#graphql
  query homepagelatestProducts($country: CountryCode, $language: LanguageCode, $brandNameOneQuery: String, $brandNameTwoQuery: String)
  @inContext(country: $country, language: $language) {
    brand_one_products :  products(first: 10, query: $brandNameOneQuery) {
      nodes {
        ...ProductCard
      }
    }
    brand_two_products :  products(first: 10, query: $brandNameTwoQuery) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/products
export const HOMEPAGE_LATEST_PRODUCTS_QUERY = `#graphql
  query homepagelatestProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
