import {useLocation, useMatches} from '@remix-run/react';
import {parse as parseCookie} from 'worktop/cookie';
import typographicBase from 'typographic-base';
import Cookies from 'js-cookie';


import {countries, languageSwitchOption} from '~/data/countries';
import deJson from '~/data/de.json';
import frJson from '~/data/fr.json';


export const translate = (key, language) => {
  const translations = language?.toLowerCase() === 'fr' ? frJson : deJson;
  return translations[key] || key;
};

export const productTranslate = (product,key, language) => {
  
  
  const translation = language?.toLowerCase() === 'fr' ? (product[key+'_fr']["value"]) ? product[key+'_fr']["value"] : product?.[key] :  (product[key+'_de_ch']["value"]) ? product[key+'_de_ch']["value"] : product?.[key];
  //console.log("translation fuction"+language);
  // console.log(product[key+'_fr']["value"] );
  return translation;
  //return translations[key] || key;
};

export function missingClass(string, prefix) {
  if (!string) {
    return true;
  }

  const regex = new RegExp(` ?${prefix}`, 'g');
  return string.match(regex) === null;
}

export function formatText(input) {
  if (!input) {
    return;
  }

  if (typeof input !== 'string') {
    return input;
  }

  return typographicBase(input, {locale: 'en-us'}).replace(
    /\s([^\s<]+)\s*$/g,
    '\u00A0$1',
  );
}

export function getExcerpt(text) {
  const regex = /<p.*>(.*?)<\/p>/;
  const match = regex.exec(text);
  return match?.length ? match[0] : text;
}

export function isNewArrival(date, daysOld = 30) {
  return (
    new Date(date).valueOf() >
    new Date().setDate(new Date().getDate() - daysOld).valueOf()
  );
}

export function isDiscounted(price, compareAtPrice) {
  if (parseFloat(compareAtPrice?.amount) > parseFloat(price?.amount)) {
    return true;
  }
  return false;
}

function resolveToFromType(
  {customPrefixes, pathname, type} = {
    customPrefixes: {},
  },
) {
  if (!pathname || !type) return '';

  /*
        MenuItemType enum
        @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
      */
  const defaultPrefixes = {
    BLOG: 'blogs',
    COLLECTION: 'collections',
    COLLECTIONS: 'collections',
    FRONTPAGE: 'frontpage',
    HTTP: '',
    PAGE: 'pages',
    CATALOG: 'collections/all',
    PRODUCT: 'products',
    SEARCH: 'search',
    SHOP_POLICY: 'policies',
  };

  const pathParts = pathname.split('/');
  const handle = pathParts.pop() || '';
  const routePrefix = {
    ...defaultPrefixes,
    ...customPrefixes,
  };

  switch (true) {
    // special cases
    case type === 'FRONTPAGE':
      return '/';

    case type === 'ARTICLE': {
      const blogHandle = pathParts.pop();
      return routePrefix.BLOG
        ? `/${routePrefix.BLOG}/${blogHandle}/${handle}/`
        : `/${blogHandle}/${handle}/`;
    }

    case type === 'COLLECTIONS':
      return `/${routePrefix.COLLECTIONS}`;

    case type === 'SEARCH':
      return `/${routePrefix.SEARCH}`;

    case type === 'CATALOG':
      return `/${routePrefix.CATALOG}`;

    // common cases: BLOG, PAGE, COLLECTION, PRODUCT, SHOP_POLICY, HTTP
    default:
      return routePrefix[type]
        ? `/${routePrefix[type]}/${handle}`
        : `/${handle}`;
  }
}

