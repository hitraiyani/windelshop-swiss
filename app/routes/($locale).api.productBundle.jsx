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


  
  // Helper function to parse the numeric value from label
  function parseLabel(label) {
    const numericPart = label.split('.')[1];
    if (numericPart.endsWith('+')) {
      return parseInt(numericPart.slice(0, -1)) + 0.5;
    }
    return parseInt(numericPart);
  }


  if (productHandleMain) {
    const {product} = await storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: productHandleMain,
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    });
    
    
    const variantProducts = product?.variant_products?.value ? product?.variant_products?.value.split('|') : [];
    const connectedProducts = product?.connected_products?.value ? product?.connected_products?.value.split('|') : [];
  
    if (!product?.id) {
      return json({
        bundleProdList: [],
        productBundleData: [],
        productSizeKeyValue: [],
      });
    }

    const productSizeKeyValue = [];
    await Promise.all(
      connectedProducts.map(async (productHandle) => {
        const {variant_products} = await storefront.query(VARIENT_PRODUCT_QUERY, {
          variables: {
            handle: productHandle,
            country: storefront.i18n.country,
            language: storefront.i18n.language,
          },
        });
        if (variant_products?.id) {
          const regex = /Gr\.\s?\d+\+?/;
          const match = variant_products.title.match(regex);
          if (match) {
            const grValue = match[0];
            productSizeKeyValue.push({'lable' : grValue, 'handle' : variant_products.handle, 'title' :  variant_products.title, 'is_selected' : false});
          }
        }
      }),
    );
    if(productSizeKeyValue.length > 0) {
      const regex = /Gr\.\s?\d+\+?/;
      const match = product.title.match(regex);
      if (match) {
        const grValue = match[0];
        productSizeKeyValue.push({'lable' : grValue, 'handle' : product.handle, 'title' :  product.title, 'is_selected' : true});
      }
    }
    productSizeKeyValue.sort((a, b) => {
      const labelA = parseLabel(a.lable);
      const labelB = parseLabel(b.lable);
      return labelA - labelB;
    });

    const productPackageKeyValue = [];
    await Promise.all(
      variantProducts.map(async (productHandle) => {
        const {variant_products} = await storefront.query(VARIENT_PRODUCT_QUERY, {
          variables: {
            handle: productHandle,
            country: storefront.i18n.country,
            language: storefront.i18n.language,
          },
        });
        if (variant_products?.id) {
          const match = variant_products.title.match(/\((.*?)\)/);
            if (match) {
              const valueInBrackets = match[1];
              productPackageKeyValue.push({'lable' : valueInBrackets, 'handle' : variant_products.handle, 'is_selected' : false});
            }
        }
      }),
    );

    if (productPackageKeyValue.length > 0) {
      const match = product.title.match(/\((.*?)\)/);
      if (match) {
        const valueInBrackets = match[1];
        productPackageKeyValue.push({'lable' : valueInBrackets, 'handle' : product.handle, 'is_selected' : true});
      }
    }
    productPackageKeyValue.sort((a, b) => {
      const labelA = parseInt(a.lable);
      const labelB = parseInt(b.lable);
      return labelA - labelB;
    });

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
      productPackageKeyValue,
      productSizeKeyValue
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
      variant_products : metafield(namespace: "custom_fields", key: "variant_products") {
        value
      }
      connected_products : metafield(namespace: "custom_fields", key: "connected_products") {
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


const VARIENT_PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    variant_products : product(handle: $handle) {
      id
      title
      handle
    }
  }
`;

