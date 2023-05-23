import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  /*@Post('/notification-all')
  allUsersPushNotification(@Body() req: { title: string; message: string }) {
    return this.notificationsService.allUsersPushNotification(req);
  }*/

  @Post('/notification-by-token')
  userPushNotificationByToken(
    @Body() req: { notificationToken: string; title: string; message: string },
  ) {
    return this.notificationsService.userPushNotificationByToken(req);
  }

  @Post('/notification-by-id')
  userPushNotificationById(
    @Body() body: { title: string; message: string; userId: string },
  ) {
    return this.notificationsService.userPushNotificationById(
      body.userId,
      body.title,
      body.message,
      null,
    );
  }

  @Post('/check-notification-by-id')
  checkPushNotificationById(@Body() body: any) {
    console.log(body);
    return this.notificationsService.userPushNotificationById(
      body._check_name,
      body._message,
      'Notification',
      body._time,
    );
  }

  @Post('/notification-by-email')
  userPushNotificationByEmail(
    @Body() req: { email: string; title: string; message: string },
  ) {
    return this.notificationsService.userPushNotificationByEmail(req);
  }
}
