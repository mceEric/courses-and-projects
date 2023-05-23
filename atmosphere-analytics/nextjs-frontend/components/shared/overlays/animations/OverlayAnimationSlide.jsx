import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function OverlayAnimationSlide(props) {
  const { open, setOpen, component, handleClick, direction } = props;

  function handleSlideDirection() {
    switch (direction) {
      case "right":
        return (
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="-translate-x-full"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-x-0"
            leaveTo="-translate-x-full"
          >
            {component}
          </Transition.Child>
        );
      case "left":
        return (
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="translate-x-full"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            {component}
          </Transition.Child>
        );
      case "up":
        return (
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="translate-y-full"
            enterTo="-translate-y-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-y-0"
            leaveTo="translate-y-full"
          >
            {component}
          </Transition.Child>
        );
      case "down":
        return (
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="-translate-y-full"
            enterTo="-translate-y-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-y-0"
            leaveTo="-translate-y-full"
          >
            {component}
          </Transition.Child>
        );
    }
  }

  return (
    <Transition.Root show={open ? true : false} as={Fragment}>
      <Dialog as="div" onClose={setOpen}>
        <div className="fixed center-content inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              onClick={() => handleClick()}
              className="w-full h-full center-content bg-gray-500 bg-opacity-75"
            >
              {handleSlideDirection()}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default OverlayAnimationSlide;
