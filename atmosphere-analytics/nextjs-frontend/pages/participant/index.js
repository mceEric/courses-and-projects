import { useRouter } from "next/router";
import { useEffect } from "react";
import UserAuthPage from "../../components/pages/user-auth-page/UserAuthPage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchJwt = () => {
      const jwt = localStorage.getItem("participant-jwt");
      if (jwt) {
        router.push("/participant/dashboard");
      }
    };

    fetchJwt();
  }, []);

  return (
    <div className="w-screen h-screen center-content overflow-x-hidden">
      <UserAuthPage isParticipant={true} />
    </div>
  );
}
