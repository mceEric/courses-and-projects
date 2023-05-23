import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function QuestionnaireSubmissions({ muiColors, studyResults }) {

  // Gets string version of result evaluated consensus
  function getResultConsensus(number) {
    switch (number) {
      case 0:
        return "Very Bad";
      case 1:
        return "Bad";
      case 2:
        return "Neutral";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
    }
  }

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={muiColors.primary.bg}
      overflow="auto"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${muiColors.primaryRev.text}`}
        colors={muiColors.primaryRev.text}
        p="15px"
      >
        <Typography
          color={muiColors.primaryRev.text}
          variant="h5"
          fontWeight="600"
        >
          Questionnaire Submissions
        </Typography>
      </Box>
      {studyResults &&
        studyResults.results.map((result, i) => (
          <Box
            key={result._id}
            display="flex"
            borderBottom={`4px solid ${muiColors.primaryRev.text}`}
            alignItems="center"
            justifyContent="space-between"
            p="15px"
          >
            <Box>
              <Typography
                color={muiColors.primary.violetBg}
                variant="h5"
                fontWeight="600"
              >
                {result.participant.firstName}
              </Typography>
              <Typography color={muiColors.primaryRev.text}>
                {result.participant.airSensorId}
              </Typography>
            </Box>
            <Box color={muiColors.primaryRev.text}>
              {result.date.split("T")[0]}
            </Box>
            <Box
              color={muiColors.primary.text}
              backgroundColor={muiColors.primary.violetBg}
              p="5px 10px"
              borderRadius="4px"
            >
              {getResultConsensus(result.index)}
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default QuestionnaireSubmissions;
