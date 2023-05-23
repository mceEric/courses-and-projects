import { Switch } from "@headlessui/react";

function StandardToggle({
  message,
  handleClick,
  extraClasses,
  dataCy,
  active,
  colors,
}) {
  const buttonClick = handleClick ? () => handleClick() : () => null;

  return (
    <Switch
      data-cy={dataCy}
      checked={active}
      onChange={buttonClick}
      className={`${
        active ? "bg-violet-400" : "bg-gray-200"
      } relative inline-flex h-8 w-16 items-center rounded-full ${extraClasses}`}
    >
      <span className="sr-only">{message}</span>
      <span
        className={`${
          active ? "translate-x-8" : "translate-x-2"
        } inline-block h-6 w-6 transform rounded-full ${
          colors.primary.bg
        } transition`}
      />
    </Switch>
  );
}

export default StandardToggle;
