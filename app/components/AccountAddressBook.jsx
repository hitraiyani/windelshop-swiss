import {Form} from '@remix-run/react';
import {Button, Link, Text} from '~/components';
import {usePrefixPathWithLocale, translate} from '~/lib/utils';

export function AccountAddressBook({customer, addresses, locale}) {
  return (
    <>
      <div className="">
        <h3 className="font-bold text-lead">{translate('account_address_title', locale)}</h3>
        <div>
          {!addresses?.length && (
            <Text className="mb-1" width="narrow" as="p" size="copy">
              {translate('account_no_address_title', locale)}.
            </Text>
          )}
          <div>
            <Button
              to="address/add"
              className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-blue-400 focus:ring-4 hover:text-white focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 text-base block my-5 text-center"
              variant="secondary"
            >
              {translate('account_add_new_address', locale)}
            </Button>
          </div>
          {Boolean(addresses?.length) && (
            <div className="grid grid-cols-1 gap-6">
              {customer.defaultAddress && (
                <Address address={customer.defaultAddress} defaultAddress />
              )}
              {addresses
                .filter((address) => address.id !== customer.defaultAddress?.id)
                .map((address) => (
                  <Address key={address.id} address={address}  locale={locale}/>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Address({address, defaultAddress, locale}) {
  return (
    <div className="p-4 border border-gray-200 rounded flex flex-col">
      {defaultAddress && (
        <div className="mb-3 flex flex-row">
          <span className="text-black text-base font-semibold">
            { translate('account_default_address',locale) }
          </span>
        </div>
      )}
      <ul className="flex-1 flex-row">
        {(address.firstName || address.lastName) && (
          <li>
            {'' +
              (address.firstName && address.firstName + ' ') +
              address?.lastName}
          </li>
        )}
        {address.formatted &&
          address.formatted.map((line) => <li key={line}>{line}</li>)}
      </ul>

      <div className="flex flex-wrap mt-5 gap-3">
        <Link
          to={`/account/address/${encodeURIComponent(address.id)}`}
          className="text-green-700 text-base text-center underline"
          prefetch="intent"
        >
          {translate('account_edit', locale)}
        </Link>
        <Form action="address/delete" method="delete">
          <input type="hidden" name="addressId" value={address.id} />
          <button className="text-red-700 text-base text-center ">
              {translate('account_address_remove',locale)}
          </button>
        </Form>
      </div>
    </div>
  );
}
