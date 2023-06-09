import {Link} from '~/components';

export function BestsellerCategories({data, className}) {
  
  const collectionImageOverride = data?.collection_images_override?.value ? JSON.parse(data?.collection_images_override?.value) : {};
  return (
    <section className={`${className} bestseller-categories-section py-[50px]`}>
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-black text-[24px] font-bold text-left">
            {data?.title?.value}
          </h2>
        </div>
        <div className="bestseller-item-lists">
          <div className="bestseller-items grid grid-cols-3 gap-[30px]">
            {data?.collections?.references?.edges?.map((item, index) => {
              return (
                <div className="bestseller-item" key={index}>
                  <div className="bestseller-item-inner">
                    <Link to={`/collections/${item.node.handle}`}>
                      <div className="img-wrap relative overflow-hidden shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[20px] pb-[100%] bg-[#D9D9D9]">
                        <img
                          className="absolute inset-0 object-cover w-full h-full transition-all duration-500"
                          src={collectionImageOverride[item.node.handle] ? collectionImageOverride[item.node.handle] : item?.node?.products?.nodes[0]?.variants?.nodes[0]?.image.url}
                          alt=""
                        />
                      </div>
                      <div className="title mt-[27px]">
                        <h4 className="text-[20px] text-black text-center font-bold">
                          {item.node.title}
                        </h4>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
