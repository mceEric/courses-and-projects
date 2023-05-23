import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GraphLine from "../../../shared/graphs/GraphLine.jsx";
import SensorHeatMap from "../../../shared/graphs/SensorHeatMap.jsx";
import StatisticalBars from "../../../shared/graphs/StatisticalBars.jsx";
import { useState } from "react";
import BoxItem from "./BoxItem.jsx";
import QuestionnaireSubmissions from "./QuestionnaireSubmissions.jsx";

function StudyDashboard({ muiColors, setStudyResults, studyResults }) {
  const [lineStats, setLineStats] = useState(false);

  // Correctly formats line stats based on study results
  if (studyResults && !lineStats) {
    let newArr = [];
    let newObj = {};

    for (var i = 0; i < studyResults.study.questionnaire.length; i++) {
      newArr.push(studyResults.study.questionnaire[i].answers);
      newObj[studyResults.study.questionnaire[i].question] = 0;
    }

    for (var i = 0; i < studyResults.results.length; i++) {
      for (var j = 0; j < studyResults.results[i].answers.length; j++) {
        newObj[studyResults.study.questionnaire[j].question] =
          newObj[studyResults.study.questionnaire[j].question] +
          newArr[j].indexOf(studyResults.results[i].answers[j].answer);
      }
    }
    setLineStats(newObj);
  }

  return (
    <Box data-cy="study-dashboard" m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* First Row Boxes*/}
        {studyResults && (
          <BoxItem
            studyResults={studyResults}
            message={studyResults.results.length}
            submessage="Questionnaire Submissions"
            muiColors={muiColors}
            icon={
              <QuestionAnswer
                sx={{
                  color: muiColors.primaryRev.violetText,
                  fontSize: "26px",
                }}
              />
            }
          />
        )}
        {studyResults && (
          <BoxItem
            studyResults={studyResults}
            message={studyResults.participants.length}
            submessage="Enrolled Participants"
            muiColors={muiColors}
            icon={
              <PersonAddIcon
                sx={{
                  color: muiColors.primaryRev.violetText,
                  fontSize: "26px",
                }}
              />
            }
          />
        )}
        {/* Second Row Boxes */}
        {studyResults && (
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={muiColors.primary.bg}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            ></Box>
            <Box height="96%" m="-20px 0 0 0">
              <GraphLine
                bool={true}
                lineStats={lineStats}
                studyResults={studyResults}
                muiColors={muiColors}
              />
            </Box>
          </Box>
        )}
        <QuestionnaireSubmissions
          muiColors={muiColors}
          studyResults={studyResults}
        />

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={muiColors.primary.bg}
        >
          <Typography
            color={muiColors.primaryRev.text}
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sensor Dispersion
          </Typography>
          <Box height="250px" mt="-20px">
            <StatisticalBars bool={true} muiColors={muiColors} />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={muiColors.primary.bg}
          padding="30px"
        >
          <Typography
            color={muiColors.primaryRev.text}
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Sensor Heat Map
          </Typography>
          <Box height="200px">
            <SensorHeatMap bool={true} muiColors={muiColors} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default StudyDashboard;
