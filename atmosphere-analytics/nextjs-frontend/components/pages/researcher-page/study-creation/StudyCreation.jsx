import Box from "@mui/material/Box";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import StandardDropdown from "../../../shared/dropdown/StandardDropdown";
import { useState } from "react";
import StandardButton from "../../../shared/buttons/StandardButton";
import { getQuestionnaireOptions } from "../../../../utils/getQuestionnaireOptions";
import { createStudy } from "../../../../services/StudyService";
import AuthReport from "../../../shared/reports/AuthReport";
import CreationItem from "./CreationItem";

function StudyCreation({ user, setUser, colors, muiColors }) {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [frequency, setFrequency] = useState("1d");
  const [questionnaire, setQuestionnaire] = useState(
    getQuestionnaireOptions()[0].value
  );
  const [report, setReport] = useState(null);

  const frequencyOptions = [
    { label: "1 Day", value: "1d" },
    { label: "1 Week", value: "1w" },
    { label: " 2 Weeks", value: "2w" },
    { label: "1 Month", value: "30d" },
  ];

  const questionnaireOptions = getQuestionnaireOptions();

  // Submits request to create study
  async function handleSubmit(values) {
    console.log(frequency, questionnaire);
    const jwt = localStorage.getItem("researcher-jwt");

    let study = values;
    study.frequency = frequency;
    study.questionnaire = questionnaire;

    const res = await createStudy(study, jwt);
    if (res.statusCode === 409) {
      setReport({
        title: res.message,
        error: true,
      });
      return;
    }
    setUser(res);
  }

  return (
    <div
      data-cy="study-creation"
      className="center-content flex-col h-full p-6 overflow-x-hidden"
    >
      <h1
        className={`text-3xl font-medium mb-16 self-start ${colors.primaryRev.text}`}
      >
        {!user.createdStudy
          ? "Study Creation"
          : "You can only create one study at a time"}
      </h1>
      {!user.createdStudy && (
        <Formik
          onSubmit={(e) => e.preventDefault()}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => {
            const inputs = [
              {
                label: "Name",
                name: "name",
                value: values.name,
                error: errors.name,
                touch: touched.name,
                dataCy: "input-name",
              },
              {
                label: "ShortName",
                name: "shortName",
                value: values.shortName,
                error: errors.shortName,
                touch: touched.shortName,
                dataCy: "input-short-name",
              },
              {
                label: "Description",
                name: "description",
                value: values.description,
                error: errors.description,
                touch: touched.description,
                dataCy: "input-description",
              },
              {
                label: "Objective",
                name: "objective",
                value: values.objective,
                error: errors.objective,
                touch: touched.objective,
                dataCy: "input-objective",
              },
            ];

            return (
              <form
                data-cy="study-creation"
                className="w-full"
                onSubmit={handleSubmit}
              >
                <CreationItem
                  inputs={inputs}
                  isNonMobile={isNonMobile}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  muiColors={muiColors}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="end"
                  mt="20px"
                >
                  <div className="w-full flex mr-auto ml-auto">
                    <div className="w-full m-2 mr-auto center-content flex-col">
                      <p
                        className={`text-lg font-medium ${colors.primaryRev.violetText}`}
                      >
                        {frequency}
                      </p>
                      <StandardDropdown
                        dataCy={"dropdown-time-range"}
                        title={"Frequency"}
                        value={frequency}
                        setValue={setFrequency}
                        options={frequencyOptions}
                        extraClasses={"mx-2 flex-auto"}
                        colors={colors}
                      />
                    </div>
                    <div className="w-full m-2 mr-auto center-content flex-col">
                      <p
                        className={`text-lg font-medium ${colors.primaryRev.violetText}`}
                      >
                        {getQuestionnaireOptions().map((item) => {
                          if (
                            JSON.stringify(item.value) ===
                            JSON.stringify(questionnaire)
                          )
                            return item.label;
                        })}
                      </p>
                      <StandardDropdown
                        dataCy={"dropdown-window-period"}
                        title={"Questionnaire"}
                        value={questionnaire}
                        setValue={setQuestionnaire}
                        options={questionnaireOptions}
                        extraClasses={"mx-2 flex-auto"}
                        colors={colors}
                      />
                    </div>
                  </div>
                  {report && (
                    <AuthReport
                      dataCy="item-auth-report"
                      report={report.title}
                      error={report.error}
                    />
                  )}
                  <StandardButton
                    buttonAllowance={() =>
                      values.name !== "" &&
                      values.description !== "" &&
                      values.description !== "" &&
                      values.objective !== ""
                    }
                    message="Create New Study"
                    dataCy="button-create-new-study"
                    handleClick={() => handleSubmit(values)}
                    extraClasses={`w-full mt-6 m-0 p-2 rounded-lg ml-auto mr-auto`}
                    colors={colors}
                    studyCreation={true}
                  />
                </Box>
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  shortName: yup.string().required("required"),
  description: yup.string().required("required"),
  objective: yup.string().required("required"),
  frequency: yup.string().required("required"),
  questionnaire: yup.string().required("required"),
});
const initialValues = {
  name: "",
  shortName: "",
  description: "",
  objective: "",
  frequency: "",
  questionnaire: "",
};

export default StudyCreation;
