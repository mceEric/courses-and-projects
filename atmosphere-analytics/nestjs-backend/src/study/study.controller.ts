import { Controller, Get, Request } from '@nestjs/common';
import { StudyService } from './study.service';

@Controller('studies')
export class StudyController {
  constructor(private studyService: StudyService) {}

  @Get()
  getAll() {
    return this.studyService.getAll();
  }

  @Get('/:studyId')
  getStudyData(@Request() req) {
    return this.studyService.getStudyData(req.params.studyId);
  }
}
