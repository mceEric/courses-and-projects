import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import StandardButton from "../../../../../../shared/buttons/StandardButton";
import PromptOverlay from "../../../../../../shared/overlays/PromptOverlay";
import { submitQuestionnaire } from "../../../../../../../services/QuestionnaireService";

function QuestionnaireAnswerDisplay({
  setUser,
  answers,
  setAnswers,
  enrolledStudy,
  setQuestionnaireDisplayOpen,
  colors,
}) {
  const [submitOverlay, setSubmitOverlay] = useState(false);

  // Performs necessary actions for question click
  function handleQuestionClick(chosenAnswer, i) {
    setAnswers(
      answers
        .slice(0, i)
        .concat({ question: answers[i].question, answer: chosenAnswer })
        .concat(answers.slice(i + 1, answers.length))
    );
  }

  // Function that checks if questionnaire is submitable or not
  function isSubmitDisabled() {
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].answer === null) {
        return true;
      }
    }
    return false;
  }

  // Submits a questionnaire
  async function handleSubmit() {
    const jwt = localStorage.getItem("participant-jwt");
    const res = await submitQuestionnaire(enrolledStudy._id, answers, jwt);
    setUser(res);
    setAnswers(
      enrolledStudy.questionnaire.map((item) => {
        return { question: item.question, answer: null };
      })
    );
    setQuestionnaireDisplayOpen(false);
  }

  function getQuestionnaireIntroductionSlide() {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        id={`question-slide0`}
        className={`carousel-item ${colors.primary.bg} w-full py-2 relative flex-col overflow-y-auto`}
      >
        <div
          className={`w-full h-full center-content flex-col px-4 ${colors.primary.bg}`}
        >
          <h2
            className={`md:text-xl text-lg mr-auto top-2 left-4 font-medium ${colors.primaryRev.violetText}`}
          >
            {enrolledStudy.name}
          </h2>
          <h2
            className={`md:text-xl mt-2 text-sm ml-2 mr-2 md:ml-8 md:mr-8 top-10 font-medium ${colors.primaryRev.text}`}
          >
            {enrolledStudy.description}
          </h2>
          <div className="mb-auto w-full h-full center-content flex-col mt-6"></div>
        </div>
        <div className="flex justify-between mt-6">
          <a href={`#question-slide${enrolledStudy.questionnaire.length + 1}`}>
            <ChevronLeftIcon
              data-cy="button-previous-slide"
              className={`h-8 w-8 ${colors.primaryRev.violetText} left-0`}
            />
          </a>
          <a href={`#question-slide1`}>
            <ChevronRightIcon
              data-cy="button-next-slide"
              className={`h-8 w-8 ${colors.primaryRev.violetText}`}
            />
          </a>
        </div>
      </div>
    );
  }

  function getQuestionSlides() {
    return enrolledStudy.questionnaire.map((item, i) => {
      return (
        <div
          key={i}
          onClick={(e) => e.stopPropagation()}
          id={`question-slide${i + 1}`}
          className={`carousel-item ${colors.primary.bg} w-full py-2 relative flex-col overflow-y-auto`}
        >
          <div
            className={`w-full h-full center-content flex-col px-4 ${colors.primary.bg}`}
          >
            <h2
              className={`md:text-xl text-lg mr-auto top-2 left-4 font-medium ${colors.primaryRev.violetText}`}
            >
              {`Question ${i + 1}`}
            </h2>
            <h2
              className={`md:text-xl mt-2 text-sm ml-2 mr-2 md:ml-8 md:mr-8 top-10 font-medium ${colors.primaryRev.text}`}
            >
              {item.question}
            </h2>
            <div className="mb-auto w-full h-full center-content flex-col mt-6">
              {item.answers.map((item) => {
                return (
                  <button
                    key={item}
                    data-cy={`button-questions-${i}`}
                    onClick={() => handleQuestionClick(item, i)}
                    className={`w-full mt-6 max-w-sm rounded-lg m-0 p-2 md:text-base ${
                      colors.primary.violetBg
                    } ${colors.primary.text} text-sm ${
                      answers[i].answer !== item &&
                      `hover:opacity-40 opacity-60 transition-all`
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <a href={`#question-slide${i}`}>
              <ChevronLeftIcon
                data-cy="button-previous-slide"
                className={`h-8 w-8 ${colors.primaryRev.violetText} left-0`}
              />
            </a>
            <a href={`#question-slide${i + 2}`}>
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

  function getQuestionnaireSubmissionSlide() {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        id={`question-slide${enrolledStudy.questionnaire.length + 1}`}
        className={`carousel-item ${colors.primary.bg} w-full py-2 relative flex-col overflow-y-auto`}
      >
        <div
          className={`w-full h-full center-content flex-col px-4 ${colors.primary.bg}`}
        >
          <h2
            className={`md:text-xl text-lg mr-auto top-2 left-4 font-medium ${colors.primaryRev.violetText}`}
          >
            {enrolledStudy.name}
          </h2>
          <div className="mb-auto w-full h-full center-content flex-col mt-6"></div>
        </div>
        <div
          className={`w-full h-full center-content flex-col px-4 ${colors.primary.bg}`}
        >
          <StandardButton
            message={"Submit Answers"}
            buttonAllowance={() => !isSubmitDisabled()}
            dataCy={"button-submit-answers"}
            handleClick={() => setSubmitOverlay(true)}
            extraClasses={`w-full mt-6 m-0 p-2 rounded-md mb-auto ${
              isSubmitDisabled() && colors.masked.bg
            }`}
            colors={colors}
          />
        </div>
        <div className="flex justify-between mt-6">
          <a href={`#question-slide${enrolledStudy.questionnaire.length}`}>
            <ChevronLeftIcon
              data-cy="button-previous-slide"
              className={`h-8 w-8 ${colors.primaryRev.violetText} left-0`}
            />
          </a>
          <a href={`#question-slide0`}>
            <ChevronRightIcon
              data-cy="button-next-slide"
              className={`h-8 w-8 ${colors.primaryRev.violetText}`}
            />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full center-content`}>
      <div className="absolute w-full flex flex-col p-4 top-0">
        <button
          data-cy="button-close-questionnaire"
          onClick={() => setQuestionnaireDisplayOpen(false)}
          className="center-content flex-row mr-auto"
        >
          <ChevronLeftIcon
            className={`h-6 w-6 cursor-pointer ${colors.primaryRev.text}`}
          />
          <p className={`${colors.primaryRev.text}`}>Show Less</p>
        </button>
      </div>
      <div
        data-cy="overlay-questionnaire-slides"
        className="w-full h-full mx-10 py-12 md:mx-16 md:py-16 carousel"
      >
        {getQuestionnaireIntroductionSlide()}
        {getQuestionSlides()}
        {getQuestionnaireSubmissionSlide()}
      </div>
      <PromptOverlay
        open={submitOverlay}
        setOpen={setSubmitOverlay}
        handleSubmit={() => handleSubmit()}
        title={enrolledStudy.name}
        prompt={"These answers will be submitted and recorded."}
        requiresNotifications={false}
        report={false}
        buttonPrompt={"Submit"}
        colors={colors}
      />
    </div>
  );
}

export default QuestionnaireAnswerDisplay;

// save answers
// message about why answering questionnaire is important
// add submit button
