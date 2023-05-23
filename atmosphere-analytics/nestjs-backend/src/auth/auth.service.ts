import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { ParticipantsService } from '../users/participant/participant.service';
import { ResearcherService } from '../users/researcher/researcher.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private participantService: ParticipantsService,
    private researcherService: ResearcherService,
    private jwt: JwtService,
  ) {}

  //Compares given password with users encrypted password
  async comparePassword(givenPassword: string, userPassword: string) {
    try {
      const auth = bcrypt.compareSync(givenPassword, userPassword);
      return auth;
    } catch (error) {
      return error;
    }
  }

  //Returns a valid JWT to a user
  async signJwt(user: any): Promise<{
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      notificationToken: string;
      enrolledStudies: [string];
    };
    accessToken: string;
  }> {
    const payload = { user };
    const jwtToken = this.jwt.sign(payload, { expiresIn: '2d' });

    return {
      user: {
        id: user._id,
        email: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        notificationToken: user.notificationToken,
        enrolledStudies: user.enrolledStudies,
      },
      accessToken: jwtToken,
    };
  }

  //Verifies if a given JWT is valid
  async jwtVerification(req: { token: string; isParticipant: boolean }) {
    try {
      const { user } = await this.jwt.verify(req.token, {
        publicKey: process.env.JWT_SECRET,
      });

      const userDetails = req.isParticipant
        ? await (
            await this.participantService.findByUserId(user._id)
          ).populate('enrolledStudies')
        : await this.researcherService.findByUserId(user._id);

      return { user: userDetails };
    } catch {
      throw new HttpException(
        'JWT has expired or is malformed.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  //Checks if a users password is correct by calling the comparePassword function
  async userAudit(user: any, password: string) {
    const passwordCompare = await this.comparePassword(password, user.password);
    if (!passwordCompare) {
      // throw new Error('Password was incorrect, please try again.');
      return null;
    }
    return user;
  }

  //Validates a users login credentials to check if they are a correct participants values
  async participantValidation(
    username: string,
    password: string,
  ): Promise<any> {
    const participant = await this.participantService.findByEmail(username);
    if (!participant) {
      throw new HttpException(
        'Participant email does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this.userAudit(participant, password);

    if (!user) {
      throw new HttpException('Password incorrect.', HttpStatus.UNAUTHORIZED);
    }

    return this.signJwt(user);
  }

  //Validates a users login credentials to check if they are a correct researchers values
  async researcherValidation(username: string, password: string): Promise<any> {
    const researcher = await this.researcherService.findByEmail(username);
    if (!researcher) {
      throw new HttpException(
        'Researcher email does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.userAudit(researcher, password);

    if (!user) {
      throw new HttpException('Password incorrect.', HttpStatus.UNAUTHORIZED);
    }

    return this.signJwt(user);
  }
}
