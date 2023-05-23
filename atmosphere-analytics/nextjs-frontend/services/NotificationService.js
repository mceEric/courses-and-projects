import axios from "axios";
import OneSignal from "react-onesignal";
import { updateById } from "./ParticipantService";

export async function oneSignalInitialisation() {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
    autoRegister: true,
  });
}

export async function getOneSignalUserId() {
  const notificationToken = await OneSignal.getUserId();
  return notificationToken;
}

// Subscribes a user to notifications
export async function notificationSubscription() {
  await oneSignalInitialisation();
  const notificationToken = await getOneSignalUserId();
  const jwtToken = localStorage.getItem("participant-jwt");
  const res = await updateById({ notificationToken }, jwtToken);
  return res;
}
