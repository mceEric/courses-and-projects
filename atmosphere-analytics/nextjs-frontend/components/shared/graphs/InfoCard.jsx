import { Box, Typography } from "@mui/material";

function InfoCard({ message, submessage, icon, muiColors }) {

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: muiColors.primaryRev.text }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: muiColors.primaryRev.violetText }}>
          {submessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoCard;