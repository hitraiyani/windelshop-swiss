import {
  Await,
  Form,
  Outlet,
  useLoaderData,
  useMatches,
  useOutlet,
} from '@remix-run/react';
import {Suspense} from 'react';
import {json, defer, redirect} from '@shopify/remix-oxygen';
import {flattenConnection} from '@shopify/hydrogen';

import {
  Button,
  OrderCard,
  PageHeader,
  Text,
  AccountDetails,
  AccountAddressBook,
  Modal,
  ProductSwimlane,
} from '~/components';
import {FeaturedCollections} from '~/components/FeaturedCollections';
import {usePrefixPathWithLocale, translate} from '~/lib/utils';
import {CACHE_NONE, routeHeaders} from '~/data/cache';

import {getFeaturedData} from './($locale).featured-products';
import {doLogout} from './($locale).account.logout';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

export async function loader({request, context, params}) {
  const {pathname} = new URL(request.url);
  const locale = params.locale;
  const customerAccessToken = await context.session.get('customerAccessToken');
  const isAuthenticated = Boolean(customerAccessToken);
  const loginPath = locale ? `/${locale}/account/login` : '/account/login';
  const isAccountPage = /^\/account\/?$/.test(pathname);

  if (!isAuthenticated) {
    if (isAccountPage) {
      return redirect(loginPath);
    }
    // pass through to public routes
    return json({isAuthenticated: false});
  }

  const customer = await getCustomer(context, customerAccessToken);

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}.`
      : `Welcome to your account.`
    : 'Account Details';

  const orders = flattenConnection(customer.orders);

  return defer(
    {
      isAuthenticated,
      customer,
      heading,
      orders,
      addresses: flattenConnection(customer.addresses),
      featuredData: getFeaturedData(context.storefront),
      locale : context.storefront.i18n.language
    },
    {
      headers: {
        'Cache-Control': CACHE_NONE,
      },
    },
  );
}

export default function Authenticated() {
  const data = useLoaderData();
  const outlet = useOutlet();
  const matches = useMatches();

  // routes that export handle { renderInModal: true }
  const renderOutletInModal = matches.some((match) => {
    return match?.handle?.renderInModal;
  });

  // Public routes
  if (!data.isAuthenticated) {
    return <Outlet />;
  }

  // Authenticated routes
  if (outlet) {
    if (renderOutletInModal) {
      return (
        <>
          <Modal cancelLink="/account">
            <Outlet context={{customer: data.customer}} />
          </Modal>
          <Account {...data} />
        </>
      );
    } else {
      return <Outlet context={{customer: data.customer}} />;
    }
  }

  return <Account {...data} />;
}

function Account({customer, orders, heading, addresses, featuredData, locale}) {

  return (
    <>
    <section className="container mx-auto py-10">
        <PageHeader className="pb-8" heading={translate('acount_page_heading', locale)} />
        <div className="flex flex-wrap -mx-4 gap-y-5">
          <div className="px-4 w-full md:w-1/3">
            <div className="h-full flex items-start">
              <AccountDetails customer={customer} locale={locale}/>
            </div>
          </div>
          <div className="px-4 w-full md:w-1/3">
            <div className="h-full flex items-start">
              {orders && <AccountOrderHistory orders={orders} locale={locale}/>}
            </div>
          </div>
          <div className="px-4 w-full md:w-1/3">
            <div className="h-full flex items-start">
              <AccountAddressBook addresses={addresses} customer={customer} locale={locale}/>
            </div>
          </div>
        </div>
      </section>
      {/* <PageHeader heading={heading}>
        <Form method="post" action={usePrefixPathWithLocale('/account/logout')}>
          <button type="submit" className="text-primary/50">
            Sign out
          </button>
        </Form>
      </PageHeader>
      {orders && <AccountOrderHistory orders={orders} />}
      <AccountDetails customer={customer} />
      <AccountAddressBook addresses={addresses} customer={customer} /> */}
    </>
  );
}

function AccountOrderHistory({orders, locale}) {
  return (
    <div className="">
      <div className="">
        <h2 className="font-bold text-lead">{translate('account_order_history', locale)}</h2>
        {orders?.length ? <Orders orders={orders} locale={locale} /> : <EmptyOrders locale={locale}/>}
      </div>
    </div>
  );
}

function EmptyOrders({locale}) {
  return (
    <div>
      <Text className="mb-1" size="fine" width="narrow" as="p">
          {translate('account_empty_order', locale)}
      </Text>
      {/* <div className="w-48">
        <Button
          className="w-full mt-2 text-sm"
          variant="secondary"
          to={usePrefixPathWithLocale('/')}
        >
          Start Shopping
        </Button>
      </div> */}
    </div>
  );
}

function Orders({orders, locale}) {
  return (
    <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false my-5">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} locale={locale} />
      ))}
    </ul>
  );
}

const CUSTOMER_QUERY = `#graphql
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
      phone
      email
      defaultAddress {
        id
        formatted
        firstName
        lastName
        company
        address1
        address2
        country
        province
        city
        zip
        phone
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            country
            province
            city
            zip
            phone
          }
        }
      }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 2) {
              edges {
                node {
                  variant {
                    image {
                      url
                      altText
                      height
                      width
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getCustomer(context, customerAccessToken) {
  const {storefront} = context;

  const data = await storefront.query(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (!data || !data.customer) {
    throw await doLogout(context);
  }

  return data.customer;
}
