import StandardButton from "../buttons/StandardButton";
import AuthReport from "../reports/AuthReport";
import OverlayAnimationFade from "./animations/OverlayAnimationFade";

function PromptOverlay({
  open,
  setOpen,
  handleSubmit,
  title,
  prompt,
  requiresNotifications,
  report,
  buttonPrompt,
  colors,
}) {
  return (
    <OverlayAnimationFade
      open={open}
      setOpen={setOpen}
      handleClick={() => setOpen(null)}
      component={
        <div
          data-cy="overlay-study-enrollment"
          onClick={(e) => e.stopPropagation()}
          className={`max-w-[80%] p-4 center-content flex-col rounded-lg ${colors.secondary.bg}`}
        >
          <h2 className={`text-2xl font-medium mb-4 ${colors.primaryRev.text}`}>
            {title}
          </h2>
          <div className="px-4 center-content flex-col text-center mb-8">
            <p className={`${colors.primaryRev.text}`}>{prompt}</p>
            <p className={`${colors.primaryRev.text}`}>
              Are you sure you would like to continue?
            </p>
          </div>
          {report && (
            <AuthReport
              dataCy="report-enrollment-display"
              report={report.title}
              error={report.error}
              extraClasses="text-sm center-content"
            />
          )}
          <StandardButton
            dataCy="button-study-enrollment"
            handleClick={() => handleSubmit()}
            message={buttonPrompt}
            extraClasses={`w-full rounded-3xl mb-4 p-0 py-2 ${
              report && "bg-gray-100 cursor-default"
            }`}
            colors={colors}
          />
          <StandardButton
            dataCy="button-cancel-enrollment"
            handleClick={() => setOpen(null)}
            message="Cancel"
            extraClasses="w-full rounded-3xl p-0 py-2"
            colors={colors}
          />
        </div>
      }
    />
  );
}

export default PromptOverlay;
