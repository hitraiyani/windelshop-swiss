import {IconGoogle, IconStar2} from '~/components';
import { translate } from '~/lib/utils';

export function CustomerSatisfaction({className,locale}) {
  return (
    <section className={`${className} customer-satisfaction-section py-[15px] md:py-[30px]`}>
      <div className="container">
        {/* <div className="bg-[#E7EFFF] google-review-wrap py-[32px] px-[20px] rounded-[20px]">
          <div className="flex flex-wrap max-w-[760px] mx-auto gap-[30px] items-center">
            <div className="content max-w-[324px] flex flex-col gap-[7px]">
              <h3 className='text-[22px] text-[#292929] font-semibold block'>{ translate('customer_satisfaction_text', locale) }</h3>
              <h4 className='text-[16px] text-[#292929] block'>{ translate('our_customer_text', locale) }</h4>
            </div>
            <div className="icon-with-star flex gap-[17px] items-center">
              <div className="icon w-[58px] h-[58px] rounded-[10px] bg-white p-[9px]">
                <IconGoogle className={'w-full h-full'} />
              </div>
              <div className="rating-start flex gap-[15px] items-center">
                <span className='text-[22px] text-[#1C5F7B] leading-none font-semibold '>4.7</span>
                <div className="star flex gap-[5px] text-[#1C5F7B]">
                  <IconStar2 className="w-[22px] h-[22px]" />
                  <IconStar2 className="w-[22px] h-[22px]" />
                  <IconStar2 className="w-[22px] h-[22px]" />
                  <IconStar2 className="w-[22px] h-[22px]" />
                  <IconStar2 className="w-[22px] h-[22px]" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="bg-[#E7EFFF] google-review-wrap py-[32px] px-[20px] rounded-[20px]">
          <div className="flex flex-wrap max-w-[1000px] mx-auto gap-[30px] items-center justify-center">
            <div className="content max-w-[324px] flex flex-col gap-[7px]">
              <h3 className='text-[22px] text-[#292929] font-semibold block'>{ translate('customer_satisfaction_text', locale) }</h3>
              <h4 className='text-[16px] text-[#292929] block'>{ translate('our_customer_text', locale) }</h4>
            </div>
            <div className="icon-with-star flex gap-[17px] items-center">
              <div className="icon max-w-[130px] h-[20px] rounded-[10px]">
                {/* <IconGoogle className={'w-full h-full'} /> */}
                <img src="https://assets.reviews.io/img/all-global-assets/logo/reviewsio-logo.svg" alt="" className='w-full h-full' />
              </div>
              <div className="rating-start flex gap-[15px] items-center">
                <span className='text-[22px] text-[#1C5F7B] leading-none font-semibold '>4.7</span>
                <div className="star flex gap-[5px] text-[#1C5F7B]">
                  <IconStar2 className="w-[22px] h-[22px]" />
                  <IconStar2 className="w-[22px] h-[22px]" />
                  <IconStar2 className="w-[22px] h-[22px]" />
                  <IconStar2 className="w-[22px] h-[22px]" />
                  <IconStar2 className="w-[22px] h-[22px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
