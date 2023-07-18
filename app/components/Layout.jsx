import {
  useParams,
  Form,
  Await,
  useMatches,
  useFetcher,
  NavLink,
  useLocation,
} from '@remix-run/react';
import {useWindowScroll} from 'react-use';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {Suspense, useEffect, useMemo, useState, useRef} from 'react';
import {Fragment, useContext} from 'react';
import {WishlistContext} from '~/store/WishlistContext';
import Cookies from 'js-cookie';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';

import {
  Drawer,
  useDrawer,
  Text,
  Input,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch2,
  IconSearch,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  CountrySelector,
  Cart,
  CartLoading,
  Link,
  ShopifyCookie,
  ChevronDownIcon,
  IconArrowRight2,
  IconGoogle,
  IconStar2,
  IconPhone,
  IconMail,
  IconMap,
  IconFacebook,
  CompareAtPrice,
  IconWhishlist,
  IconCart,
  IconLogin2,
} from '~/components';
import {
  useIsHomePath,
  toHTML,
  getMenuHandle,
  translate,
  isDiscounted,
  productTranslate,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import {Helmet} from 'react-helmet';
import {
  COOKIEBOT_KEY,
  AICO_API_URL,
  AICO_API_TOKEN,
  STORE_LANG_FR,
  STORE_LANG_DE,
} from '~/lib/const';
import { IconCart2 } from './Icon';

export function Layout({children, layout, locale}) {
  const [isCookieAccepted, setisCookieAccepted] = useState(false);

  const [brandData, setbrandData] = useState([]);

  const loadBrandData = async () => {
    const brandResponse = await fetch(
      `${AICO_API_URL}brands?filter[isTopBrand]=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AICO_API_TOKEN}`,
        },
      },
    );
    const brandResponseData = await brandResponse.json();
    setbrandData(brandResponseData.data);
  };

  const checkLanguageCookie = () => {
    // const lang = Cookies.get('language');
    // const firstPathPart = location.pathname.substring(1).split('/')[0].toLowerCase();
    // if (firstPathPart == 'fr' && lang != 'fr') {
    //     Cookies.set('language', 'fr', { expires: 30 });
    // }
  };

  useEffect(() => {
    //loadBrandData();
    checkLanguageCookie();
    function handleCookiebotAccept(e) {
      if (Cookiebot.consent.marketing) {
        //Execute code that sets marketing cookies
        setisCookieAccepted(true);
      }
    }
    window.addEventListener('CookiebotOnAccept', handleCookiebotAccept, false);

    return () => {
      window.removeEventListener(
        'CookiebotOnAccept',
        handleCookiebotAccept,
        false,
      );
    };
  }, []);

  return (
    <>
      {isCookieAccepted ? <ShopifyCookie locale={locale} /> : ''}
      <Helmet>
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={COOKIEBOT_KEY}
          data-blockingmode="auto"
          type="text/javascript"
        />
      </Helmet>
      <div className="">
        <a href="#mainContent" className="sr-only">
          Skip to content
        </a>
      </div>
      <Header
        title={layout?.shop.name ?? 'Hydrogen'}
        menu={layout?.headerMenu}
        aicoMenu={layout?.aicoHeaderMenu}
        toBar={layout?.hederTopBar}
        locale={locale}
      />
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      <Footer menu={layout?.footerMenu} locale={locale} />
    </>
  );
}

