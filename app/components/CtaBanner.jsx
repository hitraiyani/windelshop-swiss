import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';

export function CtaBanner({banner}) {
  return (
    <section className={`cta-banner-section py-[15px] md:py-[30px]`}>
      <div className="container">
        <div className="img-wrap">
          <a  className="max-w-full w-full h-auto block" href="/collections/windeln-feuchttucher">
            <Image
              className="max-w-full w-full h-auto"
              data={banner?.reference?.image}
              alt={banner?.reference?.alt}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
