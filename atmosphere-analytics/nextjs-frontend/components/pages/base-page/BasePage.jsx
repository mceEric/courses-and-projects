import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import StandardToggle from "../../shared/buttons/StandardToggle";
import lightLogo from "../../../images/logos/light-full-logo.png";
import darkLogo from "../../../images/logos/dark-full-logo.png";
import lightIcon from "../../../images/logos/light-icon.png";
import darkIcon from "../../../images/logos/dark-icon.png";

export default function BasePage({
  getComponent,
  currentComponent,
  setCurrentComponent,
  sidebarItems,
  darkMode,
  setDarkMode,
  colors,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logo = darkMode ? darkLogo : lightLogo;
  const icon = darkMode ? darkIcon : lightIcon;

  function handleToggleClick() {
    if (darkMode) {
      setDarkMode(false);
      return;
    }
    setDarkMode(true);
  }

  return (
    <div className="w-full h-full flex">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className={`relative ${colors.primary.bg} flex w-full max-w-xs flex-1 flex-col pt-5 transition-all pb-4`}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 mr-2 pt-2">
                    <button
                      type="button"
                      className="ml-1 w-10 flex h-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className={`h-6 w-6 ${colors.primaryRev.text}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex justify-center flex-shrink-0 items-center px-4">
                  <Image width={200} height={150} src={logo} alt="App Logo" />
                </div>
                <div className="mt-5 flow-y-auto">
                  <nav className="space-y-1 px-2">
                    {sidebarItems.map((item) => (
                      <button
                        onClick={() => [
                          setCurrentComponent(item),
                          setSidebarOpen(false),
                        ]}
                        datacy={item.dataCy}
                        key={item.name}
                        className={`group flex w-full my-2 items-center p-4 text-base font-medium rounded-md transition-all ${
                          currentComponent.name === item.name
                            ? `${colors.primary.violetBg} ${colors.primary.text}`
                            : `text-gray-400 ${colors.primary.hover} `
                        }`}
                      >
                        <item.icon
                          className={`mr-4 flex-shrink-0 h-6 w-6 transition-all ${
                            currentComponent.name === item.name
                              ? `${colors.primary.text}`
                              : `${colors.primary.violetText} ${colors.primary.violetHover}`
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </button>
                    ))}
                  </nav>
                  <div className="absolute bottom-0">
                    <h2
                      className={`${colors.primaryRev.violetText} font-medium text-xs ml-6`}
                    >
                      {darkMode ? "Dark Theme" : "Light Theme"}
                    </h2>
                    <StandardToggle
                      message={"Color Scheme"}
                      dataCy={"toggle-change-color-scheme"}
                      extraClasses={"ml-6 mb-6 mt-auto"}
                      handleClick={() => handleToggleClick()}
                      active={darkMode}
                      colors={colors}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div
          className={`flex flex-grow flex-col overflow-y-auto border-r border-transparent ${colors.primary.bg} pt-5`}
        >
          <div className="flex justify-center flex-shrink-0 items-center px-4">
            <Image width={200} height={150} src={logo} alt="App Logo" />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                data-cy={item.dataCy}
                onClick={() => setCurrentComponent(item)}
                className={`group flex my-2 mx-4 items-center p-4 text-sm font-medium rounded-md transition-all ${
                  currentComponent.name === item.name
                    ? `${colors.primary.violetBg} ${colors.primary.text}`
                    : `text-gray-400 ${colors.primary.hover} `
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 transition-all ${
                    currentComponent.name === item.name
                      ? `${colors.primary.text}`
                      : `${colors.primary.violetText} ${colors.primary.violetHover}`
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            ))}
          </div>
          <h2
            className={`${colors.primaryRev.violetText} font-medium text-xs ml-6`}
          >
            {darkMode ? "Dark Theme" : "Light Theme"}
          </h2>
          <StandardToggle
            message={"Color Scheme"}
            dataCy={"toggle-change-color-scheme"}
            extraClasses={"ml-6 mb-6"}
            handleClick={() => handleToggleClick()}
            active={darkMode}
            colors={colors}
          />
        </div>
      </div>
      <div className="w-full bg-violet-700 flex flex-1 flex-col md:pl-64">
        <main className={`w-full flex-1 transition-all ${colors.secondary.bg}`}>
          {getComponent()}
          <div
            className={`${colors.primary.bg} fixed top-0 left-0 right-0 md:hidden px-2 py-2.5 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl`}
          >
            <Image width={75} height={50} src={icon} alt="App Logo" />
            <div className="flex items-center lg:order-2">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 center-content"
              >
                <Bars3Icon
                  className={`w-8 h-8 transition-all ${
                    colors.primaryRev.text
                  } ${sidebarOpen ? "rotate-90" : "rotate-0"}`}
                />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
