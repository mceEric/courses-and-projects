import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ParticipantModule } from '../users/participant/participant.module';
import { DataSensorController } from './data-sensor.controller';
import { DataSensorService } from './data-sensor.service';
dotenv.config();

@Module({
  imports: [HttpModule, ParticipantModule],
  providers: [DataSensorService],
  controllers: [DataSensorController],
})
export class DataSensorModule {}
