import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import StandardButton from "../../../../../shared/buttons/StandardButton";
import medical from "../../../../../../images/medical.jpg";
import { useState, useEffect } from "react";
import StudyEnlargedEnrollmentDisplay from "./StudyEnlargedEnrolmentDisplay";
import AuthReport from "../../../../../shared/reports/AuthReport";

function StudyEnlargedItemContent({
  user,
  setUser,
  study,
  setEnlargedStudyOpen,
  colors,
  isTest,
}) {
  const [enrollmentDisplayOpen, setEnrollmentDisplayOpen] = useState(null);
  const [report, setReport] = useState(null);

  function requiresNotifications() {
    return true;
  }

  useEffect(() => {
    async function checkPermissions() {
      if (Notification.permission !== "granted" && requiresNotifications()) {
        setReport({
          title: "Please allow push notifications to enroll.",
          error: true,
        });
      }
      if (user.enrolledStudies.length !== 0) {
        if (
          user.enrolledStudies
            .map((study) => {
              return study._id;
            })
            .includes(study._id)
        ) {
          setReport({
            title: "Already enrolled in study.",
            error: true,
          });
        } else {
          setReport({
            title: "Sorry, but you can only enroll within one Asthma study",
            error: true,
          });
        }
      }
    }

    checkPermissions();
  }, []);

  const buttonColor = report && !isTest ? "bg-black/30" : "";

  function getQuestionSlides() {
    return study.questionnaire.map((item, i) => {
      return (
        <div
          key={i}
          onClick={(e) => e.stopPropagation()}
          id={`question-slide${i}`}
          className={`h-full mt-4 carousel-item w-full relative mb-24 flex-col overflow-y-none`}
        >
          <div className={`w-full h-full flex-col px-4`}>
            <h2
              className={`md:text-xl text-lg mr-auto top-2 left-4 font-medium ${colors.primaryRev.violetText}`}
            >
              {`Question ${i + 1}`}
            </h2>
            <h2
              className={`md:text-xl text-sm ml-2 mr-2 md:ml-8 md:mr-8 font-medium ${colors.primaryRev.text}`}
            >
              {item.question}
            </h2>
            <h2
              className={`md:text-xl text-lg mt-2 mr-auto mb-0 left-4 font-medium ${colors.primaryRev.violetText}`}
            >
              {`Answer Choices ${i + 1}`}
            </h2>
            <div className="mb-auto mt-0 p-0 w-full h-full center-content flex-col">
              {item.answers.map((item, j) => {
                return (
                  <div
                    key={item}
                    className={`w-full ${
                      j === 0 && "mt-[0.25rem]"
                    } mt-6 max-w-sm rounded-lg m-0 p-2 md:text-base ${
                      colors.primary.violetBg
                    } ${colors.primary.text} text-sm `}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <a
              href={`#question-slide${
                i === 0 ? study.questionnaire.length - 1 : i - 1
              }`}
            >
              <ChevronLeftIcon
                data-cy="button-previous-slide"
                className={`h-8 w-8 ${colors.primaryRev.violetText} left-0`}
              />
            </a>
            <a
              href={`#question-slide${
                i === study.questionnaire.length - 1 ? 0 : i + 1
              }`}
            >
              <ChevronRightIcon
                data-cy="button-next-slide"
                className={`h-8 w-8 ${colors.primaryRev.violetText}`}
              />
            </a>
          </div>
        </div>
      );
    });
  }

  return (
    <div
      style={{
        backgroundImage: `url(${medical.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative z-0 w-full h-full flex flex-col overflow-y-auto"
    >
      <div
        className={`fixed bottom-0 w-full h-[70%] rounded-t-2xl z-[-1] ${colors.secondary.bg}`}
      ></div>
      <div className="w-full flex flex-col p-4 pb-48 ">
        <button
          data-cy="button-close-study"
          onClick={() => setEnlargedStudyOpen(null)}
          className="center-content flex-row mr-auto"
        >
          <ChevronLeftIcon className={`h-6 w-6 cursor-pointer text-white`} />
          <p className={`text-white`}>Show Less</p>
        </button>
      </div>
      <div
        className={`w-full min-h-full flex flex-col p-4 rounded-t-2xl ${colors.secondary.bg}`}
      >
        <p className={`text-2xl font-medium ${colors.primaryRev.text}`}>
          {study.name}
        </p>
        <p className={`font-medium mt-4 ${colors.primaryRev.text}`}>
          Description:
        </p>
        <div className="w-full px-4">
          <p className={`${colors.gray.text}`}>{study.description}</p>
        </div>
        <p className={`font-medium mt-4 ${colors.primaryRev.text}`}>
          Objective:
        </p>
        <div className="w-full px-4">
          <p className={`${colors.gray.text}`}>{study.objective}</p>
        </div>
        <div className="">
          <p className={`font-medium mt-4 ${colors.primaryRev.text}`}>
            Questionnaire
          </p>
          <div className="md:mx-16 carousel">{getQuestionSlides()}</div>
        </div>
        {report && (
          <AuthReport
            dataCy="report-study-enrollment"
            report={report.title}
            error={report.error}
            extraClasses="text-sm fixed w-[90%] left-0 right-0 mr-auto ml-auto bottom-16 center-content"
          />
        )}
        <StandardButton
          dataCy="button-display-enrollment"
          buttonAllowance={() => (isTest ? true : !report)}
          handleClick={() => setEnrollmentDisplayOpen(true)}
          message="Enroll Now"
          extraClasses={`fixed rounded-3xl p-[0.5em] left-0 right-0 mr-auto ml-auto w-[90%] shadow-sm bottom-6 ${buttonColor} cursor-default`}
          colors={colors}
        />
      </div>

      <StudyEnlargedEnrollmentDisplay
        user={user}
        setUser={setUser}
        study={study}
        enrollmentDisplayOpen={enrollmentDisplayOpen}
        setEnrollmentDisplayOpen={setEnrollmentDisplayOpen}
        requiresNotifications={requiresNotifications()}
        report={report}
        setReport={setReport}
        colors={colors}
      />
    </div>
  );
}

export default StudyEnlargedItemContent;
