import {useMemo, useState} from 'react';
import {Menu} from '@headlessui/react';
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from '@remix-run/react';
import {useDebounce} from 'react-use';
import {Disclosure} from '@headlessui/react';

import {
  Heading,
  IconFilters,
  IconCaret,
  IconXMark,
  Text,
  IconShortby,
  IconGrid,
  IconList,
} from '~/components';

export function SortFilter({
  filters,
  appliedFilters = [],
  children,
  collections = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between w-full hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={
            'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5'
          }
        >
          <IconFilters />
        </button>
      </div>
      <div className="flex flex-col flex-wrap lg:flex-row gap-[45px]">
        <div
          className={`transition-all duration-200 w-full lg:w-[30%] ${isOpen ? '' : ''}`}
        >
          <FiltersDrawer
            collections={collections}
            filters={filters}
            appliedFilters={appliedFilters}
          />
        </div>
        <div className="w-full lg:flex-1">
          <SortMenu />
          {children}
        </div>
      </div>
    </>
  );
}

export function FiltersDrawer({
  filters = [],
  appliedFilters = [],
  collections = [],
}) {
  const [params] = useSearchParams();
  const location = useLocation();

  const filterMarkup = (filter, option) => {
    switch (filter.type) {
      case 'PRICE_RANGE':
        const min =
          params.has('minPrice') && !isNaN(Number(params.get('minPrice')))
            ? Number(params.get('minPrice'))
            : undefined;

        const max =
          params.has('maxPrice') && !isNaN(Number(params.get('maxPrice')))
            ? Number(params.get('maxPrice'))
            : undefined;

        return <PriceRangeFilter min={min} max={max} />;

      default:
        const to = getFilterLink(filter, option.input, params, location);
        return (
          <Link className="block" prefetch="intent" to={to}>
            {option.label}
          </Link>
        );
    }
  };

  const collectionsMarkup = collections.map((collection) => {
    return (
      <li key={collection.handle} className="pb-4">
        <Link
          to={`/collections/${collection.handle}`}
          className="block"
          key={collection.handle}
          prefetch="intent"
        >
          {collection.title}
        </Link>
      </li>
    );
  });

  return (
    <>
      <nav className="filter-list-wrap bg-[#E7EFFF] rounded-[30px] overflow-hidden">
        <Heading
          as="h4"
          size="lead"
          className="text-[#1C5F7B] text-[28px] font-bold bg-[#CCDDF1] leading-none px-[20px] lg:px-[30px] 2xl:px-[48px] py-[20px] 2xl:py-[25px]"
        >
          Kategorien
        </Heading>
        <div className="px-[48px] py-[27px] hidden">
          {appliedFilters.length > 0 ? (
            <div className="">
              <AppliedFilters filters={appliedFilters} />
            </div>
          ) : null}
        </div>
        <div className="px-[20px] lg:px-[30px] 2xl:px-[48px] py-[20px] 2xl:py-[25px] flex flex-col xl:gap-y-[10px]">
          {filters.map(
            (filter) =>
              filter.values.length > 1 && (
                <>
                  <Disclosure as="div" key={filter.id} className="w-full">
                    {({open}) => (
                      <>
                        <Disclosure.Button className="flex justify-between items-center w-full text-[20px] text-[#292929] font-medium outline-none">
                          <Text size="lead">{filter.label}</Text>
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Disclosure.Button>
                        <Disclosure.Panel key={filter.id}>
                          <ul
                            key={filter.id}
                            className="py-[18px] flex flex-col gap-y-[18px] filter-sub-items"
                          >
                            {filter.values?.map((option) => {
                              return (
                                <li
                                  key={option.id}
                                  className="text-[16px] text-[#292929] font-normal hover:text-[#0A627E] hover:font-bold"
                                >
                                  {filterMarkup(filter, option)}
                                </li>
                              );
                            })}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" key={filter.id} className="w-full">
                    {({open}) => (
                      <>
                        <Disclosure.Button className="flex justify-between items-center w-full text-[20px] text-[#292929] font-medium outline-none">
                          <Text size="lead">{filter.label}</Text>
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Disclosure.Button>
                        <Disclosure.Panel key={filter.id}>
                          <ul
                            key={filter.id}
                            className="py-[18px] flex flex-col gap-y-[18px]"
                          >
                            {filter.values?.map((option) => {
                              return (
                                <li
                                  key={option.id}
                                  className="text-[16px] text-[#292929] font-normal hover:text-[#0A627E] hover:font-bold"
                                >
                                  {filterMarkup(filter, option)}
                                </li>
                              );
                            })}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </>
              ),
          )}
        </div>
      </nav>
    </>
  );
}

function AppliedFilters({filters = []}) {
  const [params] = useSearchParams();
  const location = useLocation();
  return (
    <>
      <Heading as="h4" size="lead" className="pb-4">
        Applied filters
      </Heading>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          return (
            <Link
              to={getAppliedFilterLink(filter, params, location)}
              className="flex px-[15px] py-[10px] border-[1px] border-[#292929] rounded-full gap"
              key={`${filter.label}-${filter.urlParam}`}
            >
              <span className="flex-grow">{filter.label}</span>
              <span>
                <IconXMark />
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function getAppliedFilterLink(filter, params, location) {
  const paramsClone = new URLSearchParams(params);
  if (filter.urlParam.key === 'variantOption') {
    const variantOptions = paramsClone.getAll('variantOption');
    const filteredVariantOptions = variantOptions.filter(
      (options) => !options.includes(filter.urlParam.value),
    );
    paramsClone.delete(filter.urlParam.key);
    for (const filteredVariantOption of filteredVariantOptions) {
      paramsClone.append(filter.urlParam.key, filteredVariantOption);
    }
  } else {
    paramsClone.delete(filter.urlParam.key);
  }
  return `${location.pathname}?${paramsClone.toString()}`;
}

function getSortLink(sort, params, location) {
  params.set('sort', sort);
  return `${location.pathname}?${params.toString()}`;
}

function getFilterLink(filter, rawInput, params, location) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(filter.type, rawInput, paramsClone);
  return `${location.pathname}?${newParams.toString()}`;
}

const PRICE_RANGE_FILTER_DEBOUNCE = 500;

function PriceRangeFilter({max, min}) {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(min ? String(min) : '');
  const [maxPrice, setMaxPrice] = useState(max ? String(max) : '');

  useDebounce(
    () => {
      if (
        (minPrice === '' || minPrice === String(min)) &&
        (maxPrice === '' || maxPrice === String(max))
      )
        return;

      const price = {};
      if (minPrice !== '') price.min = minPrice;
      if (maxPrice !== '') price.max = maxPrice;

      const newParams = filterInputToParams('PRICE_RANGE', {price}, params);
      navigate(`${location.pathname}?${newParams.toString()}`);
    },
    PRICE_RANGE_FILTER_DEBOUNCE,
    [minPrice, maxPrice],
  );

  const onChangeMax = (event) => {
    const newMaxPrice = event.target.value;
    setMaxPrice(newMaxPrice);
  };

  const onChangeMin = (event) => {
    const newMinPrice = event.target.value;
    setMinPrice(newMinPrice);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-4">
        <span>from</span>
        <input
          name="maxPrice"
          className="text-black"
          type="text"
          defaultValue={min}
          placeholder={'$'}
          onChange={onChangeMin}
        />
      </label>
      <label>
        <span>to</span>
        <input
          name="minPrice"
          className="text-black"
          type="number"
          defaultValue={max}
          placeholder={'$'}
          onChange={onChangeMax}
        />
      </label>
    </div>
  );
}

function filterInputToParams(type, rawInput, params) {
  const input = typeof rawInput === 'string' ? JSON.parse(rawInput) : rawInput;
  switch (type) {
    case 'PRICE_RANGE':
      if (input.price.min) params.set('minPrice', input.price.min);
      if (input.price.max) params.set('maxPrice', input.price.max);
      break;
    case 'LIST':
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === 'string') {
          params.set(key, value);
        } else if (typeof value === 'boolean') {
          params.set(key, value.toString());
        } else {
          const {name, value: val} = value;
          const allVariants = params.getAll(`variantOption`);
          const newVariant = `${name}:${val}`;
          if (!allVariants.includes(newVariant)) {
            params.append('variantOption', newVariant);
          }
        }
      });
      break;
  }

  return params;
}

export default function SortMenu() {
  const items = [
    {label: 'Featured', key: 'featured'},
    {
      label: 'Price: Low - High',
      key: 'price-low-high',
    },
    {
      label: 'Price: High - Low',
      key: 'price-high-low',
    },
    {
      label: 'Best Selling',
      key: 'best-selling',
    },
    {
      label: 'Newest',
      key: 'newest',
    },
  ];
  const [params] = useSearchParams();
  const location = useLocation();
  const activeItem = items.find((item) => item.key === params.get('sort'));

  return (
    <>
      <div className="collection-shrt-desc mb-[42px]">
        <div className="col-inner p-[30px] bg-white rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
          <div className="img-wrap mb-[10px] max-w-[148px] text-[14px] text-[#292929]">
            <img
              className="block w-full h-auto"
              src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/layer1.png?v=1685017639"
              alt=""
            />
          </div>
          <div className="desc">
            <p>
              Die Marke Pampers wird bei vielen Menschen synonym zum Begriff
              Windeln verwendet – so populär ist das Produkt. Doch welche
              Windeln von Pampers sind die richtigen für Ihr Baby? Bei
              windelshop.ch geben wir Ihnen nicht nur die richtigen Tipps für
              eine perfekte Wahl der passenden Windeln, sondern haben auch Ihr
              Wunschprodukt stets vorrätig.
            </p>
          </div>
        </div>
      </div>
      <div className="top-filter-wrap">
        <div className="filter-inner flex flex-col xl:flex-row flex-wrap gap-[25px]">
          <div className="col-left gap-[25px] items-center flex">
            <div className="pro-view-filter flex gap-[3px]">
              <div className="grid-filter w-[35px] h-[35px] p-[10px] bg-[#0A627E] border-[1px] border-[#0A627E] text-white cursor-pointer">
                <IconGrid className={'w-full h-full object-contain'} />
              </div>
              <div className="list-filter w-[35px] h-[35px] p-[10px] bg-white border-[1px] border-[#CED4DA] text-[#333333] cursor-pointer">
                <IconList className={'w-full h-full object-contain'} />
              </div>
            </div>
            <div className="product-comparison-number">
              <div className='text-[#666666] text-[14px] font-["Open_Sans"] font-bold flex gap-[3px]'>
                <span>Produktvergleich</span>
                <span>(0)</span>
              </div>
            </div>
          </div>
          <div className="col-right flex-[1.5] flex gap-y-[15px] gap-x-[25px] items-center justify-start xl:justify-end flex-wrap ">
            <Menu as="div" className="relative z-[40] w-fit">
              <Menu.Button className="flex items-center">
                <span className="flex items-center">
                  <span className="text-[#666666] text-[14px] font-['Open_Sans'] font-bold pr-[7px]">
                    Sortieren nach
                  </span>
                  <span className='px-[13px] py-[7px] bg-white border-[1px] border-[#E7EFFF] min-w-[187px] text-[14px] font-semibold text-[#495057] font-["Open_Sans"] flex justify-between gap-[10px] items-center'>
                    {(activeItem || items[0]).label}
                    <IconShortby />
                  </span>
                </span>
              </Menu.Button>
              <Menu.Items
                as="nav"
                className="absolute right-0 flex flex-col p-4 text-right rounded-sm bg-contrast"
              >
                {items.map((item) => (
                  <Menu.Item key={item.label}>
                    {() => (
                      <Link
                        className={`block text-sm pb-2 px-3 ${
                          activeItem?.key === item.key
                            ? 'font-bold'
                            : 'font-normal'
                        }`}
                        to={getSortLink(item.key, params, location)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
            <Menu as="div" className="relative z-[40] w-fit">
              <Menu.Button className="flex items-center">
                <span className="flex items-center">
                  <span className="text-[#666666] text-[14px] font-bold pr-[7px]">
                    Anzeige
                  </span>
                  <span className='px-[13px] py-[7px] bg-white border-[1px] border-[#E7EFFF] min-w-[65px] text-[14px] font-semibold text-[#495057] font-["Open_Sans"] flex justify-between gap-[10px] items-center'>
                    50
                    <IconShortby />
                  </span>
                </span>
              </Menu.Button>
              <Menu.Items
                as="nav"
                className="absolute right-0 flex flex-col p-4 text-right rounded-sm bg-contrast"
              >
                <Menu.Item>
                  <>
                    <a href="#" className="block text-sm pb-2 px-3">
                      80
                    </a>
                    <a href="#" className="block text-sm pb-2 px-3">
                      100
                    </a>
                    <a href="#" className="block text-sm pb-2 px-3">
                      120
                    </a>
                    <a href="#" className="block text-sm pb-2 px-3">
                      140
                    </a>
                    <a href="#" className="block text-sm pb-2 px-3">
                      160
                    </a>
                  </>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
