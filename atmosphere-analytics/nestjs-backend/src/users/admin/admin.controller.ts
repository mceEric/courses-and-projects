import {
  Controller,
  UseGuards,
  Delete,
  Request,
  Body,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/guard/jwt.guard';
import { AdminService } from './admin.service';
import { StudyDto } from '../../study/dto/study.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/participant/:participantId')
  deleteParticipant(@Request() req): any {
    return this.adminService.deleteParticipant(
      req.user.payload.user,
      req.params.participantId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/studies')
  createStudy(@Body() dto: StudyDto, @Request() req) {
    return this.adminService.createStudy(dto, req.user.payload.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/studies/:studyId')
  deleteStudy(@Request() req) {
    return this.adminService.deleteStudy(
      req.params.studyId,
      req.user.payload.user,
    );
  }
}
