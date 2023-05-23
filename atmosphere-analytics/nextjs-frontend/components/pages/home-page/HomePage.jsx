import RoleItem from "./RoleItem";
import researcher from "../../../images/user-auth/researcher.svg";
import participant from "../../../images/user-auth/participant.svg";
import Image from "next/image";
import fullLogo from "../../../images/logos/light-full-logo.png";

function HomePage() {
  const roles = [
    {
      title: "Researcher",
      description:
        "With this role you will be in charge of the administration of studies.",
      url: "/researcher",
      dataCy: "button-visit-researcher-login",
      image: researcher,
    },
    {
      title: "Participant",
      description:
        "With this role you will be participating with any studies that you enroll in.",
      url: "/participant",
      dataCy: "button-visit-participant-login",
      image: participant,
    },
  ];

  return (
    <div className="w-full h-full flex items-center flex-col pb-4 bg-white">
      <div className="w-full ml-8 mt-4 flex items-center flex-row">
        <Image width={150} height={100} src={fullLogo} alt="App Logo" />
      </div>
      <h1 className="text-3xl font-medium mt-8 mb-auto">
        Select a role to continue
      </h1>
      <div className="center-content lg:flex-row mb-auto flex-col flex-wrap m-4 px-8">
        {roles.map((role) => {
          return (
            <RoleItem
              key={role.title}
              title={role.title}
              description={role.description}
              url={role.url}
              image={role.image}
              dataCy={role.dataCy}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
