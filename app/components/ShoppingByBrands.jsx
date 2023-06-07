export function ShoppingByBrands({className}) {
  return (
    <section className={`${className} shopping-by-brands-section py-[50px]`}>
      <div className="container">
        <div className="title-wrap mb-[70px]">
          <h2 className="text-black text-[28px] font-bold text-center">
            Einkaufen nach Marken
          </h2>
        </div>
        <div className="logo-lists-wrap">
          <div className="logo-list">
            <ul className="flex flex-wrap gap-x-[14px] gap-y-[12px] max-w-[910px] items-center justify-center mx-auto">
              <li className="w-[217px] h-[152px] flex items-center justify-center bg-[#E7EFFF] bg-opacity-[0.4] rounded-[10px]">
                <a href="#" className="p-[20px] block w-full h-full">
                  <img
                    className="w-full h-full object-contain transition-all duration-500"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/logo1.png?v=1686049218"
                    alt=""
                  />
                </a>
              </li>
              <li className="w-[217px] h-[152px] flex items-center justify-center bg-[#E7EFFF] bg-opacity-[0.4] rounded-[10px]">
                <a href="#" className="p-[20px] block w-full h-full">
                  <img
                    className="w-full h-full object-contain transition-all duration-500"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/logo2.png?v=1686049218"
                    alt=""
                  />
                </a>
              </li>
              <li className="w-[217px] h-[152px] flex items-center justify-center bg-[#E7EFFF] bg-opacity-[0.4] rounded-[10px]">
                <a href="#" className="p-[20px] block w-full h-full">
                  <img
                    className="w-full h-full object-contain transition-all duration-500"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/logo3.png?v=1686049218"
                    alt=""
                  />
                </a>
              </li>
              <li className="w-[217px] h-[152px] flex items-center justify-center bg-[#E7EFFF] bg-opacity-[0.4] rounded-[10px]">
                <a href="#" className="p-[20px] block w-full h-full">
                  <img
                    className="w-full h-full object-contain transition-all duration-500"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/logo4.png?v=1686049218"
                    alt=""
                  />
                </a>
              </li>
              <li className="w-[217px] h-[152px] flex items-center justify-center bg-[#E7EFFF] bg-opacity-[0.4] rounded-[10px]">
                <a href="#" className="p-[20px] block w-full h-full">
                  <img
                    className="w-full h-full object-contain transition-all duration-500"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/logo5.png?v=1686049218"
                    alt=""
                  />
                </a>
              </li>
              <li className="w-[217px] h-[152px] flex items-center justify-center bg-[#E7EFFF] bg-opacity-[0.4] rounded-[10px]">
                <a href="#" className="p-[20px] block w-full h-full">
                  <img
                    className="w-full h-full object-contain transition-all duration-500"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/logo6.png?v=1686049218"
                    alt=""
                  />
                </a>
              </li>
              <li className="w-[217px] h-[152px] flex items-center justify-center bg-[#E7EFFF] bg-opacity-[0.4] rounded-[10px]">
                <a href="#" className="p-[20px] block w-full h-full">
                  <img
                    className="w-full h-full object-contain transition-all duration-500"
                    src="https://cdn.shopify.com/s/files/1/0763/5307/7525/files/logo7.png?v=1686049218"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
