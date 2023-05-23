import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainComponent from "../../components/pages/base-page/MainComponent";
import {
  handleLogout,
  jwtVerification,
} from "../../services/AuthenicationService";
import {
  HomeIcon,
  FolderIcon,
  Cog6ToothIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import {
  getOneSignalUserId,
  oneSignalInitialisation,
} from "../../services/NotificationService";
import { updateById } from "../../services/ParticipantService";
import { Oval } from "react-loader-spinner";
import { getClosestSensor } from "../../services/AirSensorService";
import axios from "axios";
import { createCheck, deleteCheck } from "../../services/InfluxDBService";

export default function dashboard() {
  const [user, setUser] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const router = useRouter();


  //Checks if a participant has a valid jwt within local storage, performs respective actions based on result
  useEffect(() => {
    const fetchUpdates = async () => {
      const jwt = localStorage.getItem("participant-jwt");
      let objToChange = {};
      if (!jwt) {
        router.push("/participant");
      }
      const res = await jwtVerification(jwt, true);
      if (!res.user) {
        handleLogout(true);
        router.push("/participant");
        return;
      }
      setUser(res.user);
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          await oneSignalInitialisation();
          const notificationToken = await getOneSignalUserId();
          if (
            res.user.notificationToken !== notificationToken &&
            notificationToken !== null
          ) {
            objToChange = { ...objToChange, notificationToken };
          }
        } else if (res.user.notificationToken !== null) {
          if (res.user.enrolledStudies.length > 0) {
            await deleteCheck(jwt);
          }
          objToChange = { ...objToChange, notificationToken: null };
        }
      }
      const permission = await getLocationPermission();
      setLocationPermission(permission);
      if (permission === "denied" || permission === "prompt") {
        const ipData = await axios.get("https://ipapi.co/json/");
        const countryCode = ipData.data.country_code;

        if ("Notification" in window) {
          if (
            Notification.permission === "granted" &&
            res.user.enrolledStudies.length > 0
          ) {
            await createCheck(
              countryCode,
              res.user.enrolledStudies[0].frequency,
              res.user.pm,
              jwt
            );
          }

          objToChange = { ...objToChange, airSensorId: countryCode };
        }
      } else {
        await getUsersClosestSensor(jwt, res.user.airSensorId);
      }
      const newRes = await updateById(objToChange, jwt);
      if (newRes.statusCode === 401) {
        userLogout();
        router.push("/participant");
        return;
      }
      setUser(newRes);
    };

    fetchUpdates();
  }, []);

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      current: true,
      dataCy: "navigation-dashboard",
    },
    {
      name: "Enrolled Studies",
      icon: FolderIcon,
      current: false,
      dataCy: "navigation-enrolled-studies",
    },
    {
      name: "All Studies",
      icon: FolderOpenIcon,
      current: false,
      dataCy: "navigation-all-studies",
    },
    {
      name: "Settings",
      icon: Cog6ToothIcon,
      current: false,
      dataCy: "navigation-settings",
    },
  ];

  async function getLocationPermission() {
    const permission = await navigator.permissions
      .query({ name: "geolocation" })
      .then((res) => {
        return res.state;
      });
    return permission;
  }

  async function getUsersClosestSensor(jwt, currentSensorId) {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      const res = await getClosestSensor(latitude, longitude, jwt);
      if (res.statusCode === 401) {
        userLogout();
        router.push("/participant");
        return;
      }
      if (res.airSensorId !== currentSensorId) {
        if ("Notification" in window) {
          if (
            Notification.permission === "granted" &&
            res.enrolledStudies.length > 0
          ) {
            await createCheck(
              res.airSensorId,
              res.enrolledStudies[0].frequency,
              res.pm,
              jwt
            );
          }
        }
        setUser(res);
      }
    });
  }

  return (
    <div className="w-screen h-screen center-content overflow-x-hidden">
      {user ? (
        <MainComponent
          user={user}
          setUser={setUser}
          isParticipant={true}
          sidebarItems={sidebarItems}
          locationPermission={locationPermission}
          setLocationPermission={setLocationPermission}
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
    </div>
  );
}
