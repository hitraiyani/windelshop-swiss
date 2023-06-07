import {IconArrowRight2} from '~/components';

export function Subscribe({className}) {
  return (
    <section className={`${className} subscribe-section py-[50px]`}>
      <div className="container">
        <div className="subscribe-wrap">
          <div className="subscribe-inner bg-[#CCDDF1] py-[63px] px-[30px] rounded-[30px]">
            <div className="subscribe-form max-w-[486px] mx-auto">
              <div className="title-wrap">
                <h2 className="text-black text-[24px] font-bold text-center mb-[20px]">
                  Nichts mehr verpassen!
                </h2>
                <div className="desc text-[16px] text-[#292929] mt-[34px] text-center">
                  <p>
                    Entdecken Sie die neusten Produkte, Aktionen und Rabatte,
                    nur das Beste für Sie und Ihren kleinen Liebling.
                  </p>
                </div>
              </div>
              <form action="" className='mt-[38px]'>
                <div className="form-group flex gap-[11px]">
                  <div className="form-control flex-1">
                    <input
                      type="email"
                      placeholder="E-Mail*"
                      className="w-full h-[50px] rounded-[100px] !bg-white text-[#1C5F7B] text-[16px] font-medium leading-none placeholder:!text-[#1C5F7B] placeholder:!opacity-100 focus:!border-[#1C5F7B] px-[20px] py-[16px] text-left !border-white focus:!ring-0"
                    />
                  </div>
                </div>
                <div className="submit-btn mt-[32px]">
                  <button
                    type="submit"
                    className="bg-[#1C5F7B] rounded-[30px] py-[2px] pl-[19px] pr-[10px] px-[20px] min-h-[36px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center min-w-[114px] justify-center mx-auto"
                  >
                    Senden
                    <span className="icon w-[24px] h-[24px]">
                      <IconArrowRight2 className={'w-full h-full'} />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
