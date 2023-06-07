import {IconPhone, IconMail, IconArrowRight2} from '~/components';

export function QuickRequest({className}) {
  return (
    <section className={`${className} quick-request-section py-[50px]`}>
      <div className="container">
        <div className="quick-request-row flex flex-row gap-[30px]">
          <div className="content-col w-[300px]">
            <div className="col-inner">
              <h2 className="text-black text-[28px] font-bold text-left mb-[36px]">
                Schnellanfrage
              </h2>
              <div className="comtent-info">
                <ul className="flex flex-col gap-[23px]">
                  <li>
                    <a
                      href="#"
                      className="text-[18px] flex gap-[14px] text-black font-normal items-center hover:text-[#1C5F7B]"
                    >
                      <span className="icon w-[35px] h-[35px] border-[2px] rounded-full border-black p-[7px] text-[#1C5F7B]">
                        <IconPhone className={'w-full h-full'} />
                      </span>
                      <span className="text">052 720 58 58</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[18px] flex gap-[14px] text-black font-normal items-center hover:text-[#1C5F7B]"
                    >
                      <span className="icon w-[35px] h-[35px] border-[2px] rounded-full border-black p-[7px] text-[#1C5F7B]">
                        <IconMail className={'w-full h-full'} />
                      </span>
                      <span className="text">Email senden</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-col flex-1">
            <div className="col-inner bg-[#CCDDF1] rounded-[30px] px-[30px] py-[61px]">
              <div className="form-wrap max-w-[795px] mx-auto">
                <form action="" className="flex gap-[15px] flex-col">
                  <div className="form-group flex gap-[11px]">
                    <div className="form-control flex-1">
                      <input
                        className="w-full h-[50px] rounded-[100px] !bg-white text-[#1C5F7B] text-[16px] font-medium leading-none placeholder:!text-[#1C5F7B] placeholder:!opacity-100 focus:!border-[#1C5F7B] px-[20px] py-[16px] text-left !border-white focus:!ring-0"
                        type="text"
                        placeholder="Name*"
                      />
                    </div>
                    <div className="form-control flex-1">
                      <input
                        className="w-full h-[50px] rounded-[100px] !bg-white text-[#1C5F7B] text-[16px] font-medium leading-none placeholder:!text-[#1C5F7B] placeholder:!opacity-100 focus:!border-[#1C5F7B] px-[20px] py-[16px] text-left !border-white focus:!ring-0"
                        type="email"
                        placeholder="E-Mail*"
                      />
                    </div>
                  </div>
                  <div className="form-group flex gap-[11px]">
                    <div className="form-control flex-1">
                      <textarea
                        className="w-full rounded-[20px] !bg-white text-[#1C5F7B] text-[16px] font-medium leading-none placeholder:!text-[#1C5F7B] placeholder:!opacity-100 focus:!border-[#1C5F7B] px-[20px] py-[16px] text-left !border-white focus:!ring-0"
                        name=""
                        id=""
                        cols="30"
                        rows="6"
                        placeholder="Anfrage"
                      ></textarea>
                    </div>
                  </div>
                  <div className="submit-btn">
                    <button
                      type="submit"
                      className="bg-[#1C5F7B] rounded-[30px] pl-[16px] pr-[10px] px-[20px] min-h-[50px] leading-none text-[16px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center"
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
      </div>
    </section>
  );
}
