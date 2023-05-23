import { useRouter } from "next/router";
import { handleLogout } from "../../../../services/AuthenicationService";
import StandardButton from "../../../shared/buttons/StandardButton";
import { notificationSubscription } from "../../../../services/NotificationService";
import { useState } from "react";
import MessageOverlay from "../../../shared/overlays/MessageOverlay";
import { getClosestSensor } from "../../../../services/AirSensorService";
import OverlayAnimationFade from "../../../shared/overlays/animations/OverlayAnimationFade";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Settings({
  setUser,
  isParticipant,
  locationPermission,
  setLocationPermission,
  colors,
}) {
  const [messageOverlay, setMessageOverlay] = useState(false);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [overlayContent, setOverlayContent] = useState(false);
  const router = useRouter();

  //Logs a user out
  function userLogout() {
    if (isParticipant) {
      return [handleLogout(isParticipant), router.push("/participant")];
    }
    return [handleLogout(isParticipant), router.push("/researcher")];
  }

  const helpSteps = [
    {
      step: "Step 1",
      description:
        "Firstly, visit the browser you are currently using or the browser you downloaded this app on and visit our domain.",
    },
    {
      step: "Step 2",
      description:
        "Then, click the lock icon situated on the left side of the address bar. ",
    },
    {
      step: "Step 3",
      description:
        "Now, click the 'Permissions' or 'Website Settings' tab depending on your device OS.",
    },
    {
      step: "Step 4",
      description:
        "You can now reset your permissions by clicking the specific permission buttons.",
    },
  ];

  function getHelpComponent() {
    return (
      <div
        data-cy="overlay-help-steps"
        className="carousel w-[80%] max-w-xl rounded-xl"
      >
        {helpSteps.map((step, i) => {
          return (
            <div
              key={i}
              onClick={(e) => e.stopPropagation()}
              id={`slide${i}`}
              className={`carousel-item ${colors.primary.bg} w-full py-2 relative`}
            >
              <div
                className={`w-full center-content flex-col px-4 mx-12 py-12 ${colors.primary.bg}`}
              >
                <h2
                  className={`absolute text-xl top-2 left-4 font-medium ${colors.primaryRev.text}`}
                >
                  {step.step}
                </h2>
                <XMarkIcon
                  data-cy="button-close-help-steps"
                  onClick={() => setHelpOverlay(false)}
                  className={`absolute top-2 cursor-pointer right-4 w-8 h-8 transition-all ${colors.primaryRev.text}`}
                />
                <p
                  className={`text-md sm:text-lg mr-auto ${colors.primaryRev.text}`}
                >
                  {step.description}
                </p>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${i === 0 ? helpSteps.length - 1 : i - 1}`}>
                  <ChevronLeftIcon
                    data-cy="button-previous-slide"
                    className={`h-8 w-8 ${colors.primaryRev.violetText} absolute left-0`}
                  />
                </a>
                <a href={`#slide${i === helpSteps.length - 1 ? 0 : i + 1}`}>
                  <ChevronRightIcon
                    data-cy="button-next-slide"
                    className={`h-8 w-8 ${colors.primaryRev.violetText}`}
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Performs all necessarry operations to request user for notification permission
  function notificationPermission() {
    if ("Notification" in window) {
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission().then((res) => {
          if (Notification.permission === "granted") {
            subscribeUser();
          }
        });
      } else if (Notification.permission === "denied") {
        setMessageOverlay(true);
        setOverlayContent({
          title: "Push notifications is blocked",
          message:
            "To enable Push notifications, please visit browser settings.",
        });
      } else if (Notification.permission === "granted") {
        setMessageOverlay(true);
        setOverlayContent({
          title: "Push notifications is enabled",
          message:
            "To disable Push notifications, please visit browser settings.",
        });
      }
    } else {
      setMessageOverlay(true);
      setOverlayContent({
        title: "Push notifications is blocked",
        message:
          "Sorry, but push notifications is not an implementable feature for your current OS yet.",
      });
    }
  }

  // Subscribes a user to notifications
  async function subscribeUser() {
    if ("Notification" in window) {
      const res = await notificationSubscription();
      if (res.statusCode === 401) {
        userLogout();
        router.push("/participant");
        return;
      }
      setUser(res);
    }
  }

  // Retrieves current location permission of user
  async function getLocationPermission() {
    const permission = await navigator.permissions
      .query({ name: "geolocation" })
      .then((res) => {
        return res.state;
      });
    return permission;
  }

  // Gets closest sensor to a specific user
  async function getUsersClosestSensor() {
    const jwt = localStorage.getItem("participant-jwt");

    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;

      const res = await getClosestSensor(latitude, longitude, jwt);

      if (res.statusCode === 401) {
        userLogout();
        router.push("/participant");
        return;
      }
      setUser(res);
    });
  }

  // Performs all necessarry operations to request user for location permission
  async function requestLocationPermission() {
    if (locationPermission === "granted" || locationPermission === "prompt") {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords;
        if (locationPermission === "prompt") {
          setLocationPermission("granted");
          await getUsersClosestSensor();
        } else {
          setMessageOverlay(true);
          setOverlayContent({
            title: "GeoLocation is enabled",
            message: "To disable GeoLocation, please visit browser settings.",
          });
        }
      });
    }
    if ((await getLocationPermission()) === "denied") {
      if (locationPermission !== "denied") {
        setLocationPermission("denied");
      }
      setMessageOverlay(true);
      setOverlayContent({
        title: "GeoLocation is blocked",
        message: "To enable GeoLocation, please visit browser settings.",
      });
    }
  }

  return (
    <div className="w-full h-full center-content flex-col">
      {isParticipant && (
        <StandardButton
          message={
            "Notification" in window
              ? Notification.permission !== "granted"
                ? "Enable push notfications"
                : "Disable push notfications"
              : "Enable push notfications"
          }
          handleClick={() => notificationPermission()}
          extraClasses={`m-2 py-2`}
          dataCy="button-enable-push-notifications"
          colors={colors}
        />
      )}
      {isParticipant && (
        <StandardButton
          message={
            locationPermission === "granted"
              ? "Disable Location Permissions"
              : "Enable Location Permissions"
          }
          handleClick={() => requestLocationPermission()}
          extraClasses={`m-2 py-2`}
          dataCy="button-enable-location"
          colors={colors}
        />
      )}
      <StandardButton
        message={"Logout"}
        handleClick={() => userLogout()}
        extraClasses={"m-2 py-2"}
        dataCy="button-logout"
        colors={colors}
      />
      <OverlayAnimationFade
        open={helpOverlay}
        setOpen={() => setHelpOverlay}
        handleClick={() => setHelpOverlay(false)}
        component={getHelpComponent()}
      />
      <MessageOverlay
        open={messageOverlay}
        setOpen={setMessageOverlay}
        title={overlayContent.title}
        message={overlayContent.message}
        prompt={"Need Help?"}
        colors={colors}
        promptClick={() => setHelpOverlay(true)}
      />
    </div>
  );
}

export default Settings;
