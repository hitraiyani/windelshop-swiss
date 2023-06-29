import {json, defer, redirect} from '@shopify/remix-oxygen';
import {
  useActionData,
  Form,
  useLoaderData,
  useOutletContext,
  useNavigation,
} from '@remix-run/react';
import clsx from 'clsx';
import invariant from 'tiny-invariant';

import {Button, Text} from '~/components';
import {getInputStyleClasses, assertApiErrors, translate} from '~/lib/utils';

import {getCustomer} from './($locale).account';

const badRequest = (data) => json(data, {status: 400});

const formDataHas = (formData, key) => {
  if (!formData.has(key)) return false;

  const value = formData.get(key);
  return typeof value === 'string' && value.length > 0;
};

export const handle = {
  renderInModal: true,
};

export async function loader({request, context, params}) {
  
  return defer(
    {
      locale : context.storefront.i18n.language
    }
  );
}

export const action = async ({request, context, params}) => {
  const formData = await request.formData();

  const customerAccessToken = await context.session.get('customerAccessToken');

  invariant(
    customerAccessToken,
    'You must be logged in to update your account details.',
  );

  // Double-check current user is logged in.
  // Will throw a logout redirect if not.
  await getCustomer(context, customerAccessToken);

  if (
    formDataHas(formData, 'newPassword') &&
    !formDataHas(formData, 'currentPassword')
  ) {
    return badRequest({
      fieldErrors: {
        currentPassword:
          'Please enter your current password before entering a new password.',
      },
    });
  }

  if (
    formData.has('newPassword') &&
    formData.get('newPassword') !== formData.get('newPassword2')
  ) {
    return badRequest({
      fieldErrors: {
        newPassword2: 'New passwords must match.',
      },
    });
  }

  try {
    const customer = {};

    formDataHas(formData, 'firstName') &&
      (customer.firstName = formData.get('firstName'));
    formDataHas(formData, 'lastName') &&
      (customer.lastName = formData.get('lastName'));
    formDataHas(formData, 'email') && (customer.email = formData.get('email'));
    formDataHas(formData, 'phone') && (customer.phone = formData.get('phone'));
    formDataHas(formData, 'newPassword') &&
      (customer.password = formData.get('newPassword'));

    const data = await context.storefront.mutate(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customerAccessToken,
        customer,
      },
    });

    assertApiErrors(data.customerUpdate);

    return redirect(params?.locale ? `${params.locale}/account` : '/account');
  } catch (error) {
    return badRequest({formError: error.message});
  }
};

/**
 * Since this component is nested in `accounts/`, it is rendered in a modal via `<Outlet>` in `account.tsx`.
 *
 * This allows us to:
 * - preserve URL state (`/accounts/edit` when the modal is open)
 * - co-locate the edit action with the edit form (rather than grouped in account.tsx)
 * - use the `useOutletContext` hook to access the customer data from the parent route (no additional data loading)
 * - return a simple `redirect()` from this action to close the modal :mindblown: (no useState/useEffect)
 * - use the presence of outlet data (in `account.tsx`) to open/close the modal (no useState)
 */
export default function AccountDetailsEdit() {
  const {locale} = useLoaderData();
  const actionData = useActionData();
  const {customer} = useOutletContext();
  const {state} = useNavigation();

  console.log("AccountDetailsEdit", locale);

  return (
    <>
      <Text className="mt-4 mb-6" as="h3" size="lead">
        {translate('account_update_profile', locale)}
      </Text>
      <Form method="post">
        {actionData?.formError && (
          <div className="flex items-center justify-center mb-6 bg-red-100 rounded">
            <p className="m-4 text-sm text-red-900">{actionData.formError}</p>
          </div>
        )}
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder={translate('account_first_name', locale)}
            aria-label="First name"
            defaultValue={customer.firstName ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder={translate('account_last_name', locale)}
            aria-label="Last name"
            defaultValue={customer.lastName ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses()}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={translate('account_phone', locale)}
            aria-label="Mobile"
            defaultValue={customer.phone ?? ''}
          />
        </div>
        <div className="mt-3">
          <input
            className={getInputStyleClasses(actionData?.fieldErrors?.email)}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={translate('email_placeholder', locale)}
            aria-label="Email address"
            defaultValue={customer.email ?? ''}
          />
          {actionData?.fieldErrors?.email && (
            <p className="text-red-500 text-xs">
              {actionData.fieldErrors.email} &nbsp;
            </p>
          )}
        </div>
        <Text className="mb-6 mt-6" as="h3" size="lead">
          {translate('account_change_password_text', locale)}
        </Text>
        <Password
          name="currentPassword"
          label={translate('account_current_password', locale)}
          passwordError={actionData?.fieldErrors?.currentPassword}
        />
        {actionData?.fieldErrors?.currentPassword && (
          <Text size="fine" className="mt-1 text-red-500">
            {actionData.fieldErrors.currentPassword} &nbsp;
          </Text>
        )}
        <Password
          name="newPassword"
          label={translate('account_new_password', locale)}
          passwordError={actionData?.fieldErrors?.newPassword}
        />
        <Password
          name="newPassword2"
          label={translate('account_confirm_new_password', locale)}
          passwordError={actionData?.fieldErrors?.newPassword2}
        />
        <Text
          size="fine"
          color="subtle"
          className={clsx(
            'mt-1',
            actionData?.fieldErrors?.newPassword && 'text-red-500',
          )}
        >
          {translate('empty_password_length_error_message', locale)}.
        </Text>
        {actionData?.fieldErrors?.newPassword2 ? <br /> : null}
        {actionData?.fieldErrors?.newPassword2 && (
          <Text size="fine" className="mt-1 text-red-500">
            {actionData.fieldErrors.newPassword2} &nbsp;
          </Text>
        )}
        <div className="mt-6">
          <Button
            className="text-sm mb-2"
            variant="primary"
            width="full"
            type="submit"
            disabled={state !== 'idle'}
          >
            {state !== 'idle' ? 'Saving' : translate('account_save', locale)}
          </Button>
        </div>
        <div className="mb-4">
          <Button to=".." className="text-sm" variant="secondary" width="full">
            {translate('account_cancel', locale)}
          </Button>
        </div>
      </Form>
    </>
  );
}

function Password({name, passwordError, label}) {
  return (
    <div className="mt-3">
      <input
        className={getInputStyleClasses(passwordError)}
        id={name}
        name={name}
        type="password"
        autoComplete={
          name === 'currentPassword' ? 'current-password' : undefined
        }
        placeholder={label}
        aria-label={label}
        minLength={8}
      />
    </div>
  );
}

const CUSTOMER_UPDATE_MUTATION = `#graphql
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
  `;
