import { Module, forwardRef } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Study, StudySchema } from './schemas/study.schema';
import { ResultsModule } from '../results/results.module';
import { ParticipantModule } from '../users/participant/participant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Study.name, schema: StudySchema }]),
    forwardRef(() => ResultsModule),
    ParticipantModule
  ],
  providers: [StudyService],
  controllers: [StudyController],
  exports: [StudyService],
})
export class StudyModule {}
