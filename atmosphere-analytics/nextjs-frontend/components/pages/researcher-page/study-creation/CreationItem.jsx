import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function CreationItem({
  inputs,
  isNonMobile,
  handleBlur,
  handleChange,
  muiColors,
}) {
  return (
    <Box
      display="flex"
      gap="30px"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        "& > div": {
          gridColumn: isNonMobile ? undefined : "span 4",
        },
      }}
    >
      {inputs.map((input) => {
        return (
          <TextField
            key={input.label}
            data-cy={input.dataCy}
            fullWidth
            variant="filled"
            type="text"
            label={input.label}
            onBlur={handleBlur}
            onChange={handleChange}
            value={input.value}
            name={input.name}
            error={!!input.touch && !!input.error}
            helperText={input.touch && input.error}
            InputLabelProps={{
              style: {
                color: muiColors.primaryRev.violetText,
                borderColor: "red",
              },
            }}
            sx={{
              gridColumn: "span 4",
              input: { color: muiColors.primaryRev.text },
            }}
          />
        );
      })}
    </Box>
  );
}

export default CreationItem;
