import axios from "axios";

export async function getStudies() {
  const studies = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/studies`
  );

  return studies.data;
}

export async function createStudy(study, jwt) {
  const res = await axios
    .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/studies`, study, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
}

export async function getStudyResults(studyId) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/studies/${studyId}`
  );

  return result.data;
}
