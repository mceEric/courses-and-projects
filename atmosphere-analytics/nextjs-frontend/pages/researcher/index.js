import { useRouter } from "next/router";
import { useEffect } from "react";
import UserAuthPage from "../../components/pages/user-auth-page/UserAuthPage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchJwt = () => {
      const jwt = localStorage.getItem("researcher-jwt");
      if (jwt) {
        router.push("/researcher/dashboard");
      }
    };

    fetchJwt();
  }, []);

  return (
    <div className="w-screen h-screen center-content overflow-x-hidden">
      <UserAuthPage isParticipant={false} />
    </div>
  );
}
