import {defer} from '@shopify/remix-oxygen';
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
  Popularproducts2,
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
      seasonalSets: context.storefront.query(
        HOMEPAGE_SEASONAL_SETS_QUERY,
        {
          variables: {metaObjectId: 'gid://shopify/Metaobject/1692401941'},
        },
      ),
      // These different queries are separated to illustrate how 3rd party content
      // fetching can be optimized for both above and below the fold.
      latestProducts: context.storefront.query(
        HOMEPAGE_LATEST_PRODUCTS_QUERY,
        {
          variables: {
            /**
             * Country and language properties are automatically injected
             * into all queries. Passing them is unnecessary unless you
             * want to override them from the following default:
             */
            country,
            language,
          },
        },
      ),
      secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
        variables: {
          handle: 'backcountry',
          country,
          language,
        },
      }),
      featuredCollections: context.storefront.query(
        FEATURED_COLLECTIONS_QUERY,
        {
          variables: {
            country,
            language,
          },
        },
      ),
      tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
        variables: {
          handle: 'winter-2022',
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
    seasonalSets,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    latestProducts,
    sleepingChildBanner
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
      
      {/* <HeroSlider />
      <BestsellerCategories className={''} /> */}
      <CustomerSatisfaction className={''} />
      {latestProducts && (
        <Suspense>
          <Await resolve={latestProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <NewInTheShop
                  products={products.nodes}
                  title="Neu im Shop"
                />
              );
            }}
          </Await>
        </Suspense>
      )}
      {sleepingChildBanner && (
        <Suspense>
          <Await resolve={sleepingChildBanner}>
            {({data}) => {
              return(
                <CtaBanner banner={data.banner}/>
              )
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
      <Popularproducts2 className={''} />
      {seasonalSets && (
        <Suspense>
          <Await resolve={seasonalSets}>
            {({data}) => {
              return (
                <SeasonalSets data={data} />
              );
            }}
          </Await>
        </Suspense>
      )}
      
      {/* <SeasonalSets className={''} /> */}
      <QuickRequest className={''} />
      <Reviews className={''} />
      <Faq className={''} />
      <Subscribe className={''} />
      {/* {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )}

      {latestProducts && (
        <Suspense>
          <Await resolve={latestProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <ProductSwimlane
                  products={products.nodes}
                  title="Featured Products"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}

      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections.nodes}
                  title="Collections"
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )} */}
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
