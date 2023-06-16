import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';


export function CtaBanner({banner}) {
  return (
    <section className={`cta-banner-section py-[20px] md:py-[30px] xl:py-[40px] 2xl:py-[50px]`}>
      <div className="container">
        <div className="img-wrap">
          <Image 
             className="max-w-full w-full h-auto"
             data={banner?.reference?.image}
             alt={banner?.reference?.alt}
          />
        </div>
      </div>
    </section>
  );
}
