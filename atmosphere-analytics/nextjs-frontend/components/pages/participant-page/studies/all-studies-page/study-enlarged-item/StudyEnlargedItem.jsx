import StudyEnlargedItemContent from "./StudyEnlargedItemContent";
import OverlayAnimationSlide from "../../../../../shared/overlays/animations/OverlayAnimationSlide";

function StudyEnlargedItem({
  user,
  setUser,
  study,
  enlargedStudyOpen,
  setEnlargedStudyOpen,
  colors,
  isTest,
}) {
  return (
    <OverlayAnimationSlide
      open={enlargedStudyOpen}
      setOpen={setEnlargedStudyOpen}
      handleClick={() => null}
      direction={"up"}
      component={
        <div
          data-cy="item-study-enlarged"
          className={`w-full h-full ${colors.secondary.bg} center-content`}
        >
          <StudyEnlargedItemContent
            user={user}
            setUser={setUser}
            study={study}
            setEnlargedStudyOpen={setEnlargedStudyOpen}
            colors={colors}
            isTest={isTest}
          />
        </div>
      }
    />
  );
}

export default StudyEnlargedItem;
