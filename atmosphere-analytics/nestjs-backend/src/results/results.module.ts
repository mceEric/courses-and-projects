import { Module, forwardRef } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Results, ResultsSchema } from './schemas/results.schema';
import { ParticipantModule } from '../users/participant/participant.module';
import { StudyModule } from '../study/study.module';
import { InfluxDBModule } from '../influxdb/influxdb.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Results.name, schema: ResultsSchema }]),
    ParticipantModule,
    forwardRef(() => StudyModule),
    InfluxDBModule,
  ],
  providers: [ResultsService],
  controllers: [ResultsController],
  exports: [ResultsService],
})
export class ResultsModule {}
