import { useState } from "react";
import StudyCardItem from "../study-card-item/StudyCardItem";
import EnrolledStudyDisplay from "./enrolled-study-display/EnrolledStudyDisplay";

function EnrolledStudiesPage({
  user,
  setUser,
  locationPermission,
  setLocationPermission,
  colors,
}) {
  const [enrolledStudyOpen, setEnrolledStudyOpen] = useState(null);
  const [enrolledStudy, setEnrolledStudy] = useState(null);

  return (
    <div className="w-full h-full center-content flex-col p-0">
      <div className="w-full h-full center-content p-4">
        {user.enrolledStudies.length > 0 ? (
          <div className="w-full">
            {user.enrolledStudies.map((enrolledStudy, i) => {
              return (
                <StudyCardItem
                  key={i}
                  study={enrolledStudy}
                  setStudyOpen={setEnrolledStudyOpen}
                  setStudy={setEnrolledStudy}
                  colors={colors}
                />
              );
            })}
          </div>
        ) : (
          <h2
            className={`${colors.primaryRev.violetText} text-center text-2xl font-medium`}
          >
            You have not yet enrolled in any studies.
          </h2>
        )}
      </div>
      <EnrolledStudyDisplay
        user={user}
        setUser={setUser}
        enrolledStudyOpen={enrolledStudyOpen}
        setEnrolledStudyOpen={setEnrolledStudyOpen}
        enrolledStudy={enrolledStudy}
        locationPermission={locationPermission}
        setLocationPermission={setLocationPermission}
        colors={colors}
      />
    </div>
  );
}

export default EnrolledStudiesPage;
