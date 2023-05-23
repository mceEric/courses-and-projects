import { Module } from '@nestjs/common';
import { StudyModule } from '../../study/study.module';
import { ParticipantModule } from '../participant/participant.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ResearcherModule } from '../researcher/researcher.module';

@Module({
  imports: [ParticipantModule, StudyModule, ResearcherModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
