import {ProductCard, Section} from '~/components';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
}) {
  return (
    <Section padding="y" {...props} className={'!p-0'}>
      <h2 className='whitespace-pre-wrap max-w-prose text-[#1C5F7B] text-[24px] xl:text-[28px] font-bold leading-none'>{title}</h2>
      <div className="product-grid grid grid-cols-2  md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-x-[15px] lg:gap-x-[30px] gap-y-[20px] lg:gap-y-[30px] xl:gap-y-[60px]">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            className="snap-start w-80"
          />
        ))}
      </div>
    </Section>
  );
}
