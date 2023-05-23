import { useState } from "react";
import StandardButton from "../../../../../shared/buttons/StandardButton";
import EnrolledStudyUnenrollmentDisplay from "./EnrolledStudyUnenrollmentDisplay";
import GraphTop from "../../../../../shared/graphs/GraphTop";
import OverlayAnimationSlide from "../../../../../shared/overlays/animations/OverlayAnimationSlide";
import QuestionnaireAnswerDisplay from "./questionnaire-answer-display/QuestionnaireAnswerDisplay";
import MessageOverlay from "../../../../../shared/overlays/MessageOverlay";

function EnrolledStudyDisplayContent({
  user,
  setUser,
  setEnrolledStudyOpen,
  enrolledStudy,
  locationPermission,
  setLocationPermission,
  colors,
  airSensorId,
}) {
  const [unenrollmentDisplayOpen, setUnenrollmentDisplayOpen] = useState(false);
  const [messageOverlay, setMessageOverlay] = useState(false);
  const [questionnaireDisplayOpen, setQuestionnaireDisplayOpen] =
    useState(false);
  const [answers, setAnswers] = useState(
    enrolledStudy.questionnaire.map((item) => {
      return { question: item.question, answer: null };
    })
  );

  const isTest = window.Cypress ? true : false;

  // Determines whether a questionnaire is availabe to a specific user
  function handleAnswerQuestionnaireClick() {
    if (isTest) {
      setQuestionnaireDisplayOpen(true);
      return;
    }
    if (!user.lastResultSubmission) {
      setQuestionnaireDisplayOpen(true);
      return;
    }
    const currentDate = new Date(new Date().toISOString());
    const lastResultSubmission = new Date(user.lastResultSubmission);
    lastResultSubmission.setDate(lastResultSubmission.getDate() + 3);
    if (user.lastCheck) {
      const lastCheckDate = new Date(user.lastCheck);
      lastCheckDate.setDate(lastCheckDate.getDate() + 1);
      if (currentDate - lastCheckDate > 0) {
        setMessageOverlay(true);
      } else {
        setQuestionnaireDisplayOpen(true);
      }
    } else if (currentDate - lastResultSubmission > 0) {
      setQuestionnaireDisplayOpen(true);
    } else {
      setMessageOverlay(true);
    }
  }

  return (
    <div className="w-full h-full flex items-center flex-col p-0">
      <GraphTop
        colors={colors}
        locationPermission={locationPermission}
        airSensorId={airSensorId}
        setData={setEnrolledStudyOpen}
        extraClasses={"h-[50%]"}
      />
      <div
        className={`w-full center-content flex-1 flex-col ${colors.secondary.bg}`}
      >
        <h2
          className={`text-2xl ${colors.primaryRev.violetText}  mt-6 font-medium`}
        >
          {enrolledStudy.name}
        </h2>
        <p
          className={`text-xl flex flex-row ${colors.primaryRev.text} mb-auto mt-6 font-medium`}
        >
          Your current PM threshold is&nbsp;
          <p className={`text-xl ${colors.primaryRev.violetText} font-medium`}>
            {user.pm}
          </p>
        </p>
        <StandardButton
          dataCy="button-answer-questionnaire"
          handleClick={() => handleAnswerQuestionnaireClick()}
          buttonAllowance={() => true}
          message="Answer Questionnaire"
          extraClasses={`rounded-xl py-2 px-6 mb-auto mr-auto ml-auto shadow-sm ${
            false && `${colors.masked.bg} cursor-default`
          }`}
          colors={colors}
        />

        <StandardButton
          dataCy="button-display-unenrollment"
          handleClick={() => setUnenrollmentDisplayOpen(true)}
          buttonAllowance={() => true}
          message="Unenroll now"
          extraClasses={`fixed rounded-3xl p-[0.5em] left-0 right-0 mr-auto ml-auto w-[90%] shadow-sm bottom-6 ${
            false && `${colors.masked.bg} cursor-default`
          }`}
          colors={colors}
        />
      </div>
      <EnrolledStudyUnenrollmentDisplay
        user={user}
        setUser={setUser}
        setEnrolledStudyOpen={setEnrolledStudyOpen}
        unenrollmentDisplayOpen={unenrollmentDisplayOpen}
        setUnenrollmentDisplayOpen={setUnenrollmentDisplayOpen}
        enrolledStudy={enrolledStudy}
        colors={colors}
      />
      <OverlayAnimationSlide
        open={questionnaireDisplayOpen}
        setOpen={setQuestionnaireDisplayOpen}
        handleClick={() => null}
        direction={"left"}
        component={
          <div
            data-cy="item-study-enlarged"
            className={`w-full h-full ${colors.secondary.bg} center-content`}
          >
            <QuestionnaireAnswerDisplay
              setUser={setUser}
              answers={answers}
              setAnswers={setAnswers}
              enrolledStudy={enrolledStudy}
              setQuestionnaireDisplayOpen={setQuestionnaireDisplayOpen}
              colors={colors}
            />
          </div>
        }
      />
      <MessageOverlay
        open={messageOverlay}
        setOpen={setMessageOverlay}
        title={"Questionnaire Closed"}
        message={
          "Questionnaire will open when the air quality values near you has become hazardous."
        }
        colors={colors}
      />
    </div>
  );
}

export default EnrolledStudyDisplayContent;
