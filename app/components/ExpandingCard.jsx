import {Disclosure, Transition} from '@headlessui/react';
import {Text, IconArrowRight2} from '~/components';

export function ExpandingCard({title, content}) {
  return (
    <Disclosure as="div" className="grid w-full border-black border-t-[2px] ">
      {({open}) => (
        <>
          <Disclosure.Button
            className={`${
              open ? 'active' : ''
            }  py-[20px] px-[30px] px-5outline-none focus:outline-none`}
          >
            <div className="flex items-center gap-x-3 justify-between">
              <Text
                as="h5"
                className="text-sub text-[#1C5F7B] text-left !text-[22px] font-semibold flex-1 leading-[1.2]"
                dangerouslySetInnerHTML={{__html: title}}
              ></Text>
              <IconArrowRight2
                className={`${
                  open ? 'rotate-[-90deg]' : 'rotate-[90deg]'
                } transition-transform transform-gpu duration-200 w-[40px] h-[40px]`}
              />
            </div>
          </Disclosure.Button>
          <Transition
            show={open}
            className="overflow-hidden"
            enter="transition-all duration-500"
            enterFrom="max-h-0"
            enterTo={`max-h-[200vh]`}
            leave="transition-all duration-500"
            leaveFrom="max-h-[200vh]"
            leaveTo="max-h-0"
          >
            <Disclosure.Panel
              className="editor-content pb-[30px] px-[25px] grid gap-2 text-[14px] font-normal leading-[1.3] text-black"
              static
            >
              <p dangerouslySetInnerHTML={{__html: content}}></p>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
