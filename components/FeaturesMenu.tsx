import { features } from "@/config/features"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { Fragment } from "react"

export default function FeaturesMenu() {
  return (
    <div className="hidden w-full max-w-sm px-4 lg:block">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${
                  open
                    ? "text-gray-900 dark:text-dark-gray-900"
                    : "text-gray-900/90 dark:text-dark-gray-900/90"
                }
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium focus:outline-none`}
            >
              <span>Blocks</span>
              <ChevronDownIcon
                className={`${open ? "rotate-180 " : ""}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform rounded-xl px-4 shadow-lg shadow-gray-50 dark:shadow-gray-800 sm:px-0 lg:max-w-xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative grid gap-x-8 gap-y-5 bg-white p-7 dark:bg-dark-background lg:grid-cols-3">
                    {features.map((item) => (
                      <Link
                        className="-m-3 flex items-center rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none hover:dark:bg-dark-gray-50"
                        key={item.key}
                        href={item.preview_link}
                        onClick={() => close()}
                      >
                        <div className="flex h-10 w-5 shrink-0 items-center justify-center text-white sm:h-9 sm:w-6">
                          {item.emoji}
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-dark-gray-900">
                            {item.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
