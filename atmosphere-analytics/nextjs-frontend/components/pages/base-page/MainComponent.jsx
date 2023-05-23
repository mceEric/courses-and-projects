import { MarkerClustererF, MarkerF } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { getGroupedSensors } from "../../../services/AirSensorService";
import MapPage from "../participant-page/map-page/MapPage";
import Settings from "../participant-page/settings-page/Settings";
import AllStudiesPage from "../participant-page/studies/all-studies-page/AllStudiesPage";
import EnrolledStudiesPage from "../participant-page/studies/enrolled-studies-page/EnrolledStudiesPage";
import BasePage from "./BasePage";
import StudyCreation from "../researcher-page/study-creation/StudyCreation";
import { getMuiColors } from "../../../utils/getColor";
import StudyParticipants from "../researcher-page/study-participants/StudyParticipants";
import StudyDashboard from "../researcher-page/study-dashboard/StudyDashboard";
import { getStudyResults } from "../../../services/StudyService";

function MainComponent({
  user,
  setUser,
  isParticipant,
  sidebarItems,
  locationPermission,
  setLocationPermission,
}) {
  const [currentComponent, setCurrentComponent] = useState(sidebarItems[0]);
  const [sensors, setSensors] = useState(null);
  const [studyResults, setStudyResults] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkmode") ? true : false
  );
  const [open, setOpen] = useState(false);

  // Correctly stores darkmode option into local storage when necessarry
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkmode", true);
    } else {
      localStorage.removeItem("darkmode");
    }
  }, [darkMode]);

  // Gets necessarry data depending on user type
  useEffect(() => {
    async function getSensors() {
      const jwt = localStorage.getItem("participant-jwt");
      const data = await getGroupedSensors(jwt);
      data.map;
      setSensors(data);
    }

    async function getResults() {
      const res = await getStudyResults(user.createdStudy._id);

      setStudyResults(res);
    }

    if (sensors === null && isParticipant) {
      getSensors();
    } else if (!isParticipant && user.createdStudy) {
      getResults();
    }
  }, []);

  // Gets researcher results each time they make a request which changes their data object
  useEffect(() => {
    async function getResults() {
      const res = await getStudyResults(user.createdStudy._id);

      setStudyResults(res);
    }

    if (!isParticipant && user.createdStudy) {
      getResults();
    }
  }, [user]);

  // Clusters markers based on country grouped sensor object 
  const markers = isParticipant
    ? useMemo(() => {
        if (sensors !== null) {
          return Object.keys(sensors).map((key) => {
            return (
              <MarkerClustererF kezzzy={key}>
                {(clusterer) =>
                  sensors[key].map((sensor) => {
                    return (
                      <MarkerF
                        data-cy={`marker-sensor-${sensor.id}`}
                        key={sensor.id}
                        noClustererRedraw={true}
                        clusterer={clusterer}
                        position={{
                          lat: sensor.lat,
                          lng: sensor.lng,
                        }}
                        onClick={() => setOpen(sensor)}
                      />
                    );
                  })
                }
              </MarkerClustererF>
            );
          });
        }
      }, [sensors])
    : [];

  const colors = {
    primary: {
      bg: darkMode ? "bg-[#212121]" : "bg-white",
      text: darkMode ? "text-[#212121]" : "text-white",
      hover: darkMode ? "hover:text-white" : "hover:text-[#212121]",
      violetBg: darkMode ? "bg-violet-300" : "bg-violet-700",
      violetText: darkMode ? "text-violet-700" : "text-violet-300",
      violetHover: darkMode
        ? "group-hover:text-violet-300"
        : "group-hover:text-violet-700",
    },

    primaryRev: {
      bg: !darkMode ? "bg-[#212121]" : "bg-white",
      text: !darkMode ? "text-[#212121]" : "text-white",
      hover: !darkMode ? "hover:text-white" : "hover:text-[#212121]",
      violetBg: !darkMode ? "bg-violet-300" : "bg-violet-700",
      violetText: !darkMode ? "text-violet-700" : "text-violet-300",
      violetHover: !darkMode
        ? "group-hover:text-violet-300"
        : "group-hover:text-violet-700",
    },

    secondary: {
      bg: darkMode ? "bg-[#2f2b30]" : "bg-violet-50",
      text: darkMode ? "text-[#2f2b30]" : "text-violet-50",
      violetBg: darkMode ? "bg-violet-200" : "bg-violet-500",
      violetText: darkMode ? "text-violet-500" : "text-violet-200",
      violetHover: darkMode
        ? "group-hover:text-violet-200"
        : "group-hover:text-violet-500",
    },

    gray: {
      bg: darkMode ? "bg-gray-400" : "bg-gray-500",
      text: darkMode ? "text-gray-400" : "text-gray-500",
    },

    masked: {
      bg: !darkMode ? "bg-black/10" : "bg-black/40",
      text: !darkMode ? "text-gray-100" : "text-gray-600",
    },
  };

  const muiColors = getMuiColors(darkMode);

  function getComponent() {
    switch (currentComponent.name) {
      case "Dashboard":
        return (
          <MapPage
            colors={colors}
            darkMode={darkMode}
            markers={markers}
            sensors={sensors}
            open={open}
            setOpen={setOpen}
          />
        );
      case "Enrolled Studies":
        return (
          <EnrolledStudiesPage
            user={user}
            setUser={setUser}
            locationPermission={locationPermission}
            setLocationPermission={setLocationPermission}
            colors={colors}
          />
        );
      case "All Studies":
        return <AllStudiesPage user={user} setUser={setUser} colors={colors} />;
      case "Study Participants":
        return (
          <StudyParticipants
            user={user}
            muiColors={muiColors}
            setStudyResults={setStudyResults}
            studyResults={studyResults}
          />
        );
      case "Study Creation":
        return (
          <StudyCreation
            user={user}
            setUser={setUser}
            colors={colors}
            muiColors={muiColors}
            setStudyResults={setStudyResults}
            studyResults={studyResults}
          />
        );
      case "Study Dashboard":
        return (
          <StudyDashboard
            setStudyResults={setStudyResults}
            studyResults={studyResults}
            user={user}
            setUser={setUser}
            muiColors={muiColors}
          />
        );
      default:
        return (
          <Settings
            setUser={setUser}
            isParticipant={isParticipant}
            locationPermission={locationPermission}
            setLocationPermission={setLocationPermission}
            colors={colors}
          />
        );
    }
  }

  return (
    <div data-cy="main-component" className="w-full h-full">
      <BasePage
        getComponent={getComponent}
        currentComponent={currentComponent}
        setCurrentComponent={setCurrentComponent}
        sidebarItems={sidebarItems}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        colors={colors}
      />
    </div>
  );
}

export default MainComponent;
