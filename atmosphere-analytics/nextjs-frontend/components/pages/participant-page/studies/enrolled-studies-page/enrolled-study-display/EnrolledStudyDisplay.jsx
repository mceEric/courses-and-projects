import OverlayAnimationSlide from "../../../../../shared/overlays/animations/OverlayAnimationSlide";
import EnrolledStudyDisplayContent from "./EnrolledStudyDisplayContent";

function EnrolledStudyDisplay({
  user,
  setUser,
  enrolledStudyOpen,
  setEnrolledStudyOpen,
  enrolledStudy,
  locationPermission,
  setLocationPermission,
  colors,
}) {
  return (
    <OverlayAnimationSlide
      open={enrolledStudyOpen}
      setOpen={setEnrolledStudyOpen}
      handleClick={() => null}
      direction={"down"}
      component={
        <div
          data-cy="item-study-enlarged"
          className="w-full h-full bg-violet-50 center-content"
        >
          <EnrolledStudyDisplayContent
            user={user}
            setUser={setUser}
            setEnrolledStudyOpen={setEnrolledStudyOpen}
            enrolledStudy={enrolledStudy}
            locationPermission={locationPermission}
            setLocationPermission={setLocationPermission}
            colors={colors}
            airSensorId={user.airSensorId}
          />
        </div>
      }
    />
  );
}

export default EnrolledStudyDisplay;
