import {defer} from '@shopify/remix-oxygen';
import {flattenConnection} from '@shopify/hydrogen';
import {Await, Form, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import {
  Pagination__unstable as Pagination,
  getPaginationVariables__unstable as getPaginationVariables,
} from '@shopify/hydrogen';

import {
  FeaturedCollections,
  Grid,
  Heading,
  Input,
  PageHeader,
  ProductCard,
  ProductCardView,
  ProductSwimlane,
  Section,
  Text,
  IconSearch2,
} from '~/components';
import {PAGINATION_SIZE} from '~/lib/const';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import { translate} from '~/lib/utils';

export async function loader({request, context: {storefront}}) {
  const searchParams = new URL(request.url).searchParams;
  const searchTerm = searchParams.get('q');
  const variables = getPaginationVariables(request, {pageBy: 30});

  const {products} = await storefront.query(SEARCH_QUERY, {
    variables: {
      searchTerm,
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const getRecommendations = !searchTerm || products?.nodes?.length === 0;
  // const seoCollection = {
  //   id: 'search',
  //   title: 'Search',
  //   handle: 'search',
  //   descriptionHtml: 'Search results',
  //   description: 'Search results',
  //   seo: {
  //     title: 'Search',
  //     description: `Showing ${products.nodes.length} search results for "${searchTerm}"`,
  //   },
  //   metafields: [],
  //   products,
  //   updatedAt: new Date().toISOString(),
  // };

  const seo = seoPayload.customPage({title : `${translate('search_box', storefront.i18n.language)} ${searchTerm ? ' - '+searchTerm : ''}`, url: request.url});

  return defer({
    seo,
    searchTerm,
    products,
    noResultRecommendations: getRecommendations
      ? getNoResultRecommendations(storefront)
      : Promise.resolve(null),
    locale: storefront.i18n.language,
  });
}

export default function Search() {
  const {searchTerm, products, noResultRecommendations, locale} = useLoaderData();
  console.log("locale", locale);
  const noResults = products?.nodes?.length === 0;

  console.log("products", products);

  return (
    <>
    <Section className="collections-product-list-sec !px-0 !py-[40px] md:!py-[60px] xl:!py-[80px] 2xl:!py-[100px] mb-[-20px] md:mb-[-30px] xl:mb-[-40px] 2xl:mb-[-50px]">
        <div className="container">
        <PageHeader className={'!p-0 mb-[40px] !gap-[20px]'}>
        <Heading as="h1" size="copy" className='text-[#1C5F7B] text-[24px] xl:text-[28px] font-bold leading-none'>
          {translate('search_box', locale)}
        </Heading>
        <Form method="get" className="flex w-full relative">
          <Input
            defaultValue={searchTerm}
            name="q"
            placeholder={translate('search_page_search_placeholder', locale)}
            type="search"
            variant="search"
            className='w-full h-[50px] rounded-[100px] !bg-[#CCDDF1] text-black text-[12px] font-medium leading-none placeholder:!text-black placeholder:!opacity-100 focus:!border-none !pl-[50px] !pr-[20px] focus:!ring-0 focus:!border-[#5391d9] !ring-0 border-none'
          />
          <button className="absolute flex items-center justify-center w-8 h-8 focus:ring-primary/5 top-1/2  -translate-x-1/2 -translate-y-1/2 left-[30px]" type="submit">
          <IconSearch2 />
              {/* {translate('search_box', locale)} */}
          </button>
        </Form>
      </PageHeader>
      {!searchTerm || noResults ? (
        <NoResults
          noResults={noResults}
          recommendations={noResultRecommendations}
          locale={locale}
        />
      ) : (
        <Section className={'!p-0'}>
          <Pagination connection={products}>
            {({nodes, isLoading, NextLink, PreviousLink}) => {
              const itemsMarkup = nodes.map((product, i) => (
                <ProductCardView
                  key={product.id}
                  product={product}
                  locale={locale}
                />
              ));

              return (
                <>
                  {/* <div className="flex items-center justify-center mt-6">
                    <PreviousLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                      {isLoading ? 'Loading...' : 'Previous'}
                    </PreviousLink>
                  </div> */}
                  <Grid data-test="product-grid" className={'product-grid grid grid-cols-2  md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-x-[15px] lg:gap-x-[30px] gap-y-[20px] lg:gap-y-[30px] xl:gap-y-[60px]'}>{itemsMarkup}</Grid>
                  {/* <div className="flex items-center justify-center mt-6">
                    <NextLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                      {isLoading ? 'Loading...' : 'Next'}
                    </NextLink>
                  </div> */}
                </>
              );
            }}
          </Pagination>
        </Section>
      )}
        </div>
    </Section>
    </>
  );
}

function NoResults({noResults, recommendations, locale}) {
  return (
    <>
      {noResults && (
        <Section padding="x" className={'!p-0'}>
          <Text className="text-black">
            {translate('search_page_no_product_message', locale)}
          </Text>
        </Section>
      )}
      <Suspense>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommendations}
        >
          {({featuredCollections, featuredProducts}) => (
            <>
              {/* <FeaturedCollections
                title="Trending Collections"
                collections={featuredCollections}
              /> */}
              <ProductSwimlane
                title="Trending Products"
                products={featuredProducts}
              />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export async function getNoResultRecommendations(storefront) {
  const {featuredProducts, featuredCollections} = await storefront.query(
    SEARCH_NO_RESULTS_QUERY,
    {
      variables: {
        pageBy: PAGINATION_SIZE,
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    },
  );

  return {
    featuredCollections: flattenConnection(featuredCollections),
    featuredProducts: flattenConnection(featuredProducts),
  };
}

const SEARCH_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query PaginatedProductsSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $searchTerm: String
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      sortKey: RELEVANCE,
      query: $searchTerm
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const SEARCH_NO_RESULTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query NoSearchResults(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
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
    featuredProducts: products(first: $pageBy) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
