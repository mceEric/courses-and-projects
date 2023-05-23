import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainComponent from "../../components/pages/base-page/MainComponent";
import {
  handleLogout,
  jwtVerification,
} from "../../services/AuthenicationService";
import { HomeIcon, Cog6ToothIcon, UsersIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Oval } from "react-loader-spinner";

export default function dashboard() {
  const [validUser, setValidUser] = useState(false);
  const router = useRouter();

  //Checks if a researcher has a valid jwt within local storage, performs a respective action based on reslt
  useEffect(() => {
    const fetchJwt = async () => {
      const jwt = localStorage.getItem("researcher-jwt");
      if (!jwt) {
        router.push("/researcher");
      }
      const res = await jwtVerification(jwt, false);
      if (res.user) {
        setValidUser(res.user);
      } else {
        handleLogout(false);
        router.push("/researcher");
      }
    };

    fetchJwt();
  }, []);

  const sidebarItems = [
    {
      name: "Study Dashboard",
      icon: HomeIcon,
      current: false,
      dataCy: "navigation-study-dashboard",
    },
    {
      name: "Study Participants",
      icon: UsersIcon,
      current: true,
      dataCy: "navigation-study-participants",
    },
    {
      name: "Study Creation",
      icon: DocumentPlusIcon,
      current: false,
      dataCy: "navigation-study-creation",
    },
    {
      name: "Settings",
      icon: Cog6ToothIcon,
      current: false,
      dataCy: "navigation-settings",
    },
  ];

  return (
    <div className="w-screen h-screen center-content overflow-x-hidden">
      {validUser ? (
        <MainComponent
          user={validUser}
          setUser={setValidUser}
          isParticipant={false}
          sidebarItems={sidebarItems}
          locationPermission={false}
          setLocationPermission={() => null}
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
// cc, loans, mortgages