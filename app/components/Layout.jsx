import {useParams, Form, Await, useMatches} from '@remix-run/react';
import {useWindowScroll} from 'react-use';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {Suspense, useEffect, useMemo, useState, useRef} from 'react';
import {Fragment} from 'react';

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
} from '~/components';
import {useIsHomePath, toHTML} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import {Helmet} from 'react-helmet';
import {COOKIEBOT_KEY, AICO_API_URL, AICO_API_TOKEN} from '~/lib/const';

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

  useEffect(() => {
    //loadBrandData();
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
        toBar={layout?.hederTopBar}
        
      />
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      <Footer menu={layout?.footerMenu} />
    </>
  );
}

function Header({title, menu, toBar}) {
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
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <TopbarHeader toBar={toBar} />
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
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

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <span key={item.id} className="block">
          <Link
            to={item.to}
            target={item.target}
            onClick={onClose}
            className={({isActive}) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            <Text as="span" size="copy">
              {item.title}
            </Text>
          </Link>
        </span>
      ))}
    </nav>
  );
}

function MobileHeader({title, isHome, openCart, openMenu}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
          : 'bg-contrast/80 text-primary'
      } flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        <Form
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
        </Form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading
          className="font-bold text-center leading-none"
          as={isHome ? 'h1' : 'h2'}
        >
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function TopbarHeader({toBar}) {
 
  return (
    <div className="top-bar-sec bg-[#CCDDF1] py-[10px]">
      <div className="container !max-w-[1420px]">
        <div className="top-bar-inner">
          <ul className="topbar-list flex justify-between flex-wrap gap-[15px]">
            <li className="flex gap-[5px] items-center">
              <span className="icon w-[20px] h-[20px] relative overflow-hidden">
                <img
                  className="w-full h-full object-contain inset-0 absolute"
                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/GRATIS_LIEFERUNG_ab.svg?v=1685422519"
                  alt=""
                />
              </span>
              <span className="name uppercase font-medium text-[11px] tracking-[0.5px] xl:text-[12px] text-black"
                 dangerouslySetInnerHTML={{__html: toHTML(toBar?.section_1?.value)}}
              >
              </span>
            </li>
            <li className="flex gap-[5px] items-center">
              <span className="icon w-[20px] h-[20px] relative overflow-hidden">
                <img
                  className="w-full h-full object-contain inset-0 absolute"
                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Privatkunden-Paketversand.svg?v=1685422519"
                  alt=""
                />
              </span>
              <span className="name uppercase font-medium text-[11px] tracking-[0.5px] xl:text-[12px] text-black"
                dangerouslySetInnerHTML={{__html: toHTML(toBar?.section_2?.value)}}
              >
              </span>
            </li>
            <li className="flex gap-[5px] items-center">
              <span className="icon w-[20px] h-[20px] relative overflow-hidden">
                <img
                  className="w-full h-full object-contain inset-0 absolute"
                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Lieferung_bis_Lagerplatz.svg?v=1685422519"
                  alt=""
                />
              </span>
              <span className="name uppercase font-medium text-[11px] tracking-[0.5px] xl:text-[12px] text-black"
                dangerouslySetInnerHTML={{__html: toHTML(toBar?.section_3?.value)}}
              >
              </span>
            </li>
            <li className="flex gap-[5px] items-center">
              <span className="icon w-[20px] h-[20px] relative overflow-hidden">
                <img
                  className="w-full h-full object-contain inset-0 absolute"
                  src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Rufen_Sie_uns_an.svg?v=1685422519"
                  alt=""
                />
              </span>
              <span className="name uppercase font-medium text-[11px] tracking-[0.5px] xl:text-[12px] text-black"
                dangerouslySetInnerHTML={{__html: toHTML(toBar?.section_4?.value)}}
              >
              </span>
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

function DesktopHeader({isHome, menu, openCart, title}) {
  const params = useParams();
  const {y} = useWindowScroll();

  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleBodyClick = () => {
      setSearchOpen(false);
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

  return (
    <header
      role="banner"
      className={`${isHome ? '' : ''} ${
        !isHome && y > 50 && ''
      } relative top-0 bg-[#E7EFFF] py-[20px]  rounded-[0_0_20px_20px] hidden lg:block`}
    >
      <div className="container">
        <div className="header-row gap-[33px] flex flex-col">
          <div className="top flex gap-[15px]">
            <div className="lang flex-1">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex gap-[6px] items-center">
                    <span className="flag w-[16px] h-[16px] overflow-hidden relative">
                      <img
                        className="inset-0 w-full h-full object-contain"
                        src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/de_png.svg?v=1685425346"
                        alt=""
                      />
                    </span>
                    <span className="name text-[16px] text-black leading-[1.1] font-medium">
                      Deutsch
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
                          <a
                            href="#"
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
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({active}) => (
                          <a
                            href="#"
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
                                src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/de_png.svg?v=1685425346"
                                alt=""
                              />
                            </span>
                            <span className="name text-[16px] text-black leading-[1.1] font-medium">
                              Deutsch
                            </span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({active}) => (
                          <a
                            href="#"
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
                                src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/de_png.svg?v=1685425346"
                                alt=""
                              />
                            </span>
                            <span className="name text-[16px] text-black leading-[1.1] font-medium">
                              Deutsch
                            </span>
                          </a>
                        )}
                      </Menu.Item>
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({active}) => (
                            <button
                              type="submit"
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
                      </form>
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
                    className="text-black text-[12px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    Mein Konto
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black text-[12px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    Wunschliste <span>(0)</span>
                  </a>
                </li>
                <li>
                  <Link
                    to={'/cart'}
                    className="text-black text-[12px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    Bezahlen
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/account/register'}
                    className="text-black text-[12px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    Anmelden
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
                className={`w-full h-[50px] rounded-[100px] !bg-[#CCDDF1] text-black text-[12px] font-medium leading-none placeholder:!text-black placeholder:!opacity-100 focus:!border-none !pl-[50px] !pr-[20px] focus:!ring-0 focus:!border-[#5391d9] ${
                  isSearchOpen ? '!text-left' : '!text-center'
                }`}
                type="search"
                variant="minisearch"
                placeholder="Suche"
                name="q"
                onClick={handleSearchClick}
              />
              <button
                type="submit"
                className={`${
                  isSearchOpen ? 'left-[30px]' : 'left-[45%]'
                } absolute flex items-center justify-center w-8 h-8 focus:ring-primary/5 top-1/2  -translate-x-1/2 -translate-y-1/2`}
              >
                <IconSearch2 />
              </button>
            </Form>
            <CartCount isHome={isHome} openCart={openCart} />
          </div>
          <div className="bottom">
            <nav className="flex gap-[5px] relative main-navbar">
              {/* Top level menu items */}
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[12px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Home
                </a>
              </div>
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[12px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Windeln & Feuchttücher
                </a>
                <div className="mega-menu absolute bg-[#CCDDF1] rounded-[20px] z-[99]">
                  <div className="mega-menu-inner container">
                    <div className="mega-menu-lists flex flex-wrap py-[70px] gap-y-[30px] -mx-[15px]">
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] px-[15px]">
                        <div className="mega-menu-list-inner bg-white p-[50px] rounded-[30px] h-full">
                          <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                          <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[12px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Damenhygiene & Inkontinenz
                </a>
              </div>
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[12px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Waschmittel & Weichspüler
                </a>
              </div>
              <div className="menu-item flex-auto">
                <a
                  href="#"
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[12px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Pflege & Hygiene
                </a>
                <div className="mega-menu absolute bg-[#CCDDF1] rounded-[20px] z-[99]">
                  <div className="mega-menu-inner container">
                    <div className="mega-menu-lists flex flex-wrap py-[70px] gap-y-[70px] -mx-[15px]">
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
                          Hautpflege
                        </div>
                        <ul>
                          <li>
                            <a href="#">Wundschutzcreme</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
                          Untersuchungshandschuhe
                        </div>
                        <ul>
                          <li>
                            <a href="#">Nitril-Handschuhe</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu-list sm:w-[50%] lg:w-[33.33%] xl:w-[25%] px-[15px]">
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                        <div className="sub-menu-title text-[14px] leading-[1.1] font-bold mb-[12px] text-black">
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
                  className="bg-[#1C5F7B] hover:bg-[#CCDDF1] hover:text-black rounded-[10px] text-[12px] text-white font-bold leading-[1.1] h-[47px] flex items-center justify-center text-center p-[15px] transition-all duration-500 w-full"
                >
                  Abos & Gutscheine
                </a>
              </div>
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
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({openCart, dark, count}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        {/* <IconBag /> */}
        <div
          className={`${
            dark ? '' : ''
          } text-black text-[12px] leading-none font-medium  flex items-center justify-center text-center`}
        >
          <span>{count || 0}</span>
          <span>&nbsp;Artikel -&nbsp;</span>
          <span>CHF 0.00</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center bg-[#CCDDF1] rounded-[100px] max-w-[215px] p-[15px] h-[50px] flex-1 transition-all duration-500 hover:opacity-70"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}) {
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
                    <p>
                      Ihr Partner für Babypflege, Damenhygiene und Textilpflege
                      – im Privaten und Geschäftlichen.
                    </p>
                  </div>
                  <div className="subscribe-form-footer mt-[33px]">
                    <form action="" className="">
                      <div className="form-group flex gap-[10px]">
                        <div className="form-control flex-1">
                          <input
                            type="email"
                            placeholder="Newsletter abonnieren"
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
                            <p>Unsere Bewertungen auf Google!</p>
                          </div>
                          <div className="rating-start flex gap-[5px] items-center">
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
              {
                menu?.items?.map((item,index) => {
                    return (
                      <div className="footer-col px-[15px] w-[50%] md:w-[25%] xl:w-[16.33%]" key={index}>
                        <div className="col-inner">
                          <div className="nav">
                            <h4 className="title text-[14px] text-white font-bold mb-[15px] uppercase">
                               {item.title}
                            </h4>
                            <ul className="nav-list flex flex-col gap-[15px]">
                               {item.items.map((subItem, subIndex) => (
                                  <li className="text-[12px] text-white font-normal" key={subIndex}>
                                    <Link to={item.to} target={item.target} className="hover:opacity-70 transition-all duration-500">
                                      {subItem.title}
                                    </Link>
                                  </li>
                               ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                })
              }
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
                            Homerunner GmbH, Schulstrasse 13a, CH-9553
                            Bettwiesen
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
                          <span className="text flex-1">052 720 58 58</span>
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
                          <span className="text flex-1">E-Mail senden</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="social-links flex flex-wrap gap-[10px] mt-[30px]">
                    <a href="#" className="w-[36px] text-[#E7EFFF] hover:text-white transition-all duration-500">
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
