import { ResponsiveBar } from "@nivo/bar";

function StatisticalBars({ bool, muiColors }) {
  const barStatistics = [
    {
      country: "DE",
      DE: 4676,
    },
    {
      country: "NL",
      NL: 1681,
    },
    {
      country: "PL",
      PL: 800,
    },
    {
      country: "BG",
      BG: 740,
    },
    {
      country: "BE",
      BE: 586,
    },
    {
      country: "RU",
      RU: 432,
    },
  ];
  return (
    <ResponsiveBar
      data={barStatistics}
      theme={{
        legend: {
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
        },
        legends: {
          text: {
            fill: muiColors.primaryRev.text,
          },
        },
      }}
      keys={["DE", "NL", "PL", "BG", "BE", "RU"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={[
        muiColors.primaryRev.violetBg,
        muiColors.primaryRev.violetBg,
        muiColors.secondary.violetBg,
        muiColors.secondary.violetBg,
        muiColors.primary.violetBg,
        muiColors.primary.violetBg,
      ]}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: bool ? undefined : "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: bool ? undefined : "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
}

export default StatisticalBars;
