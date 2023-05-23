import { ResponsiveLine } from "@nivo/line";

function GraphLine({ bool, lineStats, studyResults, muiColors }) {

  const averageResults =
    studyResults.results.length > 0
      ? Object.keys(lineStats).map((key, i) => {
          return {
            x: `Question ${i + 1}`,
            y: Math.round(lineStats[key] / studyResults.results.length),
          };
        })
      : [];

  const averageData = [
    {
      id: "Average Questionnaire Results",
      data: averageResults,
    },
  ];

  return (
    <ResponsiveLine
      data={averageData}
      theme={{
        legends: {
          text: {
            fill: muiColors.primaryRev.text,
          },
        },
        axis: {
          domain: {
            line: {
              stroke: muiColors.primaryRev.text,
            },
          },
          ticks: {
            line: {
              stroke: muiColors.primaryRev.text,
              strokeWidth: 1,
            },
            text: {
              fill: muiColors.primaryRev.text,
            },
          },
          legend: {
            text: {
              fill: muiColors.primaryRev.text,
            },
          },
        },
      }}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: bool ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        legendOffset: -40,
        legendPosition: "middle",
        tickSize: 1,
        tickPadding: 5,
        tickValues: 5,
        tickRotation: 0,
        orient: "left",
      }}
      colors={[muiColors.primaryRev.violetText]}
      margin={{ top: 10, right: 60, bottom: 20, left: 40 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: studyResults.study.questionnaire[0].answers.length,
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      enableGridX={false}
      enableGridY={false}
      pointSize={6}
      pointBorderWidth={2}
      useMesh={true}
      legends={[
        {
          translateY: 0,
          anchor: "top-left",
          itemOpacity: 0.75,
          symbolSize: 12,
          direction: "column",
          justify: false,
          symbolShape: "circle",
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          translateX: 100,
          itemHeight: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

export default GraphLine;
