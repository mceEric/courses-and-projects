import {
  ChevronLeftIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { InfluxDB } from "@influxdata/influxdb-client";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import StandardToggle from "../buttons/StandardToggle";
import StandardDropdown from "../dropdown/StandardDropdown";
import OverlayAnimationFade from "../overlays/animations/OverlayAnimationFade";
import GraphResponsiveLine from "./GraphResponsiveLine";

function GraphTop({
  colors,
  locationPermission,
  airSensorId,
  setData,
  extraClasses,
  country,
}) {
  const [open, setOpen] = useState(false);
  const [isCountry, setIsCountry] = useState(false);
  const [influxData, setInfluxData] = useState(null);
  const [timeRange, setTimeRange] = useState("6h");
  const [windowPeriod, setWindowPeriod] = useState("5m");
  const [currentQuery, setCurrentQuery] = useState("");

  const queryApi = new InfluxDB({
    url: process.env.NEXT_PUBLIC_INFLUX_URL,
    token: process.env.NEXT_PUBLIC_INFLUX_TOKEN,
  }).getQueryApi({
    org: process.env.NEXT_PUBLIC_INFLUX_ORG,
  });

  useEffect(() => {
    async function collectRows() {
      const fluxQuery = await getFluxQuery();
      if (fluxQuery !== currentQuery) {
        setInfluxData(null);
        const rows = await queryApi.collectRows(fluxQuery);
        setInfluxData(rows);
        setCurrentQuery(fluxQuery);
      }
    }
    if (open === false) {
      collectRows();
    }
  }, [open]);

  const windowPeriodOptions = [
    { label: "5 Minutes", value: "5m" },
    { label: "15 Minutes", value: "15m" },
    { label: "30 Minutes", value: "30m" },
    { label: "1 Hours", value: "1h" },
    { label: "4 Hours", value: "4h" },
    { label: "12 Hours", value: "12h" },
    { label: "1 day", value: "1d" },
  ];

  const timeRangeOptions = [
    { label: "6 Hours", value: "6h" },
    { label: "1 Day", value: "1d" },
    { label: "1 Week", value: "1w" },
    { label: "1 Month", value: "30d" },
  ];

  // Gets options for the window period dropdown based on which time range is chosen
  function getWindowPeriodOptions() {
    let i = timeRangeOptions.findIndex((item) => item.value === timeRange);

    switch (i) {
      case 0:
        return windowPeriodOptions.slice(0, -2);
      default:
        return windowPeriodOptions;
    }
  }

  // Determines whether the grapg should have points or not
  function usePoints() {
    let timeIndex = timeRangeOptions.findIndex(
      (item) => item.value === timeRange
    );
    let windowIndex = windowPeriodOptions.findIndex(
      (item) => item.value === windowPeriod
    );

    switch (timeIndex) {
      case 0:
        return true;
      case 1:
        return windowIndex > 1;
      case 2:
        return windowIndex > 2;
      case 3:
        return windowIndex > 3;
    }
  }

  const gradientColor =
    colors.primary.bg === "bg-white"
      ? "from-violet-400 to-violet-700"
      : "from-violet-300 to-violet-500";

  // Retrieves necessarry flux query based on which device(s) a user has been assigned
  async function getFluxQuery() {
    if (locationPermission === "granted") {
      if (!isNaN(airSensorId) && isCountry === false) {
        return `from(bucket: "data-sensors")
    |> range(start: -${timeRange})
    |> filter(fn: (r) => r._measurement == "airquality")
    |> filter(fn: (r) => r._field == "value")
    |> filter(fn: (r) => r.id == "${airSensorId}")
    |> map(fn:(r) => ({_value: float(v: r._value), _time: r._time}))
    |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)`;
      }
    }
    return `from(bucket: "data-sensors")
    |> range(start: -${timeRange})
    |> filter(fn: (r) => r._measurement == "airquality")
    |> filter(fn: (r) => r._field == "value")
    |> filter(fn: (r) => r.country_code == "${
      !isCountry ? airSensorId : country
    }")
    |> group(columns: ["_time"])
    |> group(columns: ["id", "_time", "_value"], mode: "except")
    |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)`;
  }

  // Formats data to supply to graph
  function getGraphData() {
    return [
      {
        id: "Air Quality",
        serieId: "Air Quality",
        data: influxData.map((row) => {
          const time = new Date(row._time);
          return {
            y: row._value,
            x: time,
            yStacked: row._value,
            xStacked: time,
            yFormatted: row._value,
            xFormatted: time,
          };
        }),
      },
    ];
  }

  return (
    <div
      data-cy="graph-top"
      className={`${extraClasses} relative w-full bg-gradient-to-br center-content m-0 p-0 ${gradientColor}`}
    >
      {influxData ? (
        <GraphResponsiveLine
          data={getGraphData()}
          textColor={
            colors.primaryRev.text !== "text-white" ? "white" : "#212121"
          }
          background={"transparent"}
          colors={colors}
          timeRange={timeRange}
          points={usePoints()}
        />
      ) : (
        <Oval
          height={100}
          width={100}
          color="#6D28D9"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="white"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      <div className="absolute w-full flex flex-col p-4 top-0">
        <button
          data-cy="button-show-less"
          onClick={() => setData(null)}
          className="center-content flex-row mr-auto"
        >
          <ChevronLeftIcon
            className={`h-6 w-6 cursor-pointer ${colors.primary.text}`}
          />
          <p className={`${colors.primary.text}`}>Show Less</p>
        </button>
      </div>
      <div className="absolute m-auto top-2 center-content flex-col">
        <h2 className={`${colors.primary.violetText}`}>
          {country && `${country}`}
          {country && !isCountry && ": "}
          {!isCountry && `${airSensorId}`}
        </h2>
        <h2 className={`${colors.primary.violetText}`}>PM2.5</h2>
        <p className={`text-2xl ${colors.primary.text}`}>
          {influxData &&
            getGraphData()[0].data[getGraphData()[0].data.length - 1]
              .yFormatted}
        </p>
      </div>
      <Cog6ToothIcon
        data-cy="button-graph-settings"
        onClick={() => setOpen(true)}
        className={`absolute top-4 cursor-pointer right-4 w-8 h-8 transition-all ${
          colors.primary.text
        } ${open && "rotate-180"}`}
      />
      <OverlayAnimationFade
        open={open}
        setOpen={setOpen}
        handleClick={() => setOpen(false)}
        component={
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative center-content flex-col max-w-[80%] py-16 px-10 ${
              colors.primary.bg
            } ${country && "pb-0"}`}
          >
            <XMarkIcon
              data-cy="button-close-graph-settings"
              onClick={() => setOpen(false)}
              className={`absolute top-4 cursor-pointer right-4 w-8 h-8 transition-all ${colors.primaryRev.text}`}
            />
            <div className="w-full mr-auto center-content flex-row">
              <StandardDropdown
                dataCy={"dropdown-window-period"}
                title={"Window Period"}
                value={windowPeriod}
                setValue={setWindowPeriod}
                options={getWindowPeriodOptions()}
                extraClasses={"m-2"}
                colors={colors}
              />
              <p
                className={`text-lg font-medium ${colors.primaryRev.violetText}`}
              >
                {windowPeriod}
              </p>
            </div>
            <div
              className={`w-full mr-auto center-content flex-row ${
                country && "mb-24"
              }`}
            >
              <StandardDropdown
                dataCy={"dropdown-time-range"}
                title={"Time Range"}
                value={timeRange}
                setValue={setTimeRange}
                options={timeRangeOptions}
                extraClasses={"m-2"}
                colors={colors}
              />
              <p
                className={`text-lg font-medium ${colors.primaryRev.violetText}`}
              >
                {timeRange}
              </p>
            </div>
            {country && (
              <div className="center-content absolute bottom-0 m-0 left-0 flex-col">
                <h2
                  className={`${colors.primaryRev.violetText} font-medium text-xs ml-6`}
                >
                  {isCountry ? "Country" : "Sensor"}
                </h2>
                <StandardToggle
                  message={"Country"}
                  dataCy={"toggle-change-sensor-type"}
                  extraClasses={"ml-6 mb-6 mt-auto"}
                  handleClick={() => setIsCountry(!isCountry)}
                  active={isCountry}
                  colors={colors}
                />
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

export default GraphTop;
