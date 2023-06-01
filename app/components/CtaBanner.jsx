export function CtaBanner({className}) {
  return (
    <section className={`${className} cta-banner-section py-[50px]`}>
      <div className="container">
        <div className="img-wrap">
          <img className="max-w-full w-full h-auto"
            src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/swilet-banner-de_jpg.png?v=1685617471"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
