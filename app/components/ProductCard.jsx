import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';

import {Text, Link, AddToCartButton, IconStar, IconCart2, IconWhishlist} from '~/components';
import {
  isDiscounted,
  isNewArrival,
  productTranslate,
  translate,
} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
  locale,
}) {
  let cardLabel;

  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  console.log('cardLabel', cardLabel);

  return (
    <div className="product-card relative">
      <div className="product-card-inner">
        <Link
          onClick={onClick}
          to={`/products/${product.handle}`}
          prefetch="intent"
          className="img-link"
        >
          <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
            {image && (
              <Image
                className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                //aspectRatio="4/5"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            {cardLabel && (
              <Text
                as="label"
                size="fine"
                className="lable flex absolute top-[10px] left-[10px] bg-[#CC3F13] text-white uppercase w-fit px-[10px] py-[7px] rounded-[89px] leading-none items-center justify-center text-center min-h-[40px]"
              >
                <span>{cardLabel}</span>
              </Text>
            )}
          </div>
        </Link>
        <Text
          className="pro-name text-[14px] text-[#292929] font-normal"
          as="h4"
        >
          {/* {product.title} */}
          {productTranslate(product, 'title', locale)}
        </Text>
        <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
          <IconStar className={'w-[17px] h-[15px]'} />
          <IconStar className={'w-[17px] h-[15px]'} />
          <IconStar className={'w-[17px] h-[15px] fill-black'} />
          <IconStar className={'w-[17px] h-[15px]'} />
          <IconStar className={'w-[17px] h-[15px]'} />
        </div>
        <Text className="price text-[16px] text-black font-bold mt-[12px] gap-[7px] flex flex-wrap items-center">
          <Money withoutTrailingZeros data={price} />
          {isDiscounted(price, compareAtPrice) && (
            <CompareAtPrice className={'opacity-50'} data={compareAtPrice} />
          )}
        </Text>
        <div className='btn-wrap flex justify-center w-full items-center gap-[20px] absolute bottom-0 bg-[#e7efff] rounded-[10px] p-[15px] opacity-0'>
          {quickAdd && (
            <AddToCartButton
              lines={[
                {
                  quantity: 1,
                  merchandiseId: firstVariant.id,
                },
              ]}
              variant="secondary"
              className="buy-now-btn flex mt-0"
              analytics={{
                products: [productAnalytics],
                totalValue: parseFloat(productAnalytics.price),
              }}
            >
              <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#1c5f7b] hover:text-black transition-all duration-500'} />
              {/* <Text
              as="span"
              className="bg-[#1C5F7B] rounded-[100px] py-[14px] px-[20px] max-w-[160px] w-full min-h-[46px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center font-bold"
            >
              {translate("add_to_cart",locale)}
            </Text> */}
            </AddToCartButton>
          )}
          <button>
            <IconWhishlist className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#1c5f7b] hover:text-black transition-all duration-500'} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx(
    'strike text-[#777777] font-normal line-through !opacity-100',
    className,
  );

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
