import axios from "axios";

export async function getCountrySensors() {
  const ipData = await axios.get("https://ipapi.co/json/");
  const countryCode = ipData.data.country_code;
  const sensors = await axios.get(
    `https://data.sensor.community/airrohr/v1/filter/country=${countryCode}&type=SDS011`
  );
  return sensors.data;
}

export async function getClosestSensors(lat, lon) {
  const sensors = await axios.get(
    `https://data.sensor.community/airrohr/v1/filter/area=${lat},${lon},6&type=SDS011`
  );
  return sensors.data;
}

export async function getClosestSensor(latitude, longitude, jwt) {
  const sensors = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/data-sensor/closest-sensor`,
      {
        latitude,
        longitude,
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

  return sensors;
}

export async function getUniqueSensors(jwt) {
  const sensors = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/data-sensor/unique-sensors`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return sensors;
}

export async function getGroupedSensors(jwt) {
  const sensors = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/data-sensor/grouped-sensors`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((sucess) => {
      return sucess.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return sensors;
}

export async function getAirSensors() {
  const sensors = await axios.get(
    `https://data.sensor.community/static/v2/data.dust.min.json`
  );
  const dupArr = [];
  const newArr = [];
  if (sensors.data) {
    for (var i = 0; i < sensors.data.length; i++) {
      if (
        sensors.data[i].sensor.sensor_type.name === "SDS011" &&
        dupArr.indexOf(sensors.data[i].sensor.id) < 0
      ) {
        dupArr.push(sensors.data[i].sensor.id);
        newArr.push({
          id: sensors.data[i].sensor.id,
          lat: parseFloat(sensors.data[i].location.latitude),
          lng: parseFloat(sensors.data[i].location.longitude),
          country: sensors.data[i].location.country,
        });
      }
    }
  }

  return newArr;
}
