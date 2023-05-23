import { useState } from "react";
import UserAuthForm from "./user-auth-form/UserAuthForm";
import UserAuthInfo from "./user-auth-info/UserAuthInfo";
import {
  researcherLogin,
  researcherSignup,
  participantSignup,
  participantLogin,
} from "../../../services/AuthenicationService";
import AuthReport from "../../shared/reports/AuthReport";
import { useRouter } from "next/router";
import fullLogo from "../../../images/logos/light-full-logo.png";
import Image from "next/image";

function UserAuthPage({ isParticipant }) {
  const [isSignup, setIsSignup] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [report, setReport] = useState(null);
  const router = useRouter();

  const titlePrompt = isSignup ? "REGISTER" : "LOGIN";
  const switchPrompts = isSignup
    ? "Already have an account?"
    : "Don't have an account?";

  //Registers a user
  async function signup() {
    const res = isParticipant
      ? await participantSignup(email, firstName, lastName, password)
      : await researcherSignup(email, firstName, lastName, password);

    if (res.message) {
      setReport({
        title: res.message,
        error: true,
      });
      return;
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setReport({ title: "Signup successful", error: false });
    setIsSignup(false);
  }

  //Logs a user in
  async function login() {
    const res = isParticipant
      ? await participantLogin(email, password)
      : await researcherLogin(email, password);
    if (res.statusCode === 400 || res.statusCode === 401) {
      setReport({
        title: res.message,
        error: true,
      });
      return;
    }
    if (res.jwt === null) {
      setReport({
        title: "An unknown error occured, please try again.",
        error: true,
      });
      return;
    }
    if (isParticipant) {
      localStorage.setItem("participant-jwt", res.jwt);
      router.push("/participant/dashboard");
    } else {
      localStorage.setItem("researcher-jwt", res.jwt);
      router.push("/researcher/dashboard");
    }
  }

  //Handles a form submit for login and signup
  async function handleSubmit(e) {
    e.preventDefault();
    setReport(null);

    isSignup ? signup() : login();
  }

  //Handles auth type
  function handleClick() {
    setIsSignup(!isSignup);
    setReport(null);
  }

  const inputs = [
    {
      placeholder: "johndoe@gmail.com",
      value: email,
      setValue: setEmail,
      type: "email",
      prompt: "Email",
      signup: false,
      dataCy: "input-email",
    },
    {
      placeholder: "John",
      value: firstName,
      setValue: setFirstName,
      type: "text",
      prompt: "First Name",
      signup: true,
      dataCy: "input-first-name",
    },
    {
      placeholder: "Doe",
      value: lastName,
      setValue: setLastName,
      type: "text",
      prompt: "Last Name",
      signup: true,
      dataCy: "input-last-name",
    },
    {
      placeholder: "At least 8 characters",
      value: password,
      setValue: setPassword,
      type: "password",
      prompt: "Password",
      signup: false,
      dataCy: "input-password",
    },
  ];

  return (
    <div
      data-cy="user-auth-page"
      className="w-full h-full flex bg-white flex-col lg:flex-row"
    >
      <div className="flex items-center flex-1 flex-col">
        <div className="w-full ml-8 mt-4 flex items-center flex-row">
          <Image width={150} height={100} src={fullLogo} alt="App Logo" />
        </div>
        <h1 className="text-3xl text-violet-700">{titlePrompt}</h1>

        <div className="flex px-16 m-4 p-4 flex-col max-w-xl w-full">
          {report && (
            <AuthReport
              dataCy="item-auth-report"
              report={report.title}
              error={report.error}
            />
          )}
          <UserAuthForm
            inputs={inputs}
            isSignup={isSignup}
            handleSubmit={handleSubmit}
          />
          <button
            onClick={() => handleClick()}
            data-cy="button-switch-prompts"
            className="text-sm self-start text-gray-400 my-4"
          >
            {switchPrompts}
          </button>
        </div>
      </div>
      <UserAuthInfo isParticipant={isParticipant} />
    </div>
  );
}

export default UserAuthPage;
