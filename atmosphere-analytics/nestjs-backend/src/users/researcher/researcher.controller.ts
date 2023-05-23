import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { UserDto } from '../dto/user.dto';
import { ResearcherAuthGuard } from '../../auth/researcher/researcher.auth.guard';

@Controller('researcher')
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  @Post('/signup')
  signup(@Body() dto: UserDto) {
    return this.researcherService.signup(dto);
  }

  @UseGuards(ResearcherAuthGuard)
  @Post('/login')
  login(@Request() req): {
    user: { username: string; password: string };
    jwt: string;
  } {
    return { user: req.user.user, jwt: req.user.accessToken };
  }
}
