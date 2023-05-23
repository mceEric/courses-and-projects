import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import * as OneSignal from '@onesignal/node-onesignal';
import { ParticipantDocument } from '../users/schemas/paticipant.schema';
import { OneSignalStrategy } from './one-signal/one-signal.strategy';
import { ParticipantsService } from '../users/participant/participant.service';

@Injectable()
export class NotificationsService {
  constructor(
    private participantService: ParticipantsService,
    private oneSignalStrategy: OneSignalStrategy,
  ) {}

  //Generates a multi/single use notification by a given set of parameters
  notificationGenerator(
    playerIds: [string] | false,
    title: string,
    message: string,
  ): OneSignal.Notification {
    const pushNotification = new OneSignal.Notification();
    pushNotification.app_id = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    if (playerIds) {
      pushNotification.include_player_ids = playerIds;
    } else {
      pushNotification.included_segments = ['Subscribed Users'];
    }
    pushNotification.contents = {
      en: message,
    };
    pushNotification.headings = { en: title };
    return pushNotification;
  }

  //Sends a notification to all subscribed users
  /*async allUsersPushNotification(req: {
    title: string;
    message: string;
  }): Promise<string> {
    const { id } = await this.oneSignalStrategy
      .oneSignalClient()
      .createNotification(
        this.notificationGenerator(false, req.title, req.message),
      );

    return id;
  }*/

  //Sends a notification to the respective user of the notification token
  async userPushNotificationByToken(req: {
    notificationToken: string;
    title: string;
    message: string;
  }): Promise<string> {
    try {
      const { id } = await this.oneSignalStrategy
        .oneSignalClient()
        .createNotification(
          this.notificationGenerator(
            [req.notificationToken],
            req.title,
            req.message,
          ),
        );
      return id;
    } catch {
      throw new HttpException(
        'No such notification token exists.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //Sends a notification to the respective user of the mongodb id
  async userPushNotificationById(
    userId: string,
    title: string,
    message: string,
    checkTimestamp: string,
  ): Promise<string> {
    const user = await this.participantService.findByUserId(userId);

    if (!user) {
      throw new HttpException('No such user exists.', HttpStatus.BAD_REQUEST);
    }
    if (!user.notificationToken) {
      throw new HttpException(
        'User is currently not subscribed to notifications.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (checkTimestamp) {
      user.lastCheck = checkTimestamp;
      await user.save();
    }

    try {
      const { id } = await this.oneSignalStrategy
        .oneSignalClient()
        .createNotification(
          this.notificationGenerator([user.notificationToken], title, message),
        );
      return id;
    } catch {
      throw new HttpException(
        'No such notification token exists.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //Sends a notification to the respective user of the email
  async userPushNotificationByEmail(req: {
    email: string;
    title: string;
    message: string;
  }): Promise<string> {
    const user = await this.participantService.findByAny({
      username: req.email,
    });

    if (!user) {
      throw new HttpException('No such user exists.', HttpStatus.NOT_FOUND);
    }
    if (!user.notificationToken) {
      throw new HttpException(
        'User is currently not subscribed to notifications.',
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      const { id } = await this.oneSignalStrategy
        .oneSignalClient()
        .createNotification(
          this.notificationGenerator(
            [user.notificationToken],
            req.title,
            req.message,
          ),
        );
      return id;
    } catch {
      throw new HttpException(
        'No such notification token exists.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
