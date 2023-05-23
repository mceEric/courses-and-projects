import * as pactum from 'pactum';

export function notificationsTests() {
  describe('Notifications', function () {
    describe('Notification by ID', function () {
      it('Should throw error if user ID is wrong', () => {
        return pactum
          .spec()
          .post('/notifications/notification-by-id')
          .withBody({
            title: 'Test notification',
            message: 'This is a test notification',
            userId: '63c83a9dde184de0723358dd',
          })
          .expectStatus(400);
      });

      it('Should throw error if user is not subscribed to notifications', () => {
        return pactum
          .spec()
          .post('/notifications/notification-by-id')
          .withBody({
            title: 'Test notification',
            message: 'This is a test notification',
            userId: '63c83a9dde184de0723410dd',
          })
          .expectStatus(403);
      });

      it('Should send notification', () => {
        return pactum
          .spec()
          .post('/notifications/notification-by-id')
          .withBody({
            title: 'Test notification',
            message: 'This is a test notification',
            userId: '63dbff7f30fa6f9904095eb4',
          })
          .expectStatus(201);
      });
    });

    describe('Check notification by ID', function () {
      it('Should send notification', () => {
        return pactum
          .spec()
          .post('/notifications/check-notification-by-id')
          .withBody({
            _check_name: '63dbff7f30fa6f9904095eb4',
            _message: 'This is a test notification',
            _time: '2023-03-26T23:57:00Z',
          })
          .expectStatus(201);
      });
    });

    describe('Notification by token', function () {
      it('Should throw error if notification token is wrong', () => {
        return pactum
          .spec()
          .post('/notifications/notification-by-token')
          .withBody({
            title: 'Test notification',
            message: 'This is a test notification',
            notificationToken: '80274e9e-046b-41c0bf05d214',
          })
          .expectStatus(404);
      });

      it('Should send notification', () => {
        return pactum
          .spec()
          .post('/notifications/notification-by-token')
          .withBody({
            title: 'Test notification',
            message: 'This is a test notification',
            notificationToken: '2b1cbb94-c0d3-491b-a7b4-4c81ffde06b6',
          })
          .expectStatus(201);
      });
    });

    describe('Notification by email', function () {
      it('Should throw error if email does not exist', () => {
        return pactum
          .spec()
          .post('/notifications/notification-by-email')
          .withBody({
            title: 'Test notification',
            message: 'This is a test notification',
            email: 'fakeemail@mail.com',
          })
          .expectStatus(404);
      });

      it('Should throw error if user is not subscribed to notifications', () => {
        return pactum
          .spec()
          .post('/notifications/notification-by-email')
          .withBody({
            title: 'Test notification',
            message: 'This is a test notification',
            email: 'Admin@mail.com',
          })
          .expectStatus(403);
      });
      it('Should send notification', () => {
        return pactum
          .spec()
          .post('/notifications/notification-by-email')
          .withBody({
            title: 'Test notification',
            message: 'This is a test notification',
            email: 'eric@mail.com',
          })
          .expectStatus(201);
      });
    });
  });
}
