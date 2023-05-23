import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('/jwt-verification')
  jwtVerification(@Body() req: { token: string; isParticipant: boolean }) {
    return this.authSerivce.jwtVerification(req);
  }
}
