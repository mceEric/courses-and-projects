import * as pactum from 'pactum';

export function participantTests() {
  describe('Participant', function () {
    describe('Updating participant model with notification token', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum
          .spec()
          .put('/participant/update-by-id')
          .withBody({
            notificationToken: '80274e9e-046b-41c0bf05d214',
          })
          .expectStatus(401);
      });

      it('Should add notification to requested users model', () => {
        return pactum
          .spec()
          .put('/participant/update-by-id')
          .withBody({
            notificationToken: 'test-notification-token',
          })
          .withHeaders({ Authorization: 'Bearer $S{participant-jwt}' })
          .expectStatus(200);
      });
    });

    describe('Appending enrolled studies to participant model', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum
          .spec()
          .put('/participant/append-enrolled-study')
          .withBody({
            studyId: '63d546710e4cb6f9f04bcf5e',
          })
          .expectStatus(401);
      });

      it('Should add notification token to requested users model', () => {
        return pactum
          .spec()
          .put('/participant/append-enrolled-study')
          .withBody({
            studyId: '63d546710e4cb6f9f04bcf5e',
          })
          .withHeaders({ Authorization: 'Bearer $S{participant-jwt}' })
          .expectStatus(200);
      });

      it('Should throw error if user is already enrolled within study', () => {
        return pactum
          .spec()
          .put('/participant/append-enrolled-study')
          .withBody({
            studyId: '63d546710e4cb6f9f04bcf5e',
          })
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(409);
      });
    });

    describe('Removing enrolled studies from participant model', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum
          .spec()
          .put('/participant/remove-enrolled-study')
          .withBody({
            studyId: '63d546710e4cb6f9f04bcf5e',
          })
          .expectStatus(401);
      });

      it('Should remove notification token from requested users model', () => {
        return pactum
          .spec()
          .put('/participant/remove-enrolled-study')
          .withBody({
            studyId: '63d546710e4cb6f9f04bcf5e',
          })
          .withHeaders({ Authorization: 'Bearer $S{participant-jwt}' })
          .expectStatus(200);
      });

      it('Should throw error if user is not enrolled within study', () => {
        return pactum
          .spec()
          .put('/participant/remove-enrolled-study')
          .withBody({
            studyId: '63d546710e4cb6f9f04bcf5e',
          })
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(404);
      });
    });
    describe('Getting participant information', function () {
      it('Should return participant', () => {
        return pactum
          .spec()
          .get('/participant/find-by-id/63dbff7f30fa6f9904095eb4')
          .expectStatus(200);
      });

      it('Should return notification tokens', () => {
        return pactum
          .spec()
          .get('/participant/get-notification-tokens')
          .expectStatus(200);
      });
    });
  });
}
