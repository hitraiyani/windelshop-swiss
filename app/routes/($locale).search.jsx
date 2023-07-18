import {defer} from '@shopify/remix-oxygen';

import {Await, Form, useLoaderData,useFetcher, NavLink} from '@remix-run/react';
import {Suspense, useEffect, useMemo, useState, useRef} from 'react';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';


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
import { isDiscounted, translate} from '~/lib/utils';

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
  
  const {load, data} = useFetcher();
  console.log("locale", locale);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [searchString, setsearchString] = useState('');

  const noResults = products?.nodes?.length === 0;

  console.log("products", products);
  useEffect(() => {
    const handleBodyClick = (e) => {
       setSearchOpen(false);
      console.log("Out CLik");
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);
  
  const handleSearchClick = (e) => {
    e.stopPropagation();
    setSearchOpen(true);
    
  };
  const handleSearchBox = (event) => {
    setsearchString(event.target.value);
    const count = 12;
    const reverse = true;
    const query = event.target.value;
    if (query.length > 2) {
      const queryString = Object.entries({count, query, reverse})
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&');
      load(`/api/products?${queryString}`);
    }
  };

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
            onChange={handleSearchBox}
            onClick={handleSearchClick}
            placeholder={translate('search_page_search_placeholder', locale)}
            type="search"
            variant="search"
            className='w-full h-[50px] rounded-[100px] !bg-[#CCDDF1] text-black text-[16px] font-medium leading-none placeholder:!text-black placeholder:!opacity-100 focus:!border-none !pl-[50px] !pr-[20px] focus:!ring-0 focus:!border-[#5391d9] !ring-0 border-none'
          />
          <button className="absolute flex items-center justify-center w-8 h-8 focus:ring-primary/5 top-1/2  -translate-x-1/2 -translate-y-1/2 left-[30px]" type="submit">
          <IconSearch2 />

          
              {/* {translate('search_box', locale)} */}
          </button>
          {(searchString.length > 2 )  && (
                  <ProductSearchLi
                    products={data?.products}
                    searchOpen={isSearchOpen}
                  />
                )}
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


export function ProductSearchLi({products,searchOpen}) {
  return (
    
    <ul className={`searchDropDown ${(searchOpen) ? "is-active" : ''} bg-white shadow-lg w-full p-[20px] productSearchList absolute top-[100%] mt-[10px] rounded-[20px] z-[111] last:border-none max-h-[50vh] overflow-auto`}>
      {products?.length > 0 &&
        products.map((product) => {
          const firstVariant = flattenConnection(product?.variants)[0];
          if (!firstVariant) return null;
          const {image, price, compareAtPrice} = firstVariant;
          const inDisc = isDiscounted(price, compareAtPrice);
          return (
            <li key={product.id} className='pb-[15px] mb-[15px] border-b-[1px] border-[#eee]'>
              <NavLink
                className="block"
                to={`/products/${product.handle}`}
                prefetch="intent"
              >
                <div className="flex gap-5 items-center">
                  {image && (
                    <Image
                      widths={[100]}
                      height={[100]}
                      sizes="138px"
                      data={image}
                      alt={image.altText || `Picture of ${product.title}`}
                      loading={'eager'}
                      className={'!w-[60px] md:!w-[100px] md:!h-[100px] !h-[60px] object-contain p-[5px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[10px]'}
                    />
                  )}
                  <div className='flex-1'>
                    <h4 className="font-semibold mb-1 text-[16px]">{product.title}</h4>
                    <Text className="flex gap-1 text-[14px]">
                      <Money
                        withoutTrailingZeros
                        data={price}
                        className={`${inDisc ? 'sale-price' : ''}`}
                      />
                      {inDisc && (
                        <CompareAtPrice
                          className={'text-gray-400 line-through'}
                          data={compareAtPrice}
                        />
                      )}
                    </Text>
                  </div>
                </div>
              </NavLink>
            </li>
          );
        })}
      {products?.length == 0 && (
        <li className="py-3 block text-[16px]">Keine Ergebnisse gefunden.</li>
      )}
    </ul>
    
  );
}

function NoResults({noResults, recommendations, locale}) {
  return (
    <>
      {noResults && (
        <Section padding="x" className={'!p-0'}>
          <Text className="text-black mb-5">
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
                title={translate('trending_product', locale)}
                locale={locale}
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
