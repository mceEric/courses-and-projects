import { Module } from '@nestjs/common';
import { InfluxDBService } from './influxdb.service';
import { InfluxDBController } from './influxdb.controller';
import { InfluxDBStrategy } from './influxdb.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  providers: [InfluxDBService, InfluxDBStrategy],
  controllers: [InfluxDBController],
  exports: [InfluxDBService],
})
export class InfluxDBModule {}
