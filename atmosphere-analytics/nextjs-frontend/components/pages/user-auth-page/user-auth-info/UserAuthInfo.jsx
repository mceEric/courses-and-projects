import metric from "./../../../../images/user-auth/metrics.png";
import study from "./../../../../images/user-auth/study.png";
import Image from "next/image";

function UserAuthInfo({ isParticipant }) {
  const title = isParticipant ? "Study enrollment" : "Detailed Reports";
  const description = isParticipant
    ? "Enroll in multiple studies all at once and receive detailed metrics with each study."
    : "Get detailed reports of every study you are administrating and more.";
  const image = isParticipant ? study : metric;

  return (
    <div className="bg-gradient-to-tr from-violet-500 to-violet-700 flex-1 flex items-center pt-[8%] flex-col p-6">
      <Image src={image} className="bg-white" alt="Test metrics" />
      <h2 className="text-2xl mt-24 font-bold text-white">{title}</h2>
      <p className="text-white">{description}</p>
    </div>
  );
}

export default UserAuthInfo;
