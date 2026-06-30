// src/components/common/Select.jsx
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'انتخاب کنید',
  error,
  disabled = false,
}) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative w-fit">
        {label && (
          <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </Listbox.Label>
        )}

        <Listbox.Button
          className={`relative w-fit rounded-lg border bg-white py-2 pr-7 pl-10 text-right text-sm shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            dark:bg-gray-800 dark:text-gray-100
            disabled:cursor-not-allowed disabled:opacity-50
            ${
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            }`}
        >
          <span className={`block truncate ${!selectedOption ? 'text-gray-400 dark:text-gray-500' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-fit overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 sm:text-sm custom-scrollbar">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  `relative select-none cursor-pointer py-2 pr-10 pl-10 text-sm transition-colors duration-100
                  ${
                    selected
                      ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
                      : active
                      ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-900/50 dark:text-indigo-200'
                      : 'text-gray-900 dark:text-gray-200'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>

        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    </Listbox>
  );
}