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
    <Section className="collections-product-list-sec !px-0 !py-[40px] md:!py-[60px] xl:!py-[80px] 2xl:!py-[100px]">
        <div className="container">
        <PageHeader>
        <Heading as="h1" size="copy">
          {translate('search_box', locale)}
        </Heading>
        <Form method="get" className="relative flex w-full text-heading">
          <Input
            defaultValue={searchTerm}
            name="q"
            placeholder={translate('search_page_search_placeholder', locale)}
            type="search"
            variant="search"
          />
          <button className="absolute right-0 py-2" type="submit">
              {translate('search_box', locale)}
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
        <Section>
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
                  <Grid data-test="product-grid">{itemsMarkup}</Grid>
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
        <Section padding="x">
          <Text className="opacity-50">
            {translate('search_page_no_product_message', locale)}
          </Text>
        </Section>
      )}
      {/* <Suspense>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommendations}
        >
          {({featuredCollections, featuredProducts}) => (
            <>
              <FeaturedCollections
                title="Trending Collections"
                collections={featuredCollections}
              />
              <ProductSwimlane
                title="Trending Products"
                products={featuredProducts}
              />
            </>
          )}
        </Await>
      </Suspense> */}
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
