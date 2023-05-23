import axios from "axios";

export async function createCheck(airSensorId, frequency, pm, jwt) {
  const check = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/influxdb/checks`,
      { airSensorId, frequency, pm },
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
  return check;
}

export async function deleteCheck(jwt) {
  const check = await axios
    .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/influxdb/checks`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return check;
}
