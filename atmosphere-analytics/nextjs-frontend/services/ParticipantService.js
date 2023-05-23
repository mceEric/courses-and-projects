import axios from "axios";

export async function findById(participantId, jwt) {
  const res = await axios
    .put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/participant/find-by-id/${participantId}`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}

export async function appendEnrolledStudy(studyId, jwt) {
  const res = await axios
    .put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/participant/append-enrolled-study`,
      {
        studyId,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}

export async function removeEnrolledStudy(studyId, jwt) {
  const res = await axios
    .put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/participant/remove-enrolled-study`,
      {
        studyId,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}

export async function updateById(valuesToUpdate, jwt) {
  const res = await axios
    .put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/participant/update-by-id`,
      valuesToUpdate,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}
