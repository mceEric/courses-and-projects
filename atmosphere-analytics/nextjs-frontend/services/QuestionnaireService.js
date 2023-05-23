import axios from "axios";

export async function submitQuestionnaire(study, answers, jwt) {
  const date = new Date(Date.now());
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/results`,
    {
      study,
      answers,
      date,
    },
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );

  return result.data;
}
