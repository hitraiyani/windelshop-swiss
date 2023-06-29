import {
  Form,
  useActionData,
  useFetcher,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import {useEffect, useRef} from 'react';
import {IconPhone, IconMail, IconArrowRight2} from '~/components';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { translate } from '~/lib/utils';


export function QuickRequest({className,locale}) {
  const schema = yup
  .object({
    name: yup.string().required(translate("name_require",locale)).min(3).max(50),
    email: yup
      .string()
      .email(translate("email_require",locale))
      .max(255)
      .required(translate("email_require_valid",locale)),
    inquiry: yup.string().required(translate("inquiry_require",locale) ).min(5),
  })
  .required();

  let formRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    fetcher.submit(data, {method: 'post'});
  };

  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.status == true) {
      formRef.current.reset();
    }
  }, [fetcher]);

  return (
    <section
      className={`${className} quick-request-section py-[20px] md:py-[30px] xl:py-[40px] 2xl:py-[50px]`}
    >
      <div className="container">
        <div className="quick-request-row flex flex-col lg:flex-row gap-[30px]">
          <div className="content-col w-full lg:w-[270px]">
            <div className="col-inner">
              <h2 className="text-black text-[24px] font-bold text-left mb-[20px] lg:mb-[36px]">
                {translate('quick_request',locale)}
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
                      <span className="text flex-1">{translate("phone_number",locale)}</span>
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
                      <span className="text flex-1">Email senden</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-col w-full lg:flex-1">
            <div className="col-inner bg-[#CCDDF1] rounded-[30px] px-[30px] md:px-[30px] py-[30px] md:py-[30px] lg:py-[40px] 2xl:py-[61px]">
              <div className="form-wrap max-w-[795px] mx-auto">
                {fetcher?.data?.status == true && (
                  <span className="text-green-700">
                    {fetcher?.data?.message}
                  </span>
                )}
                {fetcher?.data?.status == false && (
                  <span className="text-red-700">{fetcher?.data?.message}</span>
                )}
                <fetcher.Form
                  ref={formRef}
                  method="post"
                  action="/"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex gap-[15px] flex-col"
                >
                  <div className="form-group flex flex-col md:flex-row gap-[11px]">
                    <div className="form-control flex-1">
                      <input
                        name="name"
                        {...register('name')}
                        className="w-full h-[50px] rounded-[100px] !bg-white text-[#1C5F7B] text-[16px] font-medium leading-none placeholder:!text-[#1C5F7B] placeholder:!opacity-100 focus:!border-[#1C5F7B] px-[20px] py-[16px] text-left !border-white focus:!ring-0"
                        type="text"
                        placeholder={translate('name',locale)}
                      />
                      <p className="text-red-700">{errors.name?.message}</p>
                    </div>
                    <div className="form-control flex-1">
                      <input
                        name="email"
                        {...register('email')}
                        className="w-full h-[50px] rounded-[100px] !bg-white text-[#1C5F7B] text-[16px] font-medium leading-none placeholder:!text-[#1C5F7B] placeholder:!opacity-100 focus:!border-[#1C5F7B] px-[20px] py-[16px] text-left !border-white focus:!ring-0"
                        type="email"
                        placeholder={translate('email',locale)}
                      />
                      <p className="text-red-700">{errors.email?.message}</p>
                    </div>
                  </div>
                  <div className="form-group flex flex-col md:flex-row gap-[11px]">
                    <div className="form-control flex-1">
                      <textarea
                        className="w-full rounded-[20px] !bg-white text-[#1C5F7B] text-[16px] font-medium leading-none placeholder:!text-[#1C5F7B] placeholder:!opacity-100 focus:!border-[#1C5F7B] px-[20px] py-[16px] text-left !border-white focus:!ring-0"
                        name="inquiry"
                        {...register('inquiry')}
                        id=""
                        cols="30"
                        rows="6"
                        placeholder={translate("message",locale)}
                      ></textarea>
                      <p className="text-red-700">{errors.inquiry?.message}</p>
                    </div>
                  </div>
                  <div className="submit-btn xl:mt-[15px]">
                    <button
                      type="submit"
                      className="bg-[#1C5F7B] rounded-[30px] py-[2px] pl-[19px] pr-[10px] px-[20px] min-h-[36px] leading-none text-[12px] text-white text-center hover:opacity-70 transition-all duration-500 flex items-center"
                      disabled={fetcher.state === 'submitting'}
                    >
                      {fetcher.state === 'submitting' ? 'Submiting' : translate('send',locale)}
                      <span className="icon w-[24px] h-[24px]">
                        <IconArrowRight2 className={'w-full h-full'} />
                      </span>
                    </button>
                  </div>
                </fetcher.Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
