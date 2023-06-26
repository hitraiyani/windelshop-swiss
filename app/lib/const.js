export const PAGINATION_SIZE = 8;
export const DEFAULT_GRID_IMG_LOAD_EAGER_COUNT = 4;
export const ATTR_LOADING_EAGER = 'eager';
export const COOKIEBOT_KEY = '1150d907-0461-4015-b2ea-c91616abdb7f';
export const AICO_API_URL = 'https://app.aico.swiss/19929/api/v1/';
export const AICO_API_TOKEN = 'TBOtyivjQ8Wt8FIl0p40CYGIilM9PSxdk0wyKbuU';
export const STORE_LOCALE = 'de_CH';
export const STORE_LANG_FR = 'FR';
export const STORE_LANG_DE = 'DE';

export function getImageLoadingPriority(
  index,
  maxEagerLoadCount = DEFAULT_GRID_IMG_LOAD_EAGER_COUNT,
) {
  return index < maxEagerLoadCount ? ATTR_LOADING_EAGER : undefined;
}
