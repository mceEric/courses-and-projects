import { InfluxDB, QueryApi, WriteApi } from '@influxdata/influxdb-client';
import { ChecksAPI, TasksAPI } from '@influxdata/influxdb-client-apis';

export class InfluxDBStrategy {
  queryApi(): QueryApi {
    return new InfluxDB({
      url: process.env.NEXT_PUBLIC_INFLUX_URL,
      token: process.env.NEXT_PUBLIC_INFLUX_TOKEN,
    }).getQueryApi({ org: process.env.NEXT_PUBLIC_INFLUX_ORG });
  }

  writeApi(): WriteApi {
    return new InfluxDB({
      url: process.env.NEXT_PUBLIC_INFLUX_URL,
      token: process.env.NEXT_PUBLIC_INFLUX_TOKEN,
    }).getWriteApi(process.env.NEXT_PUBLIC_INFLUX_ORG, 'airquality');
  }

  checkApi(): ChecksAPI {
    return new ChecksAPI(
      new InfluxDB({
        url: process.env.NEXT_PUBLIC_INFLUX_URL,
        token: process.env.NEXT_PUBLIC_INFLUX_TOKEN,
      }),
    );
  }

  taskApi(): TasksAPI {
    return new TasksAPI(
      new InfluxDB({
        url: process.env.NEXT_PUBLIC_INFLUX_URL,
        token: process.env.NEXT_PUBLIC_INFLUX_TOKEN,
      }),
    );
  }
}