/*
  Parse each menu link and adding, isExternal, to and target
*/
function parseItem(customPrefixes = {}) {
  return function (item) {
    if (!item?.url || !item?.type) {
      // eslint-disable-next-line no-console
      console.warn('Invalid menu item.  Must include a url and type.');
      // @ts-ignore
      return;
    }

    // extract path from url because we don't need the origin on internal to attributes
    const {pathname} = new URL(item.url);

    /*
              Currently the MenuAPI only returns online store urls e.g — xyz.myshopify.com/..
              Note: update logic when API is updated to include the active qualified domain
            */
    const isInternalLink = /\.myshopify\.com/g.test(item.url);

    const parsedItem = isInternalLink
      ? // internal links
        {
          ...item,
          isExternal: false,
          target: '_self',
          to: resolveToFromType({type: item.type, customPrefixes, pathname}),
        }
      : // external links
        {
          ...item,
          isExternal: true,
          target: '_blank',
          to: item.url,
        };

    return {
      ...parsedItem,
      items: item.items?.map(parseItem(customPrefixes)),
    };
  };
}

/*
  Recursively adds `to` and `target` attributes to links based on their url
  and resource type.
  It optionally overwrites url paths based on item.type
*/
export function parseMenu(menu, customPrefixes = {}) {
  if (!menu?.items) {
    // eslint-disable-next-line no-console
    console.warn('Invalid menu passed to parseMenu');
    // @ts-ignore
    return menu;
  }

  return {
    ...menu,
    items: menu.items.map(parseItem(customPrefixes)),
  };
}

export const INPUT_STYLE_CLASSES =
  'appearance-none rounded dark:bg-transparent border focus:border-primary/50 focus:ring-0 w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline';

export const getInputStyleClasses = (isError) => {
  return `${INPUT_STYLE_CLASSES} ${
    isError ? 'border-red-500' : 'border-primary/20'
  }`;
};

export function statusMessage(status) {
  const translations = {
    ATTEMPTED_DELIVERY: 'Attempted delivery',
    CANCELED: 'Canceled',
    CONFIRMED: 'Confirmed',
    DELIVERED: 'Delivered',
    FAILURE: 'Failure',
    FULFILLED: 'Fulfilled',
    IN_PROGRESS: 'In Progress',
    IN_TRANSIT: 'In transit',
    LABEL_PRINTED: 'Label printed',
    LABEL_PURCHASED: 'Label purchased',
    LABEL_VOIDED: 'Label voided',
    MARKED_AS_FULFILLED: 'Marked as fulfilled',
    NOT_DELIVERED: 'Not delivered',
    ON_HOLD: 'On Hold',
    OPEN: 'Open',
    OUT_FOR_DELIVERY: 'Out for delivery',
    PARTIALLY_FULFILLED: 'Partially Fulfilled',
    PENDING_FULFILLMENT: 'Pending',
    PICKED_UP: 'Displayed as Picked up',
    READY_FOR_PICKUP: 'Ready for pickup',
    RESTOCKED: 'Restocked',
    SCHEDULED: 'Scheduled',
    SUBMITTED: 'Submitted',
    UNFULFILLED: 'Unfulfilled',
  };
  try {
    return translations?.[status];
  } catch (error) {
    return status;
  }
}

/**
 * Errors can exist in an errors object, or nested in a data field.
 */
export function assertApiErrors(data) {
  const errorMessage = data?.customerUserErrors?.[0]?.message;
  if (errorMessage) {
    throw new Error(errorMessage);
  }
}

export const DEFAULT_LOCALE = Object.freeze({
  ...countries.default,
  pathPrefix: '',
});

export function getLocaleFromRequest(request) {

  const cookieValue = request.headers.get('Cookie');
  const languageCookie = cookieValue ? cookieValue.split(';').find(cookie => cookie.trim().startsWith('language=')) : null;
  const language = languageCookie ? languageCookie.split('=')[1] : null;

  const url = new URL(request.url);
  const firstPathPart =
    '/' + url.pathname.substring(1).split('/')[0].toLowerCase();


  return countries[firstPathPart]
    ? {
        ...countries[firstPathPart],
        pathPrefix: firstPathPart,
      }
    : {
        ...countries['default'],
        pathPrefix: '',
      };
}

