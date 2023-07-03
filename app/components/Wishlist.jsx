import React, {useContext} from 'react'
import clsx from 'clsx';
import {useRef, useEffect} from 'react';
import {useScroll} from 'react-use';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import {
  Button,
  Heading,
  IconRemove,
  Text,
  Link,
  FeaturedProducts,
  AddToCartButton,
  CompareAtPrice,
  CartLoading,
  IconCart
} from '~/components';
import {isDiscounted, translate, productTranslate} from '~/lib/utils';
import {useFetcher} from '@remix-run/react';
import {WishlistContext } from '~/store/WishlistContext';

export function Wishlist({layout, onClose,locale}) {
   
  const {load, data, state} = useFetcher();

  const {wishlistItems } = useContext(WishlistContext);

  useEffect(() => {
    load(
      `/api/userWishListProducts?products=${JSON.stringify(wishlistItems)}`,
    );
  }, [wishlistItems]);

  return (
    <>
      {!data ? (
        'Loading...'
      ) : (
        <CartDetails
          onClose={onClose}
          products={data?.products}
          layout={'page'}
          locale={locale}
        />
      )}
    </>
  );
}

export function CartDetails({layout, products, onClose,locale}) {

    if(!products) return <></>;

    const {removeFromWishlist} = useContext(WishlistContext);
   
     const container = {
       drawer: 'grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]',
       page: 'w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
     };
   
     const scrollRef = useRef(null);
     const {y} = useScroll(scrollRef);
   
     const className = clsx([
       y > 0 ? 'border-t' : '',
       layout === 'page'
         ? 'flex-grow md:translate-y-4'
         : 'pb-6 sm-max:pt-2 overflow-auto transition',
     ]);
   
     const AddToCart = () =>  {
       setTimeout(() => {
           location.reload();
       },200);
     }
   
     return (
       <>
        
       
           {products.length == 0 ? <CartEmpty hidden={false} onClose={onClose} layout={layout} />: (
               <div className={container[layout]}>
               <section
                   ref={scrollRef}
                   aria-labelledby="cart-contents"
                   className={className}
               >
                   <ul className="grid gap-6 md:gap-10">
                       {products?.map((product) => {
     
                           const cardProduct = product?.variants ? product : getProductPlaceholder();
                           if (!cardProduct?.variants?.nodes?.length) return null;
                         
                           const firstVariant = flattenConnection(cardProduct.variants)[0];
                         
                           if (!firstVariant) return null;
                           const {image, price, compareAtPrice} = firstVariant;
     
                           const selectedVariant = product.selectedVariant ?? firstVariant;
                           const isOutOfStock = !selectedVariant?.availableForSale;
     
                             return (
                               <li key={product.id} className="flex gap-4">
                                 <div className="flex-shrink">
                                   {image && (
                                     <Image
                                       width={220}
                                       height={220}
                                       data={image}
                                       className="object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28"
                                       alt={product.title}
                                     />
                                   )}
                                 </div>

                                 <div className="flex justify-between flex-grow">
                                   <div className="grid gap-2">
                                     <Heading as="h3" size="copy">
                                       {product?.handle ? (
                                         <Link
                                           to={`/products/${product.handle}`}
                                         >
                                           {productTranslate(product,'title',locale) || ''}
                                         </Link>
                                       ) : (
                                         <Text>{productTranslate(product,'title',locale) || ''}</Text>
                                       )}
                                     </Heading>
                                     <div className="grid items-stretch gap-4">
                                       {isOutOfStock ? (
                                         <Text>{translate("sold_out",locale)}</Text>
                                       ) : (
                                         <AddToCartButton
                                           lines={[
                                             {
                                               merchandiseId:
                                                 selectedVariant.id,
                                               quantity: 1,
                                             },
                                           ]}
                                           className='bg-[#0A627E] rounded-[100px] w-full py-[15px] px-[15px] text-white text-center uppercase text-[15px] leading-none font-["Open_Sans"] font-bold flex gap-[5px] min-h-[52px] transition-all duration-500 hover:opacity-70 items-center justify-center'
                                           data-test="add-to-cart"
                                         >
                                           <IconCart
                                             className={'w-[15px] h-[14px]'}
                                           />
                                           + {translate("add_to_cart",locale)}
                                         </AddToCartButton>
                                       )}
                                     </div>
                                     <div className="flex items-center gap-2">
                                       <button
                                         onClick={() => {
                                           removeFromWishlist(product.id);
                                         }}
                                         className="flex items-center justify-center w-10 h-10 border rounded"
                                         type="submit"
                                       >
                                         <span className="sr-only">Remove</span>
                                         <IconRemove aria-hidden="true" />
                                       </button>
                                     </div>
                                   </div>
                                   <div className="flex gap-4">
                                     <Text className="flex gap-3 text-xs md:text-base lg:text-lg font-bold text-black">
                                       <Money
                                         withoutTrailingZeros
                                         data={price}
                                       />
                                       {isDiscounted(price, compareAtPrice) && (
                                         <CompareAtPrice
                                           className={
                                             'text-black line-through font-medium'
                                           }
                                           data={compareAtPrice}
                                         />
                                       )}
                                     </Text>
                                   </div>
                                   {/* <Text>
                                             <CartLinePrice line={line} as="span" />
                                         </Text> */}
                                 </div>
                               </li>
                             );
                       })}
                   </ul>
               </section>
         </div>
           )}
       </>
       
     );
   }
   
   
   
   export function CartEmpty({hidden = false, layout = 'drawer', onClose}) {
     const scrollRef = useRef(null);
     const {y} = useScroll(scrollRef);
   
     
     const container = {
       drawer: clsx([
         'content-start gap-4 transition md:gap-12 h-screen-no-nav',
         y > 0 ? 'border-t' : '',
       ]),
       page: clsx([
         hidden ? '' : 'grid',
         `pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
       ]),
     };
   
     return (
       <div ref={scrollRef} className={container[layout]} hidden={hidden}>
         <section className="grid gap-6">
           <Text format>
            Anscheinend haben Sie nichts auf Ihrer Wunschliste.
           </Text>
           <div>
             <Button onClick={onClose}>Continue shopping</Button>
           </div>
         </section>
         {/* <section className="grid gap-8 pt-16">
           <FeaturedProducts
             count={4}
             heading="Shop Best Sellers"
             layout={layout}
             onClose={onClose}
             sortKey="BEST_SELLING"
           />
         </section> */}
       </div>
     );
   }
