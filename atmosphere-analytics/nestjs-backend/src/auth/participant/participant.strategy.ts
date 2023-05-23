import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class ParticipantStrategy extends PassportStrategy(
  Strategy,
  'participant',
) {
  constructor(private authService: AuthService) {
    super();
  }

  //Returns a participant if credentials are correct
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.participantValidation(
      username,
      password,
    );
  
    return user;
  }
}
