import { ResponsiveLine } from "@nivo/line";

function GraphResponsiveLine({
  data,
  textColor,
  background,
  colors,
  timeRange,
  points,
}) {
  function getTimeFormat() {
    switch (timeRange) {
      case "6h":
        return "%H:%M";
      case "1d":
        return "%H:%M";
      case "1w":
        return "%d/%H";
      case "30d":
        return "%d/%H";
    }
  }

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 120, right: 50, bottom: 40, left: 50 }}
      xScale={{
        type: "time",
        format: getTimeFormat(),
        precision: "minute",
        clamp: true,
      }}
      xFormat={`time:${getTimeFormat()}`}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
        clamp: true,
      }}
      theme={{
        background,
        textColor,
      }}
      enableArea={false}
      yFormat=" >-.2f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        format: getTimeFormat(),
        tickRotation: 90,
      }} //
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      colors={[textColor]}
      enablePoints={points}
      pointSize={3}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      motionConfig="default"
      tooltip={({ point }) => {
        return (
          <div
            className={`absolute center-content flex-col box-border ${
              colors.secondary.bg
            } ${
              (data[0].data.length / 100) * 50 <= point.index && "right-0"
            } p-2 px-6 rounded-lg`}
          >
            <p
              className={`font-medium whitespace-nowrap mb-4 ${colors.primaryRev.text}`}
            >
              Date:
              {" " +
                (point.data.x.getDate() < 10
                  ? "0" + point.data.x.getDate()
                  : point.data.x.getDate()) +
                "/" +
                (point.data.x.getMonth() < 10
                  ? "0" + (parseInt(point.data.x.getMonth(), 10) + 1 + "")
                  : parseInt(point.data.x.getMonth(), 10) + 1 + "") +
                "/" +
                point.data.x.getHours() +
                ":" +
                (point.data.x.getMinutes() < 10
                  ? "0" + point.data.x.getMinutes()
                  : point.data.x.getMinutes())}
            </p>
            <p
              className={`font-medium whitespace-nowrap ${colors.primaryRev.text}`}
            >
              PM2.5: {point.data.yFormatted}
            </p>
          </div>
        );
      }}
    />
  );
}

export default GraphResponsiveLine;
