import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function StudyParticipants({ user, studyResults, muiColors }) {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "pm",
      headerName: "Current PM",
      flex: 1,
    },
    {
      field: "iot",
      headerName: "Device",
      flex: 1,
    },
  ];

  var participantsData = [];
  if (studyResults.participants && studyResults.participants.length) {
    participantsData = studyResults.participants.map((participant) => {
      return {
        id: participant._id,
        name: `${participant.firstName} ${participant.lastName}`,
        email: participant.username,
        pm: participant.pm,
        iot: participant.airSensorId,
      };
    });
  }

  return (
    <div data-cy="study-participants" className="w-full h-full center-content p-4 flex-col">
      {studyResults.participants ? (
        studyResults.participants.length > 0 ? (
          <Box
            m="40px 0 0 0"
            height="85vh"
            width="80%"
            sx={{
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: muiColors.primary.violetBg,
                color: muiColors.secondary.text,
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: muiColors.primary.bg,
                color: muiColors.primaryRev.text,
              },
              "& .MuiCheckbox-root": {
                color: muiColors.secondary.text,
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: muiColors.primary.violetBg,
                borderBottom: "none",
                color: muiColors.primary.text,
              },
              "& .name-column--cell": {
                color: muiColors.primaryRev.violetText,
              },
            }}
          >
            <DataGrid
              rows={participantsData}
              columns={columns}
              hideFooterPagination
            />
          </Box>
        ) : (
          <h1
            className={`text-2xl `}
            style={{ color: muiColors.primaryRev.text }}
          >
            No participants are currently enrolled within your study
          </h1>
        )
      ) : (
        <h1 className={`text-2xl`} style={{ color: muiColors.primaryRev.text }}>
          You have not created a study yet
        </h1>
      )}
    </div>
  );
}

export default StudyParticipants;
