import Box from "@mui/material/Box";
import InfoCard from "../../../shared/graphs/InfoCard";

function BoxItem({ icon, muiColors, studyResults, submessage, message }) {
  return (
    <Box
      gridColumn="span 6"
      backgroundColor={muiColors.primary.bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <InfoCard
        message={message}
        submessage={submessage}
        sx={{ color: muiColors.primaryRev.text }}
        muiColors={muiColors}
        icon={icon}
      />
    </Box>
  );
}

export default BoxItem;
