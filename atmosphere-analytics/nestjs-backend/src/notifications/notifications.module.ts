import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import * as dotenv from 'dotenv';
import { OneSignalStrategy } from './one-signal/one-signal.strategy';
import { ParticipantModule } from '../users/participant/participant.module';
dotenv.config();

@Module({
  imports: [AuthModule, ParticipantModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, OneSignalStrategy],
})
export class NotificationsModule {}
