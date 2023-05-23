import { useState } from "react";
import { removeEnrolledStudy } from "../../../../../../services/ParticipantService";
import PromptOverlay from "../../../../../shared/overlays/PromptOverlay";
import { deleteCheck } from "../../../../../../services/InfluxDBService";

function EnrolledStudyUnenrollmentDisplay({
  user,
  setUser,
  setEnrolledStudyOpen,
  unenrollmentDisplayOpen,
  setUnenrollmentDisplayOpen,
  enrolledStudy,
  colors,
}) {
  const [report, setReport] = useState(null);

  async function studyUnenrollment() {
    const jwt = localStorage.getItem("participant-jwt");
    const res = await removeEnrolledStudy(enrolledStudy._id, jwt);
    await deleteCheck(jwt);
    if (res.statusCode === 400) {
      handleLogout(true);
      router.push("/participant");
    } else if (res.message) {
      setReport({
        title: res.message,
        error: true,
      });
      return;
    }
    setEnrolledStudyOpen(null);
    setUser(res);
    setReport({
      title: "Unenrollment sucessful.",
      error: false,
    });
    setUnenrollmentDisplayOpen(null);
  }

  return (
    <PromptOverlay
      open={unenrollmentDisplayOpen}
      setOpen={setUnenrollmentDisplayOpen}
      handleSubmit={studyUnenrollment}
      title={enrolledStudy.name}
      prompt={
        "The unenrollment of this study will result in the removal of all content and data related to you and the study."
      }
      requiresNotifications={true}
      report={report}
      buttonPrompt={"Unenroll"}
      colors={colors}
    />
  );
}

export default EnrolledStudyUnenrollmentDisplay;
