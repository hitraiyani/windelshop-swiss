import {ExpandingCard} from '~/components';
import {toHTML} from '~/lib/utils';

export function Faq({className, data}) {
  return (
    <section className={`${className} faq-section py-[50px]`}>
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-[#1C5F7B] text-[24px] font-bold text-left mb-[20px]">
            {data?.title?.value}
          </h2>
          <div
            className="desc text-[14px] max-w-[868px] leading-[1.3]"
            dangerouslySetInnerHTML={{__html: toHTML(data?.description?.value)}}
          ></div>
        </div>
        <div className="expandingcard-wrap mt-[40px] last:border-black last:border-b-[2px]">
          {JSON.parse(data.faq_json.value).map((faqvalue) => (
            <ExpandingCard
              key={faqvalue.title}
              content={faqvalue.content}
              title={faqvalue.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
