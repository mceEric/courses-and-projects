import React, { useState } from "react";
import LoginForm from "./login-form/LoginForm";

function UserLogin() {
  const [auth, setAuth] = useState(false);

  return (
    //test
    <div
      className="h-100 center-content flex-fill column"
      style={{ width: "50%", minWidth: "26em" }}
    >
      <div className="center-content column dark-bg rounded-edges" style={{ width: "75%" }}>
        <h1 className="pt-10 border-box">
          {auth ? "Create an account" : "Login to your account"}
        </h1>
        <LoginForm auth={auth} setAuth={setAuth} />
      </div>
    </div>
  );
}

export default UserLogin;
