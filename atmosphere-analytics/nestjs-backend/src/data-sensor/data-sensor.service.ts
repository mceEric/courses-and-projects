import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { findNearest } from 'geolib';
import { ParticipantsService } from '../users/participant/participant.service';

@Injectable()
export class DataSensorService {
  constructor(
    private readonly httpService: HttpService,
    private participantService: ParticipantsService,
  ) {}

  // Gets all data sensors for a requested country
  async getCountrySensors(countryCode: string) {
    if (!countryCode) {
      throw new HttpException(
        'No country code was sent.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const sensors = await this.httpService.axiosRef.get(
      `https://data.sensor.community/airrohr/v1/filter/country=${countryCode}&type=SDS011`,
    );
    if (sensors.data.length < 1) {
      throw new HttpException(
        'No sensors contained within country.',
        HttpStatus.NOT_FOUND,
      );
    }
    return sensors.data;
  }

  // Returns all unique data sensors
  async getUniqueSensors() {
    const sensors = await this.httpService.axiosRef.get(
      'https://data.sensor.community/static/v2/data.dust.min.json',
    );

    const dupArr = [];
    const uniqueArr = [];
    if (sensors.data) {
      for (let i = 0; i < sensors.data.length; i++) {
        if (
          sensors.data[i].sensor.sensor_type.name === 'SDS011' &&
          dupArr.indexOf(sensors.data[i].sensor.id) < 0
        ) {
          dupArr.push(sensors.data[i].sensor.id);
          uniqueArr.push({
            id: sensors.data[i].sensor.id,
            lat: parseFloat(sensors.data[i].location.latitude),
            lng: parseFloat(sensors.data[i].location.longitude),
            country: sensors.data[i].location.country,
          });
        }
      }
    }
    return uniqueArr;
  }

  // Returns all unique sensors grouped by country
  async getGroupedSensors() {
    const sensors = await this.getUniqueSensors();
    const groupedSensors = {};
    if (sensors.length > 0) {
      sensors.map((sensor) => {
        if (groupedSensors[sensor.country]) {
          groupedSensors[sensor.country].push(sensor);
        } else {
          groupedSensors[sensor.country] = [sensor];
        }
      });
    }
    return groupedSensors;
  }

  // Returns the closest sensor based on provided latitude and longitude
  async getClosestSensor(latitude: string, longitude: string, user: any) {
    if (!latitude || !longitude) {
      throw new HttpException(
        'Missing body attributes.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const sensors = await this.httpService.axiosRef.get(
      `https://data.sensor.community/airrohr/v1/filter/type=SDS011&area=${latitude},${longitude},6`,
    );

    if (sensors.data.length < 1) {
      throw new HttpException('No Sensors are nearby.', HttpStatus.NOT_FOUND);
    }

    const nearestSensor: any = findNearest(
      { latitude, longitude },
      sensors.data.map((sensor) => {
        return {
          id: sensor.sensor.id,
          latitude: sensor.location.latitude,
          longitude: sensor.location.longitude,
        };
      }),
    );

    const updatedUser = await this.participantService.updateById(user._id, {
      airSensorId: nearestSensor.id,
    });

    return updatedUser;
  }
}
