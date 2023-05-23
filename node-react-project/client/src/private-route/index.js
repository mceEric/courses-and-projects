import React from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ route }) {
  const navigation = useNavigate();
  const token = localStorage.getItem("token");
  fetch("http://localhost:5000/user/authentication", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((data) => data.json())
    .then((res) => {
      localStorage.setItem("user", res.user.id);
    })
    .catch((error) => {
      console.log(error);
      navigation("/login");
    });
  return route;
}

export default PrivateRoute;
