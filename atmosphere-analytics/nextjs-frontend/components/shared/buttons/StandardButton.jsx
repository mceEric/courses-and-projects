import { useState } from "react";

function StandardButton({
  message,
  handleClick,
  extraClasses,
  dataCy,
  buttonAllowance,
  colors,
  studyCreation,
}) {
  const [hover, setHover] = useState(false);
  const buttonClick = handleClick ? () => handleClick() : () => null;
  const isDisabled = buttonAllowance ? !buttonAllowance() : false;

  return (
    <button
      disabled={isDisabled}
      type={studyCreation && "button"}
      onClick={buttonClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cy={dataCy}
      className={`${extraClasses} center-content p-4 rounded-md ${
        colors.primary.text
      } transition-all ${
        isDisabled
          ? colors.masked.bg
          : !hover
          ? `${colors.primary.violetBg}`
          : `${colors.secondary.violetBg}`
      }`}
    >
      {message}
    </button>
  );
}

export default StandardButton;
