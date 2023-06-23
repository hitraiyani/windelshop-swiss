import {json} from '@shopify/remix-oxygen';
import {flattenConnection} from '@shopify/hydrogen';

/**
 * Fetch a given set of products from the storefront API
 * @param count
 * @param query
 * @param reverse
 * @param sortKey
 * @returns Product[]
 * @see https://shopify.dev/api/storefront/2023-01/queries/products
 */
export async function loader({request, context: {storefront}}) {
  const url = new URL(request.url);

  const searchParams = new URLSearchParams(url.search);
  const productHandleMain = searchParams.get('productHandle') ?? '';


  if (productHandleMain) {
    const {product} = await storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: productHandleMain,
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    });

    if (!product?.id) {
      return json({
        bundleProdList: [],
        productBundleData: [],
      });
    }

    const bundle_product_quantities = product?.bundle_product_quantities?.value
      ? JSON.parse(product?.bundle_product_quantities?.value)
      : [];

    const bundleProdList = [];
    await Promise.all(
      Object.keys(bundle_product_quantities).map(async (productHandle) => {
        const {bundle_product} = await storefront.query(BUNDLE_PRODUCT_QUERY, {
          variables: {
            handle: productHandle,
            country: storefront.i18n.country,
            language: storefront.i18n.language,
          },
        });
        if (bundle_product?.id) {
          var bundle_collection = false;
          const bundle_collection_arr = flattenConnection(
            bundle_product.collections,
          );
          bundle_collection_arr.forEach((collection) => {
            if (collection.handle == 'bundle-artikel') {
              bundle_collection = true;
            }
          });
          const aico_custom_fields = bundle_product?.aico_custom_fields?.value
            ? JSON.parse(bundle_product.aico_custom_fields.value)
            : [];
          var subtitle = '';
          var qty = bundle_product_quantities[productHandle]
            ? bundle_product_quantities[productHandle] + 'x'
            : '';

          aico_custom_fields.forEach((item) => {
            const meta_key = item.key.replace('_de_ch', '');
            const meta_key_name = meta_key.replace('_', ',');
            if (meta_key == 'subtitle') {
              subtitle = ' | ' + item.value;
            }
          });

          bundleProdList.push({
            href: !bundle_collection
              ? `/products/${bundle_product.handle}`
              : '',
            content: qty + ' ' + bundle_product.title + ' ' + subtitle,
          });
        }
      }),
    );

    const bundle_products = product?.bundle_products?.value
      ? product?.bundle_products.value.split('|')
      : [];

    let bundle_available = false;
    let is_bundle = false;
    let productBundleData = {value: '', className: ''};

    if (bundle_products.length > 0) {
      is_bundle = true;
      bundle_available = true;
    }
    await Promise.all(
      bundle_products.map(async (productHandle) => {
        const {bundle_product} = await storefront.query(BUNDLE_PRODUCT_QUERY, {
          variables: {
            handle: productHandle,
            country: storefront.i18n.country,
            language: storefront.i18n.language,
          },
        });
        if (bundle_product?.id) {
          if (bundle_product.availableForSale == false) {
            bundle_available = false;
          }
        }
      }),
    );

    let product_qty = product.variants?.nodes[0]?.quantityAvailable;
    if (is_bundle == false) {
      if (product_qty >= 50) {
        productBundleData.value = 'auf Lager verfügbar | bei dir in 2-3 Tagen';
        productBundleData.className =
          'sd-items-count more-stock text-[16px] font-normal mt-[6px] mb-[15px] md:mb-0';
      }
      if (product_qty < 50 && product_qty != 0) {
        productBundleData.value =
          'nur noch wenige verfügbar | bei dir in 2-3 Tagen';
        productBundleData.className =
          'sd-items-count less-stock text-[16px] font-normal mt-[6px';
      }
    } else {
        if (bundle_available == true) {
            if (product_qty >= 50) {
              productBundleData.value = 'auf Lager | bei dir in 2-3 Tagen';
              productBundleData.className =
                'sd-items-count more-stock text-[16px] font-normal mt-[6px] mb-[15px] md:mb-0';
            }
            if (product_qty < 50 && product_qty != 0) {
              productBundleData.value =
                'nur noch wenige verfügbar | bei dir in 2-3 Tagen';
              productBundleData.className = 'sd-items-count less-stock';
            }
        }
    }
    return json({
      bundleProdList: bundleProdList?.sort(
        (a, b) => (a.href == '' - b.href) | (a.href - b.href),
      ),
      productBundleData: productBundleData,
    });
  }
}

// no-op
export default function ProductBundleApiRoute() {
  return null;
}


const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    quantityAvailable
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
    unitPriceMeasurement {
      quantityValue
      referenceUnit
      measuredType
      quantityUnit
      referenceValue
    }
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
  ${PRODUCT_VARIANT_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      bundle_product_quantities: metafield(namespace: "custom_fields", key: "bundle_product_quantities") {
        value
      }
      bundle_products : metafield(namespace: "custom_fields", key: "bundle_products") {
        value
      }
    }
  }
`;
const BUNDLE_PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    bundle_product : product(handle: $handle) {
      id
      title
      handle
      availableForSale
      aico_custom_fields: metafield(namespace: "aico", key: "aico_custom_fields_de_ch") {
        value
      }
      collections(first :50) {
        nodes {
          handle
        }
      }
    }
  }
`;

