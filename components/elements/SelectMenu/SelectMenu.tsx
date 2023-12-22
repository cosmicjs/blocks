"use client"

import { Listbox, Transition } from "@headlessui/react"
import classNames from "classnames"
import { ChevronDownIcon } from "lucide-react"
import React, { Fragment, useEffect, useState } from "react"

export type SelectOption = {
  title: React.ReactNode
  value: any
  option?: React.ReactNode
}

type SelectMenuProps = {
  value?: SelectOption
  options: SelectOption[]
  onChange?: (value: SelectOption) => void
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  options,
  value,
  onChange,
}) => {
  const [selected, setSelected] = useState<SelectOption>(value || options?.[0])

  useEffect(() => {
    if (value) setSelected(value)
  }, [value])

  if (!options) return null

  return (
    <div>
      <Listbox
        value={selected}
        onChange={(selected) => {
          setSelected(selected)
          onChange?.(selected)
        }}
      >
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full rounded-lg border border-gray-100 bg-white px-3 py-2 text-left text-sm dark:border-dark-gray-100 dark:bg-dark-background">
              <span className="text-overflow-ellipsis block w-[90%] overflow-hidden whitespace-nowrap text-dark-gray-100 dark:text-gray-100">
                {selected.title}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className={classNames(
                    "dark:bg-cosmic-bg-dark h-8 w-4 text-dark-gray-100 transition ease-linear dark:text-gray-100",
                    {
                      "rotate-180": open,
                    }
                  )}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute right-0 z-[70] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none dark:border dark:border-dark-gray-100 dark:bg-dark-background">
                {options?.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative w-full cursor-pointer select-none px-3 py-1 ${
                        active
                          ? "bg-gray-100 text-dark-gray-100 dark:bg-dark-gray-100 dark:text-gray-100"
                          : "text-dark-gray-100 dark:text-gray-100"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option?.option ?? option.title}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  )
}
export default SelectMenu
