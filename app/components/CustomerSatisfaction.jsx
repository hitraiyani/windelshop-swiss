import {IconGoogle, IconStar2} from '~/components';

export function CustomerSatisfaction({className}) {
  return (
    <section className={`${className} customer-satis-faction-section py-[50px]`}>
      <div className="container">
        <div className="bg-[#E7EFFF] google-review-wrap py-[32px] rounded-[20px]">
          <div className="flex flex-wrap max-w-[740px] mx-auto gap-[30px] items-center">
            <div className="content max-w-[324px] flex flex-col gap-[7px]">
              <h3 className='text-[22px] text-[#292929] font-semibold block'>Kundenzufriedenheit & Service stehen im Fokus</h3>
              <h4 className='text-[16px] text-[#292929] block'>Das sehen auch unsere Kunden so</h4>
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
        </div>
      </div>
    </section>
  );
}
