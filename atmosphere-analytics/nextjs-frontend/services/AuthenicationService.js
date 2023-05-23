import axios from "axios";

//Handles all endpoint calls for user auth
export async function researcherLogin(email, password) {
  const researcher = {
    username: email,
    password: password,
  };
  const res = await axios
    .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/researcher/login`, researcher)
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}

export async function researcherSignup(email, firstName, lastName, password) {
  const researcher = {
    username: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
  };
  const res = await axios
    .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/researcher/signup`, researcher)
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}

export async function participantLogin(email, password) {
  const researcher = {
    username: email,
    password: password,
  };
  const res = await axios
    .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/participant/login`, researcher)
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}

export async function participantSignup(email, firstName, lastName, password) {
  const participant = {
    username: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
  };
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/participant/signup`,
      participant
    )
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}

export async function jwtVerification(token, isParticipant) {
  const res = await axios
    .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/jwt-verification`, {
      token,
      isParticipant,
    })
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
}

export function handleLogout(isParticipant) {
  if (isParticipant) {
    localStorage.removeItem("participant-jwt");
  } else {
    localStorage.removeItem("researcher-jwt");
  }
}