function Header({title, menu, aicoMenu, toBar, locale}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={closeMenu}
          menu={menu}
          aicoMenu={aicoMenu}
          locale={locale}
        />
      )}
      <TopbarHeader toBar={toBar} />
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        aicoMenu={aicoMenu}
        openCart={openCart}
        locale={locale}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
        locale={locale}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}) {
  const [root] = useMatches();

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={root.data?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({isOpen, onClose, menu, aicoMenu, locale}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav
          menu={menu}
          aicoMenu={aicoMenu}
          onClose={onClose}
          locale={locale}
        />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, aicoMenu, onClose, locale}) {
  const megaMenuMobileClick = (event) => {
    const menuItems = document.querySelectorAll('.mobile-nav-sec .menu-item');
    event.currentTarget.parentNode.parentNode.classList.toggle('active');
    // const currentMenuContainer = event.currentTarget.parentNode?.parentNode?.getElementsByClassName('menu-item')[0];
    menuItems.forEach((item) => {
      if (
        item !== event.currentTarget.parentNode.parentNode &&
        item.classList.contains('active')
      ) {
        item.classList.remove('active');
      }
    });
    // setTimeout(() => {
    //   if (currentMenuContainer) {
    //       currentMenuContainer?.scrollIntoView({behavior:'smooth', block:'start'});
    //   }
    // },200);
  };
  return (
    <nav className="grid p-[20px] mobile-nav-sec">
      {/* Top level menu items */}
      {aicoMenu.map((item, index) => {
        return (
          <div className="menu-item flex-auto" key={index}>
            <div className="flex flex-wrap items-center w-full sticky top-0 z-[92] py-[15px] bg-gray-50">
              <Link
                to={`${
                  item.category.name == ' Home'
                    ? '/'
                    : getMenuHandle(item.category)
                }`}
                className="text-[18px] text-black font-medium"
                onClick={onClose}
              >
                {translate(item.category.name, locale?.language)}
              </Link>
              {item?.category?.subCategories?.length > 0 && (
                <div
                  onClick={megaMenuMobileClick}
                  className="flex-1 flex justify-end"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m6 12l10 10l10-10"
                    />
                  </svg>
                </div>
              )}
            </div>
            {item?.category?.subCategories?.length > 0 && (
              <SubMegaMenu
                subMenus={item?.category?.subCategories}
                key={index}
                onClose={onClose}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

function MobileHeader({title, isHome, openCart, openMenu, locale}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);
  const params = useParams();
  const wishlistContextData = useContext(WishlistContext);
  const [isActiveSearchMobile, setActiveSearchMobile] = useState(false);
  const {load, data} = useFetcher();
  const [searchString, setsearchString] = useState('');
  const [isSearchOpen, setSearchOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log('path chagne');
    setActiveSearchMobile(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleBodyClick = (e) => {
      setSearchOpen(false);

      // console.log("Out CLik");
    };

    document.body.addEventListener('click', handleBodyClick);
    //mainContent
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const handleSearchClick = (e) => {
    e.stopPropagation();
    setSearchOpen(true);
    // setActiveSearchMobile(true);
  };
  const handleSearchBox = (event) => {
    setsearchString(event.target.value);
    const count = 12;
    const reverse = true;
    const query = event.target.value;
    if (query.length > 2) {
      const queryString = Object.entries({count, query, reverse})
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&');
      load(`/api/products?${queryString}`);
    }
  };

  const toggleSearchClassMobile = () => {
    setActiveSearchMobile(!isActiveSearchMobile);
  };
  const handleLanguageChange = (e) => {
    e.stopPropagation();
    let selectedLang = e.currentTarget.getAttribute('data-lang');
    if (selectedLang) {
      Cookies.set('language', selectedLang, {expires: 30});
      setTimeout(() => {
        var selectedLanguage = selectedLang;
        const currentUrl = window.location.href;
        let newUrl = currentUrl;
        const firstPathPart = location.pathname
          .substring(1)
          .split('/')[0]
          .toLowerCase();
        if (firstPathPart == 'fr' && selectedLanguage != 'fr') {
          newUrl = currentUrl.replace('/fr', '');
        }
        if (firstPathPart != 'fr' && selectedLanguage == 'fr') {
          newUrl =
            location.origin +
            '/fr/' +
            (location.pathname + location.search).substr(1);
        }
        window.location.href = newUrl;
      }, 200);
    }
  };
  return (
    <header
      role="banner"
      className={`${isHome ? '' : ''} bg-[#E7EFFF] relative lg:hidden`}
    >
      <div className="top flex bg-[#CCDDF1] py-[10px] px-[10px] md:px-[40px]">
        <div className="lang flex-1">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex gap-[6px] items-center">
                <span className="flag w-[16px] h-[16px] overflow-hidden relative">
                  <img
                    className="inset-0 w-full h-full object-contain"
                    src={
                      locale?.language == STORE_LANG_FR
                        ? 'https://cdn.shopify.com/s/files/1/0763/5307/7525/files/fr.png?v=1687766463'
                        : 'https://cdn.shopify.com/s/files/1/0763/5307/7525/files/de_png.svg?v=1685425346'
                    }
                    alt=""
                  />
                </span>
                <span className="name text-[16px] text-black leading-[1.1] font-medium">
                  {locale?.language == STORE_LANG_FR ? 'Français' : 'Deutsch'}
                </span>
                <ChevronDownIcon className={'w-[10px] h-[7px]'} />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({active}) => (
                      <button
                        onClick={handleLanguageChange}
                        data-lang="de"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'px-4 py-2 text-sm flex gap-[6px] items-center ',
                        )}
                      >
                        <span className="flag  w-[16px] h-[16px] overflow-hidden relative">
                          <img
                            className="inset-0 w-full h-full object-contain"
                            src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/de_png.svg?v=1685425346"
                            alt=""
                          />
                        </span>
                        <span className="name text-[16px] text-black leading-[1.1] font-medium">
                          Deutsch
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({active}) => (
                      <button
                        data-lang="fr"
                        onClick={handleLanguageChange}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'px-4 py-2 text-sm flex gap-[6px] items-center',
                        )}
                      >
                        <span className="flag  w-[16px] h-[16px] overflow-hidden relative">
                          <img
                            className="inset-0 w-full h-full object-contain"
                            src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/fr.png?v=1687766463"
                            alt=""
                          />
                        </span>
                        <span className="name text-[16px] text-black leading-[1.1] font-medium">
                          Français
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="login-menu flex-1">
          <ul className="flex gap-[20px] justify-end">
            <li>
              <Link
                to={'/account'}
                className="text-black text-[16px] leading-none font-medium hover:opacity-70 transition-all duration-500"
              >
                {/* {translate('account', locale?.language)} */}
                <div className="icon w-[20px] h-[20px]">
                  <IconAccount className={'w-full h-full'} />
                </div>
              </Link>
            </li>
            <li>
              <Link
                to={'/wishlist'}
                className="text-black text-[16px] leading-none font-medium hover:opacity-70 transition-all duration-500 flex gap-[2px] items-center"
              >
                {/* {translate('wishlist', locale?.language)} */}
                <div className="icon w-[20px] h-[20px]">
                  <IconWhishlist className={'w-full h-full'} />
                </div>
                <span>
                  (
                  {wishlistContextData?.wishlistItems
                    ? wishlistContextData?.wishlistItems.length
                    : 0}
                  )
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={'/cart'}
                className="text-black text-[16px] leading-none font-medium hover:opacity-70 transition-all duration-500"
              >
                {/* {translate('cart', locale?.language)} */}
                <div className="icon w-[20px] h-[20px]">
                  <IconCart className={'w-full h-full'} />
                </div>
              </Link>
            </li>
            <li>
              <Link
                to={'/account/login'}
                className="text-black text-[16px] leading-none font-medium hover:opacity-70 transition-all duration-500"
              >
                {/* {translate('login', locale?.language)} */}
                <div className="icon w-[20px] h-[20px]">
                  <IconLogin2 className={'w-full h-full'} />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container py-[10px] !px-[10px] md:!px-[40px]">
        <div className="row flex justify-between">
          <div className="logo-col w-[190px] sm:w-[230px] flex items-center">
            <Link className="block" to="/">
              {/* <Heading
                className="font-bold text-center leading-none"
                as={isHome ? 'h1' : 'h2'}
              >
                {title}
              </Heading> */}
              <img
                className="w-full h-full object-contain object-left-top"
                src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/windelshop-2022-de_png.png?v=1685435114"
                alt=""
              />
            </Link>
          </div>
          <div className="flex items-center justify-end gap-[5px]">
            <button
              onClick={openMenu}
              className="relative flex items-center justify-center w-[20px] h-[20px]"
            >
              <IconMenu className={'w-full h-full'} />
            </button>
            <div className="w-[20px] h-[20px]">
              <button
                className={`relative flex items-center justify-center w-full h-full`}
                onClick={toggleSearchClassMobile}
              >
                <IconSearch2 />
              </button>
            </div>
            {/* <Form
              method="get"
              action={params.locale ? `/${params.locale}/search` : '/search'}
              className="items-center gap-2 sm:flex"
            >
              <button
                type="submit"
                className="relative flex items-center justify-center w-[20px] h-[20px]"
              >
                <IconSearch2 />
              </button>
              <Input
                className={
                  isHome
                    ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                    : 'focus:border-primary/20'
                }
                type="search"
                variant="minisearch"
                placeholder="Search"
                name="q"
              />
            </Form> */}
            <CartCount isHome={isHome} openCart={openCart} />
            {/* <div className="flex items-center justify-end w-full gap-4">
          <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        </div> */}
          </div>
        </div>
      </div>
      <div
        className={`${
          isActiveSearchMobile ? 'block' : 'hidden'
        } search-box absolute top-full left-0 right-0 w-full bg-[#E7EFFF] py-[20px] z-[10] border-t-[2px] border-[#ccddf1]`}
      >
        <div className="container">
          <div className="flex items-center gap-[10px]">
            <Form
              method="get"
              action={params.locale ? `/${params.locale}/search` : '/search'}
              className="flex flex-auto relative"
            >
              <Input
                className={`w-full h-[50px] rounded-[100px] !bg-[#CCDDF1] text-black text-[16px] font-medium leading-none placeholder:!text-black placeholder:!opacity-100 focus:!border-none !pl-[50px] !pr-[20px] focus:!ring-0 focus:!border-[#5391d9] !text-left !block`}
                type="search"
                variant="minisearch"
                placeholder="Suche"
                name="q"
                onChange={handleSearchBox}
                onClick={handleSearchClick}
              />

              {searchString.length > 2 && (
                <ProductSearchLi
                  products={data?.products}
                  searchOpen={isSearchOpen}
                  locale={locale?.language}
                />
              )}
              <button
                type="submit"
                className={`left-[30px] absolute flex items-center justify-center w-8 h-8 focus:ring-primary/5 top-1/2  -translate-x-1/2 -translate-y-1/2`}
              >
                <IconSearch2 />
              </button>
            </Form>
            <span
              className="icon search-overlay__close cursor-pointer block"
              onClick={toggleSearchClassMobile}
              data-icon="x"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width={24}
                height={24}
              >
                <g id="x">
                  <polygon points="97.83 7.83 92.17 2.17 50 44.34 7.83 2.17 2.17 7.83 44.34 50 2.17 92.17 7.83 97.83 50 55.66 92.17 97.83 97.83 92.17 55.66 50 97.83 7.83" />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function ProductSearchLi({products, searchOpen, locale}) {
  return (
    <ul
      className={`searchDropDown ${
        searchOpen ? 'is-active' : ''
      } bg-white shadow-lg w-full p-[20px] productSearchList absolute top-[100%] mt-[10px] rounded-[20px] z-[111] last:border-none max-h-[50vh] overflow-auto`}
    >
      {products?.length > 0 &&
        products.map((product) => {
          const firstVariant = flattenConnection(product?.variants)[0];
          if (!firstVariant) return null;
          const {image, price, compareAtPrice} = firstVariant;
          const inDisc = isDiscounted(price, compareAtPrice);
          return (
            <li
              key={product.id}
              className="pb-[15px] mb-[15px] border-b-[1px] border-[#eee]"
            >
              <NavLink
                className="block"
                to={`/products/${product.handle}`}
                prefetch="intent"
              >
                <div className="flex gap-5 items-center">
                  {image && (
                    <Image
                      widths={[100]}
                      height={[100]}
                      sizes="138px"
                      data={image}
                      alt={image.altText || `Picture of ${product.title}`}
                      loading={'eager'}
                      className={
                        '!w-[60px] md:!w-[100px] md:!h-[100px] !h-[60px] object-contain p-[5px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[10px]'
                      }
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-[16px]">
                      {productTranslate(product, 'title', locale)}
                    </h4>
                    <Text className="flex gap-1 text-[14px]">
                      <Money
                        withoutTrailingZeros
                        data={price}
                        className={`${inDisc ? 'sale-price' : ''}`}
                      />
                      {inDisc && (
                        <CompareAtPrice
                          className={'text-gray-400 line-through'}
                          data={compareAtPrice}
                        />
                      )}
                    </Text>
                  </div>
                </div>
              </NavLink>
            </li>
          );
        })}
      {products?.length == 0 && (
        <li className="py-3 block text-[16px]">
          {translate('empty_product_search_txt', locale)}.
        </li>
      )}
    </ul>
  );
}

function TopbarHeader({toBar}) {
  return (
    <div className="top-bar-sec bg-[#CCDDF1] py-[10px] hidden lg:block ">
      <div className="container !max-w-[1420px]">
        <div className="top-bar-inner">
          <ul className="topbar-list flex justify-between flex-nowrap overflow-auto gap-[15px]">
            <li className="flex gap-[5px] items-center flex-[0_0_auto]">
              <span className="icon w-[20px] h-[20px] relative overflow-hidden">
                <img
                  className="w-full h-full object-contain inset-0 absolute"
                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/GRATIS_LIEFERUNG_ab.svg?v=1685422519"
                  alt=""
                />
              </span>
              <span
                className="name uppercase font-medium text-[11px] tracking-[0.5px] xl:text-[14px] text-black"
                dangerouslySetInnerHTML={{
                  __html: toHTML(toBar?.section_1?.value),
                }}
              ></span>
            </li>
            <li className="flex gap-[5px] items-center flex-[0_0_auto]">
              <span className="icon w-[20px] h-[20px] relative overflow-hidden">
                <img
                  className="w-full h-full object-contain inset-0 absolute"
                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Privatkunden-Paketversand.svg?v=1685422519"
                  alt=""
                />
              </span>
              <span
                className="name uppercase font-medium text-[11px] tracking-[0.5px] xl:text-[14px] text-black"
                dangerouslySetInnerHTML={{
                  __html: toHTML(toBar?.section_2?.value),
                }}
              ></span>
            </li>
            <li className="flex gap-[5px] items-center flex-[0_0_auto]">
              <span className="icon w-[20px] h-[20px] relative overflow-hidden">
                <img
                  className="w-full h-full object-contain inset-0 absolute"
                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Lieferung_bis_Lagerplatz.svg?v=1685422519"
                  alt=""
                />
              </span>
              <span
                className="name uppercase font-medium text-[11px] tracking-[0.5px] xl:text-[14px] text-black"
                dangerouslySetInnerHTML={{
                  __html: toHTML(toBar?.section_3?.value),
                }}
              ></span>
            </li>
            <li className="flex gap-[5px] items-center flex-[0_0_auto]">
              <span className="icon w-[20px] h-[20px] relative overflow-hidden">
                <img
                  className="w-full h-full object-contain inset-0 absolute"
                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Rufen_Sie_uns_an.svg?v=1685422519"
                  alt=""
                />
              </span>
              <span
                className="name uppercase font-medium text-[11px] tracking-[0.5px] xl:text-[14px] text-black"
                dangerouslySetInnerHTML={{
                  __html: toHTML(toBar?.section_4?.value),
                }}
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function SubMegaMenu({subMenus, onClose, locale}) {
  return (
    <div className="mega-menu absolute bg-[#CCDDF1] rounded-[20px] z-[99] ">
      <div className="mega-menu-inner container">
        <div className="mega-menu-lists flex flex-wrap py-[30px] lg:py-[40px] xl:py-[60px] 2xl:py-[70px] gap-y-[15px] lg:gap-y-[30px] xl:gap-y-[50px] 2xl:gap-y-[70px] -mx-[15px]">
          {subMenus.map((subItem, subIndex) => {
            return (
              <div
                className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]"
                key={subIndex}
              >
                <div className="sub-menu-title text-[18px] leading-[1.1] font-bold mb-[12px] text-black">
                  {/* <Link
                    to={getMenuHandle(subItem.subCategory)}
                  > */}
                  {translate(subItem?.subCategory?.name, locale?.language)}
                  {/* </Link> */}
                </div>
                {subItem.subCategory.subSubCategories?.length > 0 && (
                  <ul>
                    {subItem.subCategory.subSubCategories.map(
                      (innerSubItem, innerSubIndex) => (
                        <li key={innerSubIndex}>
                          <Link
                            to={getMenuHandle(innerSubItem.subSubCategory)}
                            onClick={onClose}
                          >
                            {translate(
                              innerSubItem?.subSubCategory?.name,
                              locale?.language,
                            )}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DesktopHeader({isHome, menu, aicoMenu, openCart, title, locale}) {
  const params = useParams();
  const {y} = useWindowScroll();
  const {load, data} = useFetcher();

  const wishlistContextData = useContext(WishlistContext);

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [searchString, setsearchString] = useState('');

  useEffect(() => {
    const handleBodyClick = (e) => {
      setSearchOpen(false);
      console.log('Out CLik');
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const handleSearchClick = (e) => {
    e.stopPropagation();
    setSearchOpen(true);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    console.log('LInk Click');
    //setSearchOpen(true);
  };

  const handleLanguageChange = (e) => {
    e.stopPropagation();
    let selectedLang = e.currentTarget.getAttribute('data-lang');
    if (selectedLang) {
      Cookies.set('language', selectedLang, {expires: 30});
      setTimeout(() => {
        var selectedLanguage = selectedLang;
        const currentUrl = window.location.href;
        let newUrl = currentUrl;
        const firstPathPart = location.pathname
          .substring(1)
          .split('/')[0]
          .toLowerCase();
        if (firstPathPart == 'fr' && selectedLanguage != 'fr') {
          newUrl = currentUrl.replace('/fr', '');
        }
        if (firstPathPart != 'fr' && selectedLanguage == 'fr') {
          newUrl =
            location.origin +
            '/fr/' +
            (location.pathname + location.search).substr(1);
        }
        window.location.href = newUrl;
      }, 200);
    }
  };

  const handleSearchBox = (event) => {
    setsearchString(event.target.value);
    const count = 12;
    const reverse = true;
    const query = event.target.value;
    if (query.length > 2) {
      const queryString = Object.entries({count, query, reverse})
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&');
      load(`/api/products?${queryString}`);
    }
  };

  const menuCloseHandler = (e) => {
    //e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
    setActiveMenuItem(null);
  };

  const handleMouseEnter = (e, id) => {
    setActiveMenuItem(id);
    // setTimeout(() => {
    //   setActiveMenuItem(id);
    // }, 200);
  };
  const handleMouseLeave = (e, id) => {
    //setActiveMenuItem(null);
    setActiveMenuItem((Previous) => {
      // console.log(Previous);
      Previous = null;
    });
  };

  // useEffect(() => {
  //   const menu = document.querySelector('.clean-hover-menu');
  //   menu.addEventListener('mouseleave', handleMouseLeave);
  //   return () => {
  //     menu.removeEventListener('mouseleave', handleMouseLeave);
  //   };
  // }, []);

  return (
    <header
      role="banner"
      className={`${isHome ? '' : ''} ${
        !isHome && y > 50 && '' ? '' : ''
      } relative top-0 bg-[#E7EFFF] py-[20px]  rounded-[0_0_20px_20px] hidden lg:block`}
    >
      <div className="container">
        <div className="header-row gap-[33px] flex flex-col">
          <div className="top flex gap-[15px]">
            <div className="lang flex-1">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex gap-[6px] items-center">
                    <span className="flag w-[16px] h-[11px] overflow-hidden relative">
                      <img
                        className="inset-0 w-full h-full object-contain"
                        src={
                          locale?.language == STORE_LANG_FR
                            ? 'https://cdn.shopify.com/s/files/1/0763/5307/7525/files/fr.png?v=1687766463'
                            : 'https://cdn.shopify.com/s/files/1/0763/5307/7525/files/de_png.svg?v=1685425346'
                        }
                        alt=""
                      />
                    </span>
                    <span className="name text-[16px] text-black leading-[1.1] font-medium">
                      {locale?.language == STORE_LANG_FR
                        ? 'Français'
                        : 'Deutsch'}
                    </span>
                    <ChevronDownIcon className={'w-[10px] h-[7px]'} />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({active}) => (
                          <button
                            onClick={handleLanguageChange}
                            data-lang="de"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'px-4 py-2 text-sm flex gap-[6px] items-center ',
                            )}
                          >
                            <span className="flag  w-[16px] h-[16px] overflow-hidden relative">
                              <img
                                className="inset-0 w-full h-full object-contain"
                                src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/de_png.svg?v=1685425346"
                                alt=""
                              />
                            </span>
                            <span className="name text-[16px] text-black leading-[1.1] font-medium">
                              Deutsch
                            </span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({active}) => (
                          <button
                            data-lang="fr"
                            onClick={handleLanguageChange}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'px-4 py-2 text-sm flex gap-[6px] items-center',
                            )}
                          >
                            <span className="flag  w-[16px] h-[16px] overflow-hidden relative">
                              <img
                                className="inset-0 w-full h-full object-contain"
                                src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/fr.png?v=1687766463"
                                alt=""
                              />
                            </span>
                            <span className="name text-[16px] text-black leading-[1.1] font-medium">
                              Français
                            </span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="login-menu flex-2">
              <ul className="flex gap-[50px]">
                <li>
                  <Link
                    to={'/account'}
                    className="text-black text-[16px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    {translate('account', locale?.language)}
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/wishlist'}
                    className="text-black text-[16px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    {translate('wishlist', locale?.language)}{' '}
                    <span>
                      (
                      {wishlistContextData?.wishlistItems
                        ? wishlistContextData?.wishlistItems.length
                        : 0}
                      )
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/cart'}
                    className="text-black text-[16px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    {translate('cart', locale?.language)}
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/account/login'}
                    className="text-black text-[16px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    {translate('login', locale?.language)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="empty flex-1"></div>
          </div>
          <div className="middle flex gap-[15px] items-center justify-between">
            <Link
              className="max-w-[266px] block flex-1"
              to="/"
              prefetch="intent"
            >
              {/* {title} */}
              <img
                className="w-full h-auto"
                src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/windelshop-2022-de_png.png?v=1685435114"
                alt=""
              />
            </Link>
            <Form
              method="get"
              action={params.locale ? `/${params.locale}/search` : '/search'}
              className="flex flex-auto max-w-[575px] relative"
            >
              <Input
                className={`w-full h-[50px] rounded-[100px] !bg-[#CCDDF1] text-black text-[16px] font-medium leading-none placeholder:!text-black placeholder:!opacity-100 focus:!border-none !pl-[50px] !pr-[20px] focus:!ring-0 focus:!border-[#5391d9] border-none ${
                  isSearchOpen || searchString.length > 0
                    ? '!text-left'
                    : '!text-center'
                }`}
                type="search"
                variant="minisearch"
                placeholder={translate('search_box', locale?.language)}
                name="q"
                onChange={handleSearchBox}
                onClick={handleSearchClick}
                autoComplete="off"
              />
              <button
                type="submit"
                className={`${
                  isSearchOpen || searchString.length > 0
                    ? 'left-[30px]'
                    : 'left-[43%]'
                } absolute flex items-center justify-center w-8 h-8 focus:ring-primary/5 top-1/2  -translate-x-1/2 -translate-y-1/2`}
              >
                <IconSearch2 />
              </button>
              {searchString.length > 2 && (
                <ProductSearchLi
                  products={data?.products}
                  searchOpen={isSearchOpen}
                  locale={locale?.language}
                />
              )}
            </Form>
            <CartCount isHome={isHome} openCart={openCart} />
          </div>
          <div className="bottom">
            <nav className="flex gap-[5px] relative main-navbar">
              {/* Top level menu items */}
              {aicoMenu.map((item, index) => {
                return (
                  <div
                    className="menu-item flex-auto clean-hover-menu"
                    key={index}
                    onMouseEnter={(event) =>
                      handleMouseEnter(event, item.category.name)
                    }
                    onMouseLeave={(event) =>
                      handleMouseLeave(event, item.category.name)
                    }
                  >
                    <Link
                      to={`${
                        item.category.name == ' Home'
                          ? '/'
                          : getMenuHandle(item.category)
                      }`}
                      className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[14px] xl:text-[16px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                    >
                      {translate(item.category.name, locale?.language)}
                    </Link>
                    {item?.category?.subCategories?.length > 0 && (
                      <div
                        className={`mega-menu-div ${
                          activeMenuItem === item?.category?.name
                            ? 'is-active'
                            : ''
                        }`}
                      >
                        <SubMegaMenu
                          subMenus={item?.category?.subCategories}
                          key={index}
                          onClose={menuCloseHandler}
                          locale={locale}
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[14px] xl:text-[16px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Home
                </a>
              </div>
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[14px] xl:text-[16px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Windeln & Feuchttücher
                </a>
                <div className="mega-menu absolute bg-[#CCDDF1] rounded-[20px] z-[99]">
                  <div className="mega-menu-inner container">
                    <div className="mega-menu-lists flex flex-wrap py-[70px] gap-y-[30px] -mx-[15px]">
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] px-[15px]">
                        <div className="mega-menu-list-inner bg-white p-[50px] rounded-[30px] h-full">
                          <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                            Kategorien
                          </div>
                          <ul>
                            <li>
                              <a href="#">Bio-Windeln</a>
                            </li>
                            <li>
                              <a href="#">Feuchttücher</a>
                            </li>
                            <li>
                              <a href="#">Windeleinlagen</a>
                            </li>
                            <li>
                              <a href="#">Nachwindeln</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] px-[15px]">
                        <div className="mega-menu-list-inner bg-white p-[50px] rounded-[30px] h-full">
                          <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                            Kollektionen
                          </div>
                          <ul>
                            <li>
                              <a href="#">Huggies Schwimm-Windeln</a>
                            </li>
                            <li>
                              <a href="#">Huggies Dry Nites</a>
                            </li>
                            <li>
                              <a href="#">
                                Sangenic Tommee Tippee Windelentsorgung
                              </a>
                            </li>
                            <li>
                              <a href="#">Pampers Pants</a>
                            </li>
                            <li>
                              <a href="#">Naty Biowindeln</a>
                            </li>
                            <li>
                              <a href="#">Pingo Pants</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] px-[15px]">
                        <div className="mega-menu-list-inner bg-white p-[50px] rounded-[30px] h-full">
                          <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[20px] text-black">
                            Marken
                          </div>
                          <ul className="!grid grid-cols-3 !gap-y-[60px] !gap-x-[20px] brands-logos">
                            <li>
                              <a href="#">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/g114768.png?v=1685447152"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/pingo_logo_2.png?v=1685447152"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/triodoshippo_heroImageDesktop_1.png?v=1685447152"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Libero-Logo_1.png?v=1685447152"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Vector_4a305661-3e74-4ac9-87d5-76f98fecf6f0.png?v=1685447152"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/huggies-brand-logo-vector_1.png?v=1685447152"
                                  alt=""
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[14px] xl:text-[16px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Damenhygiene & Inkontinenz
                </a>
              </div>
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[14px] xl:text-[16px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Waschmittel & Weichspüler
                </a>
              </div>
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[14px] xl:text-[16px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Pflege & Hygiene
                </a>
                <div className="mega-menu absolute bg-[#CCDDF1] rounded-[20px] z-[99]">
                  <div className="mega-menu-inner container">
                    <div className="mega-menu-lists flex flex-wrap py-[30px] lg:py-[40px] xl:py-[60px] 2xl:py-[70px] gap-y-[15px] lg:gap-y-[30px] xl:gap-y-[50px] 2xl:gap-y-[70px] -mx-[15px]">
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Absfallentsorgung
                        </div>
                        <ul>
                          <li>
                            <a href="#">Windelentsorgung</a>
                          </li>
                          <li>
                            <a href="#">Abfallsäcke</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Bett- & Wickelunterlagen
                        </div>
                        <ul>
                          <li>
                            <a href="#">Bettunterlagen</a>
                          </li>
                          <li>
                            <a href="#">Wickelunterlagen</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Bocoton Bio
                        </div>
                        <ul>
                          <li>
                            <a href="#">Bocoton Baby-Tücher</a>
                          </li>
                          <li>
                            <a href="#">Bocoton Bio Watte</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Hautpflege
                        </div>
                        <ul>
                          <li>
                            <a href="#">Wundschutzcreme</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Sonnenschutzpflege
                        </div>
                        <ul>
                          <li>
                            <a href="#">Kinder - Kids</a>
                          </li>
                          <li>
                            <a href="#">Erwachsene</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Desinfektion
                        </div>
                        <ul>
                          <li>
                            <a href="#">Hand-Desinfektion</a>
                          </li>
                          <li>
                            <a href="#">Flächen-Desinfektion</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Reinigen & Waschen
                        </div>
                        <ul>
                          <li>
                            <a href="#">Hand-Seifen</a>
                          </li>
                          <li>
                            <a href="#">Reinigungsmittel für Ihren Betrieb</a>
                          </li>
                          <li>
                            <a href="#">Waschmittel</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Papierwaren
                        </div>
                        <ul>
                          <li>
                            <a href="#">Wattepads & Wickelkrepp</a>
                          </li>
                          <li>
                            <a href="#">Kosmetik/Taschentücher & Servietten</a>
                          </li>
                          <li>
                            <a href="#">Haushalt- & Papierhandtücher</a>
                          </li>
                          <li>
                            <a href="#">WC-Papier</a>
                          </li>
                          <li>
                            <a href="#">Hygienebeutel</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Untersuchungshandschuhe
                        </div>
                        <ul>
                          <li>
                            <a href="#">Nitril-Handschuhe</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Zahnhygiene
                        </div>
                        <ul>
                          <li>
                            <a href="#">Zahnbürsten & Halterungen</a>
                          </li>
                          <li>
                            <a href="#">Zahnpasten</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Zubehör
                        </div>
                        <ul>
                          <li>
                            <a href="#">Ausguss & Dosierung</a>
                          </li>
                          <li>
                            <a href="#">Spender & Wanderhalterung</a>
                          </li>
                          <li>
                            <a href="#">Schutz</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[16px] leading-[1.1] font-bold mb-[12px] text-black">
                          Feuchttücher
                        </div>
                        <ul>
                          <li>
                            <a href="#">Swilet Feuchttücher</a>
                          </li>
                          <li>
                            <a href="#">Naty Feuchttücher</a>
                          </li>
                          <li>
                            <a href="#">Pampers Feuchttücher</a>
                          </li>
                          <li>
                            <a href="#">Pingo Feuchttücher</a>
                          </li>
                          <li>
                            <a href="#">Bocoton Feuchttücher</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[14px] xl:text-[16px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Abos & Gutscheine
                </a>
              </div> */}
              {/* {(menu?.items || []).map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  target={item.target}
                  prefetch="intent"
                  className={({isActive}) =>
                    isActive ? 'bg-[#CCDDF1] rounded-[10px] text-[16px] text-black font-bold leading-[1.2] h-[53px] flex items-center justify-center text-center p-[15px] flex-auto' : 'bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[16px] text-white font-bold leading-[1.2] h-[53px] flex items-center justify-center text-center p-[15px] transition-all duration-500'
                  }
                >
                  {item.title}
                </Link>
              ))} */}
            </nav>
          </div>
        </div>
        {/* <div className="flex items-center gap-1">
          <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" />
        </div> */}
      </div>
    </header>
  );
}

function AccountLink({className}) {
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

function CartCount({isHome, openCart}) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
            cart={cart}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({openCart, dark, count, cart}) {
  const isHydrated = useIsHydrated();
  const [root] = useMatches();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconCart2 className={'w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] text-[#1c5f7b] hover:text-black transition-all duration-500'} />
        <div
          className={`${
            dark ? '' : ''
          } relative flex flex-col items-center header-cart`}
        >
          <div className="bg-[#ccddf1] absolute counter w-[15px] lg:w-[20px] h-[15px] lg:h-[20px] left-[50%] -translate-x-1/2 rounded-full flex items-center justify-center leading-none text-[12px] lg:text-[14px] bottom-[18px] lg:bottom-[23px] text-[#1c5f7b] font-bold">
            <span>{count || 0}</span>
          </div>
          {/* <span>
            &nbsp;
            {translate('cart_artikel', root?.data?.selectedLocale?.language)}{' '}
            -&nbsp;
          </span>
          {cart?.cost ? <Money as='span' data={cart.cost?.subtotalAmount} /> : <span>CHF 0.00</span>} */}
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button onClick={openCart} className="">
      {BadgeCounter}
    </button>
  ) : (
    <Link to="/cart" className="">
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu, locale}) {
  const isHome = useIsHomePath();
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className={`site-footer !p-0 !gap-0 mt-[20px] md:mt-[30px] xl:mt-[40px] 2xl:mt-[50px] border-none`}
    >
      <div className="footer-top bg-[#1C5F7B] rounded-[30px_30px_0px_0px] pt-[52px] pb-[40px]">
        <div className="container">
          <div className="footer-row-wrap">
            <div className="footer-row flex flex-row flex-wrap xl:flex-nowrap mx-[-15px] gap-y-[30px] md:gap-y-[40px] xl:gap-x-[20px] 2xl:gap-x-[70px]">
              <div className="footer-col px-[15px] w-[100%] md:w-[50%] xl:w-[30%]">
                <div className="col-inner">
                  <div className="logo max-w-[292px] mb-[5px]">
                    <img
                      className="max-w-full h-auto"
                      src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/footer-windelshop-de_png.png?v=1686140271"
                      alt=""
                    />
                  </div>
                  <div className="desc text-[#CCCCCC] text-[12px]">
                    <p>{translate('footer_text', locale?.language)}</p>
                  </div>
                  <div className="subscribe-form-footer mt-[33px]">
                    <form action="" className="">
                      <div className="form-group flex gap-[10px]">
                        <div className="form-control flex-1">
                          <input
                            type="email"
                            placeholder={translate(
                              'news_later',
                              locale?.language,
                            )}
                            className="w-full h-[50px] rounded-[100px] !bg-[#E7EFFF] text-[#1C5F7B] text-[16px] font-medium leading-none placeholder:!text-[#1C5F7B] placeholder:!opacity-100 focus:!border-white px-[20px] py-[16px] text-left !border-[#E7EFFF] focus:!ring-0"
                          />
                        </div>
                        <div className="form-control">
                          <button
                            type="submit"
                            className="bg-[#E7EFFF] rounded-full w-[50px] h-[50px] leading-none text-[12px] text-[#1C5F7B] text-center hover:opacity-70 transition-all duration-500 flex items-center justify-center mx-auto"
                          >
                            <span className="icon w-[40px] h-[40px]">
                              <IconArrowRight2 className={'w-full h-full'} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="google-review-wrap mt-[43px]">
                    <div className="google-review-inner">
                      <div className="icon-with-star flex gap-[17px] items-center">
                        <div className="icon w-[58px] h-[58px] rounded-[10px] bg-white p-[9px]">
                          <IconGoogle className={'w-full h-full'} />
                        </div>
                        <div className="flex flex-1 flex-col gap-[3px]">
                          <div className="desc text-[16px] text-white font-semibold">
                            <p>{translate('review_text', locale?.language)}</p>
                          </div>
                          <div className="rating-start flex gap-[5px] items-center flex-[0_0_auto]">
                            <span className="text-[16px] text-white leading-none font-semibold ">
                              4.7
                            </span>
                            <div className="star flex text-[#CCDDF1]">
                              <IconStar2 className="w-[16px] h-[16px]" />
                              <IconStar2 className="w-[16px] h-[16px]" />
                              <IconStar2 className="w-[16px] h-[16px]" />
                              <IconStar2 className="w-[16px] h-[16px]" />
                              <IconStar2 className="w-[16px] h-[16px]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {menu?.items?.map((item, index) => {
                return (
                  <div
                    className="footer-col px-[15px] w-[50%] md:w-[25%] xl:w-[16.33%]"
                    key={index}
                  >
                    <div className="col-inner">
                      <div className="nav">
                        <h4 className="title text-[14px] text-white font-bold mb-[15px] uppercase">
                          {item.title}
                        </h4>
                        <ul className="nav-list flex flex-col gap-[15px]">
                          {item.items.map((subItem, subIndex) => (
                            <li
                              className="text-[12px] text-white font-normal"
                              key={subIndex}
                            >
                              <Link
                                to={item.to}
                                target={item.target}
                                className="hover:opacity-70 transition-all duration-500"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="footer-col px-[15px] w-[23%]">
                <div className="col-inner">
                  <div className="contact-info">
                    <ul className="flex flex-col gap-[20px]">
                      <li>
                        <a
                          href="#"
                          className="text-[12px] flex gap-[10px] text-[#CCCCCC] font-normal items-center hover:text-white transition-all duration-500"
                        >
                          <span className="icon w-[31px] h-[31px] border-[2px] rounded-full border-[#E7EFFF] p-[7px] text-[#CCDDF1]">
                            <IconMap className={'w-full h-full'} />
                          </span>
                          <span className="text flex-1">
                            {translate('address', locale?.language)}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-[12px] flex gap-[10px] text-[#CCCCCC] font-normal items-center hover:text-white transition-all duration-500"
                        >
                          <span className="icon w-[31px] h-[31px] border-[2px] rounded-full border-[#E7EFFF] p-[7px] text-[#CCDDF1]">
                            <IconPhone className={'w-full h-full'} />
                          </span>
                          <span className="text flex-1">
                            {translate('phone_number', locale?.language)}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-[12px] flex gap-[10px] text-[#CCCCCC] font-normal items-center hover:text-white transition-all duration-500"
                        >
                          <span className="icon w-[31px] h-[31px] border-[2px] rounded-full border-[#E7EFFF] p-[7px] text-[#CCDDF1]">
                            <IconMail className={'w-full h-full'} />
                          </span>
                          <span className="text flex-1">
                            {translate('email_send', locale?.language)}
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="social-links flex flex-wrap gap-[10px] mt-[30px]">
                    <a
                      href="#"
                      className="w-[36px] text-[#E7EFFF] hover:text-white transition-all duration-500"
                    >
                      <IconFacebook className={'w-full h-full'} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <FooterMenu menu={menu} /> */}
      {/* <CountrySelector /> */}
      <div className={`footer-bottom bg-[#CCDDF1] py-[15px]`}>
        <div className="container">
          <p className="text-[12px] text-[#1C5F7B] font-normal text-center">
            {new Date().getFullYear()} Copyright &copy; Homerunner GmbH,
            Windelshop & Swilet – All Rights Reserved
          </p>
        </div>
      </div>
    </Section>
  );
}

const FooterLink = ({item}) => {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
};

function FooterMenu({menu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
