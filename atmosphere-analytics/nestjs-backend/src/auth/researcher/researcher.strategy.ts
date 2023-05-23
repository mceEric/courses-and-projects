import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class ResearcherStrategy extends PassportStrategy(
  Strategy,
  'researcher',
) {
  constructor(private authService: AuthService) {
    super();
  }

  //Returns a researcher if credentials are correct
  async validate(username: string, password: string): Promise<any> {
    const researcher = await this.authService.researcherValidation(
      username,
      password,
    );

    return researcher;
  }
}
