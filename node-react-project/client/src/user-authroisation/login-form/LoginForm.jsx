import React, { useState } from "react";
import FormSwitch from "./FormSwitch";
import {
  faEnvelope,
  faPerson,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

function LoginForm({ auth, setAuth }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hover, setHover] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigate();

  const loginInputs = [
    {
      icon: faEnvelope,
      placeholder: "Email...",
      type: "email",
      value: setEmail,
      displayed: auth,
    },
    {
      icon: faPerson,
      placeholder: "Username...",
      type: "text",
      value: setUsername,
      displayed: true,
    },
    {
      icon: faLock,
      placeholder: "Password...",
      type: "password",
      value: setPassword,
      displayed: true,
    },
    {
      icon: faLock,
      placeholder: "Confirm password...",
      type: "password",
      value: setConfirmPassword,
      displayed: auth,
    },
  ];
  function registerUser(e) {
    e.preventDefault();
    fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
  }

  function loginUser(e) {
    e.preventDefault();
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        navigation("/vbc");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <form
      onSubmit={(e) => (auth ? registerUser(e) : loginUser(e))}
      className="center-content login-form m-10 p-10 border-box"
    >
      <div className="w-100 h-100 center-content column">
        {loginInputs.map((input) => {
          return (
            <FormInput
              icon={input.icon}
              placeholder={input.placeholder}
              type={input.type}
              value={input.value}
              displayed={input.displayed}
            />
          );
        })}

        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`text-center pointer mt-20 p-5 p-sides border-box no-border tube-edges white ${
            !hover ? "component-gradient" : "alt-component-gradient"
          }`}
        >
          {auth ? "Sign up" : "Login"}
        </button>
        <FormSwitch
          question={auth ? "Already have an account?" : "Not registred yet?"}
          prompt={auth ? "Sign in" : "Create an account"}
          onClick={() => setAuth(!auth)}
        />
      </div>
    </form>
  );
}

export default LoginForm;
