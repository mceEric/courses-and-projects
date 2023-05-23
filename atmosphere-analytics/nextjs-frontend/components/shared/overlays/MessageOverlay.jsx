import StandardButton from "../buttons/StandardButton";
import OverlayAnimationFade from "./animations/OverlayAnimationFade";

function MessageOverlay({
  open,
  setOpen,
  title,
  message,
  colors,
  prompt,
  promptClick,
}) {
  const buttonClick = promptClick ? () => promptClick() : () => null;
  return (
    <OverlayAnimationFade
      open={open}
      setOpen={setOpen}
      handleClick={() => setOpen(null)}
      component={
        <div
          data-cy={"message-overlay-permission"}
          onClick={(e) => e.stopPropagation()}
          className={`max-w-[80%] p-4 center-content flex-col rounded-lg ${colors.secondary.bg}`}
        >
          <h2
            className={`text-2xl text-center font-medium mb-4 ${colors.primaryRev.text}`}
          >
            {title}
          </h2>
          <div className="px-4 center-content flex-col text-center mb-2">
            <p className={`${colors.primaryRev.text}`}>{message}</p>
          </div>
          <button
            data-cy="button-overlay-prompt"
            onClick={buttonClick}
            className={` bg-transparent cursor-pointer m-0 mb-4 p-0 ${colors.primaryRev.violetText}`}
          >
            {prompt}
          </button>
          <StandardButton
            dataCy="button-close-permission-overlay"
            handleClick={() => setOpen(null)}
            message="Close"
            extraClasses="w-full rounded-3xl p-0 py-2"
            colors={colors}
          />
        </div>
      }
    />
  );
}

export default MessageOverlay;
