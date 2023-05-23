import * as pactum from 'pactum';

export function studyTests() {
  describe('Study', function () {
    describe('Get studies', () => {
      it('Should receive studies', () => {
        return pactum.spec().get('/studies').expectStatus(200);
      });
    });
  });
}
