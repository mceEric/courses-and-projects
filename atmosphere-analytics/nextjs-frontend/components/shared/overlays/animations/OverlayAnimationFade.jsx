import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function OverlayAnimationFade(props) {
  const { open, setOpen, component, handleClick } = props;
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
              data-cy="close-overlay"
              onClick={() => handleClick()}
              className="w-full h-full center-content bg-gray-500 bg-opacity-75"
            >
              {component}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default OverlayAnimationFade;
