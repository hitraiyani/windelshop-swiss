import {Link, Button} from '~/components';
import {usePrefixPathWithLocale, translate} from '~/lib/utils';
import { Form } from '@remix-run/react';

export function AccountDetails({customer, locale}) {
  const {firstName, lastName, email, phone} = customer;

  return (
    <>
    <div className="account-info">
        <div className="">
          <div className="flex">
            {/* <h3 className="font-bold text-base flex-1">Profile & Security</h3> */}
            <Link
              prefetch="intent"
              className="text-base text-black underline"
              to="/account/edit"
            >
              {translate('account_edit',locale)}
            </Link>
          </div>
          <div className="mt-4 text-base text-black font-semibold">{translate('name',locale)}</div>
          <p className="text-base text-gray-600">
            {firstName || lastName
              ? (firstName ? firstName + ' ' : '') + lastName
              : '-'}{' '}
          </p>

          <div className="mt-4 text-base text-black font-semibold">{translate('account_contact',locale)}</div>
          <p className="text-base text-gray-600">{phone ?? translate('account_contact',locale)}</p>

          <div className="mt-4 text-base text-black font-semibold">
            {translate('email_placeholder',locale)}
          </div>
          <p className="text-base text-gray-600">{email}</p>

          <div className="mt-4 text-base text-black font-semibold">
            {translate('password_placeholder',locale)}
          </div>
          <p className="text-base text-gray-600">**************</p>
          <Form method="post" action={usePrefixPathWithLocale('/account/logout')}>
            <Button
              type="submit"
              className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-blue-400 focus:ring-4 hover:text-white focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 mt-4 text-base"
              variant="secondary"
            >
              {translate('account_logout',locale)}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
