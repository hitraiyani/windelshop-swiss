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
} from '~/components';
import {useIsHomePath} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import {Helmet} from 'react-helmet';
import {COOKIEBOT_KEY} from '~/lib/const';

export function Layout({children, layout, locale}) {
  const [isCookieAccepted, setisCookieAccepted] = useState(false);

  useEffect(() => {
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
      />
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      <Footer menu={layout?.footerMenu} />
    </>
  );
}

function Header({title, menu}) {
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
      <TopbarHeader />
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

function TopbarHeader() {
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
              <span className="name uppercase font-medium tracking-[0.5px] text-[12px] text-black">
                GRATIS LIEFERUNG ab <strong>CHF 99.–</strong>
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
              <span className="name uppercase font-medium tracking-[0.5px] text-[12px] text-black">
                Privatkunden: <strong>Paketversand</strong>
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
              <span className="name uppercase font-medium tracking-[0.5px] text-[12px] text-black">
                KMU: <strong>Lieferung bis Lagerplatz</strong>
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
              <span className="name uppercase font-medium tracking-[0.5px] text-[12px] text-black">
                Rufen Sie uns an <strong>052 720 58 58</strong>
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
      } relative top-0 bg-[#E7EFFF] py-[20px] z-[10px]`}
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
                  <a
                    href="#"
                    className="text-black text-[12px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    Mein Konto
                  </a>
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
                  <a
                    href="#"
                    className="text-black text-[12px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    Bezahlen
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black text-[12px] leading-none font-medium hover:opacity-70 transition-all duration-500"
                  >
                    Anmelden
                  </a>
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
                src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/windelshop-2022-de_png.svg?v=1685423505"
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
                <div className="mega-menu absolute bg-[#CCDDF1] rounded-[20px] z-[11]">
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
                              <a href="#">Sangenic Tommee Tippee Windelentsorgung</a>
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
                          <ul className='!grid grid-cols-3 !gap-y-[60px] !gap-x-[20px] brands-logos'>
                            <li>
                              <a href="#">
                                <img src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/g114768.png?v=1685447152" alt="" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/pingo_logo_2.png?v=1685447152" alt="" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/triodoshippo_heroImageDesktop_1.png?v=1685447152" alt="" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Libero-Logo_1.png?v=1685447152" alt="" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Vector_4a305661-3e74-4ac9-87d5-76f98fecf6f0.png?v=1685447152" alt="" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/huggies-brand-logo-vector_1.png?v=1685447152" alt="" />
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
                <div className="mega-menu absolute bg-[#CCDDF1] rounded-[20px] z-[11]">
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
      className={`grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
        bg-primary dark:bg-contrast dark:text-primary text-contrast overflow-hidden`}
    >
      <FooterMenu menu={menu} />
      <CountrySelector />
      <div
        className={`self-end pt-8 opacity-50 md:col-span-2 lg:col-span-${itemsCount}`}
      >
        &copy; {new Date().getFullYear()} / Shopify, Inc. Hydrogen is an MIT
        Licensed Open Source project.
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
