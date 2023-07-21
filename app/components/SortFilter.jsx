import {useContext, useEffect, useMemo, useState} from 'react';
import {Menu} from '@headlessui/react';
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
  useLoaderData,
  NavLink,
} from '@remix-run/react';
import {useDebounce} from 'react-use';
import {Disclosure} from '@headlessui/react';
import { Range } from 'react-range';

import {
  Heading,
  IconFilters,
  IconCaret,
  IconXMark,
  Text,
  IconShortby,
  IconGrid,
  IconList,
  IconArrowRight2,
} from '~/components';
import {Image} from '@shopify/hydrogen';
import {getMenuHandle, translate} from '~/lib/utils';
import {WishlistContext} from '~/store/WishlistContext';

export function SortFilter({
  filters,
  appliedFilters = [],
  children,
  collections = [],
  isGrid,
  gridView,
  listView,
  menudata = [],
  collection,
  locale,
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
        {filters.length > 0 && (
        <div
          className={`transition-all duration-200 w-full lg:w-[300px] ${
            isOpen ? '' : ''
          }`}
        >
          <FiltersDrawer
            collections={collections}
            filters={filters}
            appliedFilters={appliedFilters}
            menudata={menudata}
            locale={locale}
          />
        </div>
        )}
        <div className="flex-1">
          <SortMenu
            gridView={gridView}
            listView={listView}
            isGrid={isGrid}
            collection={collection}
            locale={locale}
          />
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
  menudata = [],
  categoryname,
  locale,
}) {
  const [params] = useSearchParams();
  const location = useLocation();
  var categoryname = '';
  const [categoryName, setCategoryName] = useState('null');
  const [isOpen, setOpen] = useState(false);
  //useEffect(() => {

  // menudata.map(
  //   (filter) =>
  //     filter.category.subCategories.length > 1 &&
  //     //console.log(filter.category.subCategories);
  //     filter.category.subCategories.map((submenu) => {
  //       if (submenu.subCategory.subSubCategories.length > 0) {
  //         submenu.subCategory.subSubCategories.map((subsubMenu) => {
  //           if (
  //             location.pathname == '/collections/' + subsubMenu.subSubCategory.handle || location.pathname == '/fr/collections/' + subsubMenu.subSubCategory.handle
  //           ) {
  //             //categoryname = filter.category.handle;
  //              setCategoryName(filter.category.handle);
  //           }
  //         });
  //       }
  //     }),
  // );

  // },[location.pathname])

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
                      
            

        return <PriceRangeFilter min={min} max={max}  />;

      default:
        const to = getFilterLink(filter, option.input, params, location);
        console.log(filter)
        return (
          <Link className="block" prefetch="intent" to={to}>
            {option.label} 
            {filter.label == "Marke" && <>{ "("+option.count+")"}</>}
             
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
      
      <nav className="filter-list-wrap overflow-hidden">
        
        <Heading
          as="h4"
          size="lead"
          className="text-[#1C5F7B] text-[24px] xl:text-[28px] font-bold py-[27px] bg-[#CCDDF1] leading-none px-[30px] xl:px-[48px] hidden"
        >
          {/* {translate('category',locale)} */}
          Filter By
        </Heading>
        <div className="">
          {appliedFilters.length > 0 ? (
            <div className="mb-[30px]">
              <AppliedFilters filters={appliedFilters} />
            </div>
          ) : null}
        </div>
        {/* <div className="px-[30px] xl:px-[48px] py-[25px] flex flex-col gap-y-[10px]"> */}
        <div className="flex flex-col gap-[20px]">
          {/* {menudata?.map(
            (filter) =>
              filter.category.name !== 'Home' && (
                <div key={filter?.category?.handle}>
                  <Disclosure
                    as="div"
                    key={filter.category.handle+categoryName}
                    id={filter.category.handle}
                    className="w-full"
                    defaultOpen={
                      filter.category.handle == categoryName ? true : false
                    }
                    >
                    {({open}) => (
                      <>
                        <Disclosure.Button className="flex justify-between items-center w-full text-[20px] text-[#292929] font-medium outline-none text-left">
                          <Text size="lead" className={'flex-1'}>{translate(filter.category.name,locale)}</Text>
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Disclosure.Button>
                        <Disclosure.Panel key={filter.category.handle}>
                         
                          <ul
                            key={filter.category.handle}
                            className="py-[18px] flex flex-col gap-y-[18px] filter-sub-items"
                          >
                            {filter.category.subCategories?.map((submenu) =>
                              submenu.subCategory.subSubCategories?.map(
                                (subcategory) => (
                                  
                                  <li
                                    key={subcategory.subSubCategory.name}
                                    className="text-[16px] text-[#292929] font-normal hover:text-[#0A627E] hover:font-bold"
                                  >
                                    <NavLink
                                      className="block border-none"
                                      prefetch="intent"
                                      to={  getMenuHandle(subcategory.subSubCategory)}
                                    >
                                      {translate(subcategory.subSubCategory.name,locale)}
                                    </NavLink>
                                  </li>
                                ),
                              ),
                            )}
                            
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              ),
          )} */}
         
          {filters.map(
            (filter) =>
              filter.values.length >= 1 && (
                <Disclosure
                  as="div"
                  key={filter.id}
                  defaultOpen={true}
                  className="w-full border-[1px] border-[#1c5f7b] p-[15px] rounded-[5px]"
                >
                  {({open}) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full relative">
                        <Text className={'font-bold text-[18px]'}>{filter.label}</Text>
                        <IconArrowRight2
                          direction={open ? 'up' : 'down'}
                          className={`absolute right-0 top-0 transition-all duration-500 ${open ? '-rotate-90' : ' rotate-90'}`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel key={filter.id}>
                        <ul key={filter.id} className="py-[20px] pb-0 flex flex-col gap-[10px]">
                          {filter.values?.map((option) => {
                            return (
                              <li key={option.id} className="text-[16px] text-black">
                                {filterMarkup(filter, option)}
                              </li>
                            );
                          })}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
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
              className="flex px-[15px] py-[10px] border-[1px] border-[#292929] rounded-full gap items-center hover:border-[#1c5f7b] hover:text-[#1c5f7b] text-[16px] font-medium"
              key={`${filter.label}-${filter.urlParam}`}
            >
              <span className="flex-grow">{filter.label}</span>
              <span>
                <IconXMark className={'relative top-[-2px]'} />
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
  }
  
  else {
    paramsClone.delete(filter.urlParam.key);
  }
  return `${location.pathname}?${paramsClone.toString()}`;
}

function getSortLink(sort, params, location) {
  params.set('sort', sort);
  return `${location.pathname}?${params.toString()}`;
}

function getPaginationLink(sort, params, location) {
  params.set('pagination', sort);

  return `${location.pathname}?${params.toString()}`;
}

function getFilterLink(filter, rawInput, params, location) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(filter.type, rawInput, paramsClone);
  return `${location.pathname}?${newParams.toString()}`;
}

const PriceRangeSlider = ({ min, max, onChangeMin, onChangeMax }) => {
  const [values, setValues] = useState([min, max]);

  const handleChange = (values) => {
    setValues(values);
    onChangeMin(values[0]);
    onChangeMax(values[1]);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-wrap gap-[5px] items-center">
        <span className="block min-w-[50px]">from</span>
        <input
          name="maxPrice"
          className="text-black flex-1"
          type="text"
          value={values[0]} // Use value instead of defaultValue
          placeholder={'$'}
          onChange={(e) => handleChange([parseFloat(e.target.value), values[1]])}
        />
      </div>
      <div className="flex flex-wrap gap-[5px] items-center">
        <span className="block min-w-[50px]">to</span>
        <input
          name="minPrice"
          className="text-black flex-1"
          type="number"
          value={values[1]} // Use value instead of defaultValue
          placeholder={'$'}
          onChange={(e) => handleChange([values[0], parseFloat(e.target.value)])}
        />
      </div>
      {/* Range Slider */}
      <div className="mt-4" style={{ overflow: 'hidden' }}>
        <Range
          values={values}
          step={1}
          min={min}
          max={max}
          onChange={(values) => handleChange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                background: '#ccc',
                borderRadius: '4px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
          )}
        />
      </div>
      {/* Display Min and Max values */}
      <div className="flex justify-between mt-2">
        <span>{`Min: ${values[0]}`}</span>
        <span>{`Max: ${values[1]}`}</span>
      </div>
    </div>
  );
};

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
  const handleChangeMinPrice = (min) => {
    setMinPrice(min);
  };

  // Function to handle changes in max price
  const handleChangeMaxPrice = (max) => {
    setMaxPrice(max);
  };

  return (
    <>
    {/* <div className="flex flex-col">
      <label className="mb-4 flex flex-wrap gap-[5px] items-center">
        <span className='block min-w-[50px]'>from</span>
        <input
          name="maxPrice"
          className="text-black flex-1"
          type="text"
          defaultValue={min}
          placeholder={'$'}
          onChange={onChangeMin}
        />
      </label>
      <label className='flex flex-wrap gap-[5px] items-center'>
        <span className='block min-w-[50px]'>to</span>
        <input
          name="minPrice"
          className="text-black flex-1"
          type="number"
          defaultValue={max}
          placeholder={'$'}
          onChange={onChangeMax}
        />
      </label>
    </div> */}
    
    
    <PriceRangeSlider
        min={0} // Set the minimum price value
        max={10000} // Set the maximum price value to 10000
        onChangeMin={handleChangeMinPrice} // Pass the function to update min price
        onChangeMax={handleChangeMaxPrice} // Pass the function to update max price
      />
    </>
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

export default function SortMenu({
  gridView,
  listView,
  isGrid,
  collection,
  locale,
}) {
  const items = [
    {label: translate('specification', locale), key: 'featured'},
    {
      label: translate('price_low_high', locale),
      key: 'price-low-high',
    },
    {
      label: translate('price_high_low', locale),
      key: 'price-high-low',
    },
    {
      label: translate('best_selling', locale),
      key: 'best-selling',
    },
    {
      label: translate('newest', locale),
      key: 'newest',
    },
  ];

  const itemsPagination = [
    {label: '50', key: '50'},
    {
      label: '80',
      key: '80',
    },
    {
      label: '100',
      key: '100',
    },
    {
      label: '120',
      key: '120',
    },
    {
      label: '140',
      key: '140',
    },
  ];
  const [params] = useSearchParams();
  const location = useLocation();
  const activeItem = items.find((item) => item.key === params.get('sort'));
  const activePagination = itemsPagination.find(
    (item) => item.key === params.get('pagination'),
  );
  const {productCompareItems} = useContext(WishlistContext);

  return (
    <>
      {collection.description && (
        <div className="collection-shrt-desc mb-[42px]">
          <div className="col-inner p-[30px] bg-white rounded-[30px] shadow-[2px_4px_10px_rgba(0,0,0,0.15)]">
            <div className="img-wrap mb-[10px] max-w-[148px] text-[14px] text-[#292929]">
              {/* <img
              className="block w-full h-auto"
              src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/layer1.png?v=1685017639"
              alt=""
            /> */}
              {collection?.image && (
                <Image
                  className="block w-full h-auto"
                  src={collection.image.url}
                  width={collection.image.width}
                  height={collection.image.height}
                  alt={collection.image.altText}
                />
              )}
            </div>
            <div className="desc">{collection?.description}</div>
          </div>
        </div>
      )}

      <div className="top-filter-wrap mb-[30px]">
        <div className="filter-inner flex flex-col min-[992px]:flex-row flex-wrap gap-[25px]">
          <div className="col-left gap-[25px] items-center flex">
            <div className="pro-view-filter flex gap-[3px]">
              <div
                className={`grid-filter w-[35px] h-[35px] p-[10px] ${
                  isGrid == true
                    ? 'bg-[#0A627E] border-[1px] border-[#0A627E] text-white'
                    : 'bg-white border-[1px] border-[#CED4DA] text-[#333333]'
                }  cursor-pointer`}
                onClick={gridView}
              >
                <IconGrid className={'w-full h-full object-contain'} />
              </div>
              <div
                className={`list-filter w-[35px] h-[35px] p-[10px] ${
                  isGrid == false
                    ? 'bg-[#0A627E] border-[1px] border-[#0A627E] text-white'
                    : 'bg-white border-[1px] border-[#CED4DA] text-[#333333]'
                }  cursor-pointer`}
                onClick={listView}
              >
                <IconList className={'w-full h-full object-contain'} />
              </div>
            </div>
            <div className="product-comparison-number">
              <div className='text-[#666666] text-[14px] font-["Open_Sans"] font-bold flex gap-[3px]'>
                <Link to={`/product-compare/`}>
                  <span>{translate('product_compare', locale)}</span>
                </Link>
                <span>({productCompareItems?.length})</span>
              </div>
            </div>
          </div>
          <div className="col-right flex-1 flex-wrap flex lg:flex-nowrap lg:flex-row gap-[25px] items-center justify-start xl:justify-end">
            <Menu as="div" className="relative z-[40] w-fit">
              <Menu.Button className="flex items-center">
                <span className="flex items-center">
                  <span className="text-[#666666] text-[14px] font-['Open_Sans'] font-bold pr-[7px]">
                    {translate('sorting', locale)}
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
                    {translate('page', locale)}
                  </span>
                  <span className='px-[13px] py-[7px] bg-white border-[1px] border-[#E7EFFF] min-w-[65px] text-[14px] font-semibold text-[#495057] font-["Open_Sans"] flex justify-between gap-[10px] items-center'>
                    {(activePagination || itemsPagination[0]).label}
                    <IconShortby />
                  </span>
                </span>
              </Menu.Button>

              <Menu.Items
                as="nav"
                className="absolute right-0 flex flex-col p-4 text-right rounded-sm bg-contrast"
              >
                {itemsPagination.map((item) => (
                  <Menu.Item key={item.label}>
                    {() => (
                      <Link
                        className={`block text-sm pb-2 px-3 ${
                          activePagination?.key === item.key
                            ? 'font-bold'
                            : 'font-normal'
                        }`}
                        to={getPaginationLink(item.key, params, location)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                {/* <Menu.Item>
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
                </Menu.Item> */}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
