import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {flattenConnection, AnalyticsPageType} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {
  PageHeader,
  Section,
  Text,
  SortFilter,
  ExpandingCard,
} from '~/components';
import {ProductGrid} from '~/components/ProductGrid';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {CACHE_SHORT, routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

const PAGINATION_SIZE = 48;

export async function loader({params, request, context}) {
  const {collectionHandle} = params;

  invariant(collectionHandle, 'Missing collectionHandle param');

  const searchParams = new URL(request.url).searchParams;
  const knownFilters = ['productVendor', 'productType'];
  const available = 'available';
  const variantOption = 'variantOption';
  const {sortKey, reverse} = getSortValuesFromParam(searchParams.get('sort'));
  const cursor = searchParams.get('cursor');
  const filters = [];
  const appliedFilters = [];

  for (const [key, value] of searchParams.entries()) {
    if (available === key) {
      filters.push({available: value === 'true'});
      appliedFilters.push({
        label: value === 'true' ? 'In stock' : 'Out of stock',
        urlParam: {
          key: available,
          value,
        },
      });
    } else if (knownFilters.includes(key)) {
      filters.push({[key]: value});
      appliedFilters.push({label: value, urlParam: {key, value}});
    } else if (key.includes(variantOption)) {
      const [name, val] = value.split(':');
      filters.push({variantOption: {name, value: val}});
      appliedFilters.push({label: val, urlParam: {key, value}});
    }
  }

  // Builds min and max price filter since we can't stack them separately into
  // the filters array. See price filters limitations:
  // https://shopify.dev/custom-storefronts/products-collections/filter-products#limitations
  if (searchParams.has('minPrice') || searchParams.has('maxPrice')) {
    const price = {};
    if (searchParams.has('minPrice')) {
      price.min = Number(searchParams.get('minPrice')) || 0;
      appliedFilters.push({
        label: `Min: $${price.min}`,
        urlParam: {key: 'minPrice', value: searchParams.get('minPrice')},
      });
    }
    if (searchParams.has('maxPrice')) {
      price.max = Number(searchParams.get('maxPrice')) || 0;
      appliedFilters.push({
        label: `Max: $${price.max}`,
        urlParam: {key: 'maxPrice', value: searchParams.get('maxPrice')},
      });
    }
    filters.push({
      price,
    });
  }

  const {collection, collections} = await context.storefront.query(
    COLLECTION_QUERY,
    {
      variables: {
        handle: collectionHandle,
        pageBy: PAGINATION_SIZE,
        cursor,
        filters,
        sortKey,
        reverse,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    },
  );

  if (!collection) {
    throw new Response('collection', {status: 404});
  }

  const collectionNodes = flattenConnection(collections);
  const seo = seoPayload.collection({collection, url: request.url});

  return json(
    {
      collection,
      appliedFilters,
      collections: collectionNodes,
      analytics: {
        pageType: AnalyticsPageType.collection,
        collectionHandle,
        resourceId: collection.id,
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

export default function Collection() {
  const {collection, collections, appliedFilters} = useLoaderData();

  return (
    <>
      <Section className="collections-product-list-sec !px-0 !py-[40px] md:!py-[60px] xl:!py-[80px] 2xl:!py-[100px]">
        <div className="container">
          <PageHeader heading={collection.title} className={'hidden'}>
            {collection?.description && (
              <div className="flex items-baseline justify-between w-full">
                <div>
                  <Text format width="narrow" as="p" className="inline-block">
                    {collection.description}
                  </Text>
                </div>
              </div>
            )}
          </PageHeader>
          <SortFilter
            filters={collection.products.filters}
            appliedFilters={appliedFilters}
            collections={collections}
          >
            <ProductGrid
              key={collection.id}
              collection={collection}
              url={`/collections/${collection.handle}`}
              data-test="product-grid"
              className="mt-[30px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-[15px] lg:gap-x-[30px] gap-y-[20px] lg:gap-y-[30px] xl:gap-y-[60px]"
            />
          </SortFilter>
        </div>
      </Section>
      <section className={`collection-section bg-[#E7EFFF] bg-opacity-30 mb-[-20px] md:mb-[-30px] xl:mb-[-40px] 2xl:mb-[-50px] py-[40px] md:py-[60px] xl:py-[80px] 2xl:py-[100px]`}> 
        <div className="container">
          <div className="expandingcard-wrap last:border-black last:border-b-[2px]">
            <ExpandingCard
              content="Pampers Premium Protection"
              title="Pampers Premium Protection"
            />
            <ExpandingCard
              content="Pampers Baby-Dry"
              title="Pampers Baby-Dry"
            />
            <ExpandingCard
              content="Pampers Active Fit"
              title="Pampers Active Fit"
            />
            <ExpandingCard
              content="Pampers – die ideale Lösung für alle Eltern"
              title="Pampers – die ideale Lösung für alle Eltern"
            />
            <ExpandingCard
              content="Pampers und viele andere Hersteller: Bei windelshop.ch haben Sie die Auswahl"
              title="Pampers und viele andere Hersteller: Bei windelshop.ch haben Sie die Auswahl"
            />
            <ExpandingCard
              content="Qualitativ hochwertige Produkte und bester Service bei windelshop.ch"
              title="Qualitativ hochwertige Produkte und bester Service bei windelshop.ch"
            />
          </div>
        </div>
      </section>
    </>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(
        first: $pageBy,
        after: $cursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    collections(first: 100) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

function getSortValuesFromParam(sortParam) {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        reverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        reverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED',
        reverse: true,
      };
    case 'featured':
      return {
        sortKey: 'MANUAL',
        reverse: false,
      };
    default:
      return {
        sortKey: 'RELEVANCE',
        reverse: false,
      };
  }
}
