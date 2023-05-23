import {
  FluxResultObserver,
  FluxTableMetaData,
} from '@influxdata/influxdb-client';
import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InfluxDBStrategy } from './influxdb.strategy';
import { CheckDiscriminator } from '@influxdata/influxdb-client-apis';

@Injectable()
export class InfluxDBService {
  constructor(private influxDBStrategy: InfluxDBStrategy) {}

  getFluxText(airSensorId: any, frequency: string) {
    switch (isNaN(airSensorId)) {
      case true:
        return `from(bucket: "data-sensors")\n  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)\n  |> filter(fn: (r) => r["_measurement"] == "airquality")\n  |> filter(fn: (r) => r["_field"] == "value")\n  |> filter(fn: (r) => r["country_code"] == "${airSensorId}")\n |> group(columns: ["_time"])\n |> group(columns: ["id", "_time", "_value"], mode: "except") \n |> aggregateWindow(every: ${frequency}, fn: mean, createEmpty: false)`;
      default:
        return `from(bucket: "data-sensors")\n  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)\n  |> filter(fn: (r) => r._measurement == "airquality")\n  |> filter(fn: (r) => r._field == "value")\n  |> filter(fn: (r) => r.id == "${airSensorId}")\n  |> map(fn:(r) => ({_value: float(v: r._value), _time: r._time}))\n  |> aggregateWindow(every: ${frequency}, fn: mean, createEmpty: false)`;
    }
  }

  // Flux query configuration
  async getFluxObserver(): Promise<FluxResultObserver<string[]>> {
    const tableMetrics: Array<any> = [];
    return {
      next(row: string[], tableMeta: FluxTableMetaData) {
        tableMetrics.push(tableMeta.toObject(row));
      },
      error(error) {
        console.error(error);
      },
      complete() {
        return tableMetrics[0];
      },
    };
  }

  // Receives a check based on its ID
  async getCheck(checkId: string) {
    const checkApi = this.influxDBStrategy.checkApi();
    const res = await checkApi.getChecks({
      orgID: process.env.NEXT_PUBLIC_INFLUX_ORG,
    });

    const check = res.checks.filter((check) => {
      return check.name === checkId.toString();
    });
    return check[0];
  }

  // Deletes a users check
  async deleteCheck(user: any) {
    const checkApi = this.influxDBStrategy.checkApi();
    const check = await this.getCheck(user._id);
    if (!check) {
      throw new HttpException(
        'User has no relevant checks.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await checkApi.deleteChecksID({ checkID: check.id });
    return check;
  }

    // Deletes a check for a user, if user already has a check simply update it
  async createCheck(
    airSensorId: string,
    frequency: string,
    pm: number,
    user: any,
  ) {
    const checkApi = this.influxDBStrategy.checkApi();
    const check = await this.getCheck(user._id);
    let res: CheckDiscriminator;
    const body: CheckDiscriminator = {
      name: user._id,
      orgID: process.env.NEXT_PUBLIC_INFLUX_ORG,
      ownerID: '78f3e0edc318f660',
      query: {
        text: this.getFluxText(airSensorId, frequency),
        builderConfig: {
          buckets: ['data-sensors'],
          aggregateWindow: { period: frequency, fillValues: false },
          functions: [{ name: 'mean' }],
        },
        editMode: 'advanced',
      },
      every: frequency,
      offset: '1m',
      type: 'threshold',
      status: 'active',
      statusMessageTemplate: `${user.firstName}, air quality threshold exceeded, please answer questionnaire.`,
      thresholds: [
        {
          allValues: false,
          level: 'CRIT',
          value: pm,
          type: 'greater',
        },
        {
          allValues: false,
          level: 'OK',
          value: pm,
          type: 'lesser',
        },
      ],
    };

    if (check) {
      res = await checkApi.putChecksID({ checkID: check.id, body });
    } else {
      res = await checkApi.createCheck({ body });
    }

    return res;
  }
}
