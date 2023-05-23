import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ParticipantStrategy } from './participant/participant.strategy';
import { AuthService } from './auth.service';
import { ParticipantModule } from '../users/participant/participant.module';
import { ResearcherModule } from '../users/researcher/researcher.module';
import { ResearcherStrategy } from './researcher/researcher.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AuthController } from './auth.controller';
dotenv.config();

@Module({
  imports: [
    ParticipantModule,
    ResearcherModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],

  providers: [
    AuthService,
    ParticipantStrategy,
    ResearcherStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
