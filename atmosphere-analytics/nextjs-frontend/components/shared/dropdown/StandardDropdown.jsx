import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

function StandardDropdown({
  title,
  value,
  setValue,
  options,
  extraClasses,
  colors,
  dataCy,
}) {
  return (
    <div className={`${extraClasses} w-full text-right`}>
      <Menu as="div" className="w-full relative inline-block text-left">
        <div>
          <Menu.Button
            data-cy={dataCy}
            className={`w-[100%] center-content rounded-md ${colors.primary.violetBg} ${colors.primary.text} py-2 px-4 font-medium text-sm hover:bg-opacity-80 transition-all`}
          >
            {title}
            <ChevronDownIcon
              className={`ml-2 -mr-1 h-5 w-5 ${colors.primary.text}`}
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute z-10 right-0 w-56 mt-2 rounded-md ${colors.primary.bg} shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all`}
          >
            <div className="px-1 py-1 ">
              {options.map((option, i) => {
                return (
                  <Menu.Item data-cy={`${dataCy}-item`} key={i}>
                    {({ active }) => (
                      <button
                      type="button"
                        onClick={() => setValue(option.value)}
                        className={`${
                          JSON.stringify(value) !== JSON.stringify(option.value)
                            ? active
                              ? `${colors.primaryRev.text}`
                              : `${colors.gray.text}`
                            : `${colors.primary.violetBg} ${colors.secondary.text}`
                        } w-full flex transition-all items-center rounded-md p-2 my-2 text-sm`}
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default StandardDropdown;
