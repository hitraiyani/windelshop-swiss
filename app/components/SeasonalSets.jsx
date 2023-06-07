export function SeasonalSets({className}) {
  return (
    <section
      className={`${className} seasonalsets-categories-section bestseller-categories-section py-[50px]`}
    >
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-black text-[24px] font-bold text-left">
            Saisonale Sets
          </h2>
        </div>
        <div className="bestseller-item-lists">
          <div className="bestseller-items grid grid-cols-3 gap-[30px]">
            <div className="bestseller-item">
              <div className="bestseller-item-inner">
                <a href="#">
                  <div className="img-wrap relative overflow-hidden shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[20px] pb-[100%] bg-[#D9D9D9]">
                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-all duration-500"
                      src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/image_1_2.png?v=1686052749"
                      alt=""
                    />
                  </div>
                  <div className="title mt-[27px]">
                    <h4 className="text-[20px] text-black text-center font-bold">
                      Wasserspass
                    </h4>
                  </div>
                </a>
              </div>
            </div>
            <div className="bestseller-item">
              <div className="bestseller-item-inner">
                <a href="#">
                  <div className="img-wrap relative overflow-hidden shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[20px] pb-[100%] bg-[#D9D9D9]">
                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-all duration-500"
                      src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Image_2.png?v=1686052749"
                      alt=""
                    />
                  </div>
                  <div className="title mt-[27px]">
                    <h4 className="text-[20px] text-black text-center font-bold">
                      Hygiene für Unterwegs
                    </h4>
                  </div>
                </a>
              </div>
            </div>
            <div className="bestseller-item">
              <div className="bestseller-item-inner">
                <a href="#">
                  <div className="img-wrap relative overflow-hidden shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rounded-[20px] pb-[100%] bg-[#D9D9D9]">
                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-all duration-500"
                      src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/Image_3_1.png?v=1686052749"
                      alt=""
                    />
                  </div>
                  <div className="title mt-[27px]">
                    <h4 className="text-[20px] text-black text-center font-bold">
                      Gesunde Snackpakete
                    </h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
