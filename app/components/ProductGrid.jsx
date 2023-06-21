import {
  useFetcher,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import {useEffect, useState} from 'react';

import {getImageLoadingPriority} from '~/lib/const';
import {Button, Grid, ProductCard, Link} from '~/components';
import {redirect} from '@shopify/remix-oxygen';

export function ProductGrid({
  url,
  collection,
  collections,
  className,
  ...props
}) {
  const navigate = useNavigate();

  const [initialProducts, setInitialProducts] = useState(
    collection?.products?.nodes || [],
  );
  const [isFetcherCall, setIsFetcherCall] = useState(false);
  const [params] = useSearchParams();

  const location = useLocation();

  const [nextPage, setNextPage] = useState(
    collection?.products?.pageInfo?.hasNextPage,
  );

  const [prevPage, setPrevPage] = useState(
    collection?.products?.pageInfo?.hasPreviousPage,
  );

  const [startCursor, setStartCursor] = useState(
    collection?.products?.pageInfo?.startCursor,
  );

  const [endCursor, setEndCursor] = useState(
    collection?.products?.pageInfo?.endCursor,
  );

  const [products, setProducts] = useState(initialProducts);

  // props have changes, reset component state
  const productProps = collection?.products?.nodes || [];
  if (initialProducts !== productProps) {
    setInitialProducts(productProps);
    setProducts(productProps);
  }

  const fetcher = useFetcher();

  function fetchPrevProducts() {
    if (!startCursor) return;

    const url = new URL(window.location.href);
    // url.searchParams.set('cursor', endCursor);
    // fetcher.load(url.pathname + url.search);
    setIsFetcherCall(true);
    const modifiedUrl = `${location.pathname}?direction=prev&startCursor=${startCursor}&${params}`;
    fetcher.load(
      `${location.pathname}?direction=prev&startCursor=${startCursor}&${params}`,
    );
  }

  function fetchMoreProducts() {
    if (!endCursor) return;

    const url = new URL(window.location.href);
    // url.searchParams.set('cursor', endCursor);
    // fetcher.load(url.pathname + url.search);
    setIsFetcherCall(true);
    fetcher.load(
      `${location.pathname}?direction=next&endCursor=${endCursor}&${params}`,
    );
  }

  useEffect(() => {
    if (!fetcher.data) return;

    const {products, collection} = fetcher.data;
    const pageProducts = collection?.products || products;

    if (!pageProducts) return;
    //setProducts((prev) => [...prev, ...pageProducts.nodes]);
    setProducts((prev) => [...pageProducts.nodes]);
    setNextPage(collection?.products.pageInfo.hasNextPage);
    setEndCursor(collection?.products.pageInfo.endCursor);
    setPrevPage(collection?.products.pageInfo.hasPreviousPage);
    setStartCursor(collection?.products.pageInfo.startCursor);

    setIsFetcherCall(false);
  }, [fetcher.data, params]);

  useEffect(() => {
    fetcher.load(`${location.pathname}?direction=next&${params}`);
  }, [params]);

  const haveProducts = initialProducts.length > 0;

  if (!haveProducts) {
    return (
      <>
        <div className='mt-[20px]'>
          <p>No products found on this collection</p>
          <Link to="/products">
            <p className="underline">Browse catalog</p>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`product-grid ${className}`} layout="products" {...props}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            loading={getImageLoadingPriority(i)}
            quickAdd
          />
        ))}
      </div>

      {prevPage && (
        <div className="flex items-center justify-center mt-6">
          <Button
            disabled={fetcher.state !== 'idle'}
            variant="secondary"
            onClick={fetchPrevProducts}
            width="full"
            prefetch="intent"
          >
            {fetcher.state !== 'idle' ? 'Loading...' : 'Load pre products'}
          </Button>
        </div>
      )}

      {nextPage && (
        <div className="flex items-center justify-center mt-6">
          <Button
            disabled={fetcher.state !== 'idle'}
            variant="secondary"
            onClick={fetchMoreProducts}
            width="full"
            prefetch="intent"
          >
            {fetcher.state !== 'idle' ? 'Loading...' : 'Load more products'}
          </Button>
        </div>
      )}
    </>
  );
}
