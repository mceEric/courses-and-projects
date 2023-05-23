import {
  Get,
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { ParticipantAuthGuard } from '../../auth/participant/participant.auth.guard';
import { ParticipantsService } from './participant.service';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../../auth/jwt/guard/jwt.guard';

@Controller('participant')
export class ParticipantsController {
  constructor(private participantService: ParticipantsService) {}

  @Get('/find-by-id/:participantId')
  findByUserId(@Request() req) {
    return this.participantService.findByUserId(req.params.participantId);
  }

  @Get('/get-notification-tokens')
  getNotificationTokens() {
    return this.participantService.getNotificationTokens();
  }

  @Post('/signup')
  signup(@Body() dto: UserDto) {
    return this.participantService.signup(dto);
  }

  @UseGuards(ParticipantAuthGuard)
  @Post('/login')
  login(@Request() req): {
    user: { username: string; password: string };
    jwt: string;
  } {
    return { user: req.user.user, jwt: req.user.accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/append-enrolled-study')
  appendEnrolledStudy(@Body() body: { studyId: string }, @Request() req) {
    return this.participantService.appendEnrolledStudy(
      req.user.payload.user._id,
      body.studyId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-by-id')
  updateById(@Body() body: any, @Request() req) {
    return this.participantService.updateById(req.user.payload.user._id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/remove-enrolled-study')
  removeEnrolledStudy(@Body() body: { studyId: string }, @Request() req) {
    return this.participantService.removeEnrolledStudy(
      req.user.payload.user._id,
      body.studyId,
    );
  }
}