export function getLocaleFromRequestNew(request) {

  const cookieValue = request.headers.get('Cookie');
  const languageCookie = cookieValue ? cookieValue.split(';').find(cookie => cookie.trim().startsWith('language=')) : null;
  const language = languageCookie ? languageCookie.split('=')[1] : null;


  const url = new URL(request.url);
  const firstPathPart =
    '/' + url.pathname.substring(1).split('/')[0].toLowerCase();

  const languageSwitchKey = (language && language == 'fr')  ? '/fr' : firstPathPart;

  return languageSwitchOption[languageSwitchKey]
    ? {
        ...languageSwitchOption[languageSwitchKey],
        pathPrefix: languageSwitchKey,
      }
    : {
        ...languageSwitchOption['default'],
        pathPrefix: '',
      };
}

export function usePrefixPathWithLocale(path) {
  const [root] = useMatches();
  const selectedLocale = root.data?.selectedLocale ?? DEFAULT_LOCALE;

  return `${selectedLocale.pathPrefix}${
    path.startsWith('/') ? path : '/' + path
  }`;
}

export function useIsHomePath() {
  const {pathname} = useLocation();
  const [root] = useMatches();
  const selectedLocale = root.data?.selectedLocale ?? DEFAULT_LOCALE;
  const strippedPathname = pathname.replace(selectedLocale.pathPrefix, '');
  return strippedPathname === '/';
}

/**
 * Validates that a url is local
 * @param url
 * @returns `true` if local `false`if external domain
 */
export function isLocalPath(url) {
  try {
    // We don't want to redirect cross domain,
    // doing so could create fishing vulnerability
    // If `new URL()` succeeds, it's a fully qualified
    // url which is cross domain. If it fails, it's just
    // a path, which will be the current domain.
    new URL(url);
  } catch (e) {
    return true;
  }

  return false;
}

/**
 * Shopify's 'Online Store' stores cart IDs in a 'cart' cookie.
 * By doing the same, merchants can switch from the Online Store to Hydrogen
 * without customers losing carts.
 */
export function getCartId(request) {
  const cookies = parseCookie(request.headers.get('Cookie') || '');
  return cookies.cart ? `gid://shopify/Cart/${cookies.cart}` : undefined;
}

export function toHTML(content) {
	let parsed = JSON.parse(content);
	let html = '';
	parsed.children.forEach((node) => {
		switch (node.type) {
			case 'heading':
				html += `<h${node.level}>${node.children[0].value}</h${node.level}>`;
				break;
			case 'list':
				html += `<${node.listType === 'unordered' ? 'ul' : 'ol'}>`;
				node.children.forEach((item) => {
					html += `<li>${item.children[0].value}</li>`;
				});
				html += `<${node.listType === 'unordered' ? '/ul' : '/ol'}>`;
				break;
			case 'paragraph':
				html += `<p>`;
				node.children.forEach((item) => {
					if (item.type === 'text' && item.bold) {
						html += `<strong>${item.value}</strong>` + ' ';
					} else if (item.type === 'text' && item.italic) {
						html += `<em>${item.value}</em>` + ' ';
					} else if (item.type === 'text') {
						html += `${item.value}` + ' ';
					}
					if (item.type === 'link' && item.bold) {
						html +=
							`<a href="${item.url}" target="${item.target}"><strong>${item.children[0].value}</strong></a>` +
							' ';
					} else if (item.type === 'link' && item.italic) {
						html +=
							`<a href="${item.url}" target="${item.target}"><em>${item.children[0].value}</em></a>` +
							' ';
					} else if (item.type === 'link') {
						html +=
							`<a href="${item.url}" target="${item.target}">${item.children[0].value}</a>` + ' ';
					}
				});
				html += `</p>`;
				break;
		}
	});
	return html.replace(/\n/g, "<br />");
}

export function getMenuHandle(menuItem) {
 
  if (menuItem?.id && menuItem?.handle && menuItem.id.includes('Collection')) {
      return `/collections/${menuItem?.handle}`;
  } else if (menuItem?.id && menuItem?.handle && menuItem.id.includes('Product')) {
    return `/products/${menuItem?.handle}`;
  } else if(menuItem?.id) {
    return menuItem?.id ? `/${menuItem?.handle}` : `#`;
  }else{
    return menuItem?.handle ? `/${menuItem?.handle}` : `#`;
  }
}

export function stringTruncate(str, num = 155) {
  if (typeof str !== 'string') return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num - 3) + '...';
}