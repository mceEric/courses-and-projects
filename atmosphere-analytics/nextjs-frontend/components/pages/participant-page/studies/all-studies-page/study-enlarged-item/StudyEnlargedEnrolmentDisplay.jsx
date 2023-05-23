import { useRouter } from "next/router";
import { handleLogout } from "../../../../../../services/AuthenicationService";
import { appendEnrolledStudy } from "../../../../../../services/ParticipantService";
import PromptOverlay from "../../../../../shared/overlays/PromptOverlay";
import { createCheck } from "../../../../../../services/InfluxDBService";

function StudyEnlargedEnrollmentDisplay({
  user,
  setUser,
  study,
  enrollmentDisplayOpen,
  setEnrollmentDisplayOpen,
  requiresNotifications,
  report,
  setReport,
  colors,
}) {
  const router = useRouter();

  async function studyEnrollment() {
    const jwt = localStorage.getItem("participant-jwt");
    const res = await appendEnrolledStudy(study._id, jwt);
    await createCheck(
      res.airSensorId,
      res.enrolledStudies[0].frequency,
      res.pm,
      jwt
    );
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
    setUser(res);
    setReport({
      title: "Enrollment sucessful.",
      error: false,
    });
  }

  function getOverlayPrompt() {
    switch (study.frequency) {
      case "1d":
        return "This study requires the utilisation of notifications, and will potentially send notifications on a daily basis.";
      case "7d":
        return "This study requires the utilisation of notifications, and will potentially send notifications on a weekly basis.";
      case "14d":
        return "This study requires the utilisation of notifications, and will potentially send notifications on a bi-weekly basis.";
    }
  }

  return (
    <PromptOverlay
      open={enrollmentDisplayOpen}
      setOpen={setEnrollmentDisplayOpen}
      handleSubmit={studyEnrollment}
      title={study.name}
      prompt={getOverlayPrompt()}
      requiresNotifications={requiresNotifications}
      report={report}
      buttonPrompt={"Enroll"}
      colors={colors}
    />
  );
}

export default StudyEnlargedEnrollmentDisplay;
