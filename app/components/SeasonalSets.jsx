import {
  Link
} from '~/components';

export function SeasonalSets({className, data}) {

  return (
    <section
      className={`${className} seasonalsets-categories-section bestseller-categories-section py-[20px] md:py-[30px] xl:py-[40px] 2xl:py-[50px]`}
    >
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-black text-[24px] font-bold text-left">
             {data?.title?.value}
          </h2>
        </div>
        <div className="bestseller-item-lists">
          <div className="bestseller-items grid grid-cols-3 gap-[30px]">
            <div className="bestseller-item">
              <div className="bestseller-item-inner">
                <Link to={data?.set_1_redirect?.value}>
                  <div className="img-wrap relative overflow-hidden shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[20px] pb-[100%] bg-[#D9D9D9]">
                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-all duration-500"
                      src={data?.set_1_image?.reference?.image?.url}
                      alt=""
                    />
                  </div>
                  <div className="title mt-[27px]">
                    <h4 className="text-[20px] text-black text-center font-bold">
                        {data?.set_1_title?.value}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
            <div className="bestseller-item">
              <div className="bestseller-item-inner">
                <Link to={data?.set_2_redirect?.value}>
                  <div className="img-wrap relative overflow-hidden shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[20px] pb-[100%] bg-[#D9D9D9]">
                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-all duration-500"
                      src={data?.set_2_image?.reference?.image?.url}
                      alt=""
                    />
                  </div>
                  <div className="title mt-[27px]">
                    <h4 className="text-[20px] text-black text-center font-bold">
                      {data?.set_2_title?.value}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
            <div className="bestseller-item">
              <div className="bestseller-item-inner">
                <Link to={data?.set_3_redirect?.value}>
                  <div className="img-wrap relative overflow-hidden shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[20px] pb-[100%] bg-[#D9D9D9]">
                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-all duration-500"
                      src={data?.set_3_image?.reference?.image?.url}
                      alt=""
                    />
                  </div>
                  <div className="title mt-[27px]">
                    <h4 className="text-[20px] text-black text-center font-bold">
                        {data?.set_3_title?.value}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
