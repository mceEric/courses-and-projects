import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/guard/jwt.guard';
import { ResultsService } from './results.service';
import { ResultsDto } from './dto/results.dto';

@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @Get('/:participantId')
  getParticipantsResults(@Request() req) {
    return this.resultsService.getParticipantsResults(req.params.participantId);
  }

  @Get('/study/:studyId')
  getStudyResults(@Request() req) {
    return this.resultsService.getStudyResults(req.params.studyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createResult(@Body() dto: ResultsDto, @Request() req) {
    return this.resultsService.createResult(req.user.payload.user._id, dto);
  }
}
