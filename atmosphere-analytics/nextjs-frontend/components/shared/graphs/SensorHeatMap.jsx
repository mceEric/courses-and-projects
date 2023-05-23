import { ResponsiveChoropleth } from "@nivo/geo";
import { getGeoComponents } from "../../../utils/getGeoComponents";
import { getCountrySensorData } from "../../../utils/getCountrySensorData";

function SensorHeatMap({ bool, muiColors }) {
  return (
    <ResponsiveChoropleth
      data={getCountrySensorData()}
      features={getGeoComponents().features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 500]}
      unknownColor={muiColors.primary.violetBg}
      label="properties.name"
      valueFormat=".2s"
      projectionScale={!bool ? 40 : 80}
      projectionTranslation={bool ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor={muiColors.primary.text}
      colors={[
        muiColors.primary.violetBg,
        muiColors.secondary.violetBg,
        muiColors.primaryRev.violetBg,
      ]}
      legends={
        !bool
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: muiColors.primaryRev.text,
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
}

export default SensorHeatMap;
