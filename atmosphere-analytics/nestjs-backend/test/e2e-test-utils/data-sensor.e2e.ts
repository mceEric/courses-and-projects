import * as pactum from 'pactum';

export function dataSensorTests() {
  describe('Data Sensor', function () {
    describe('Get air sensors by country code', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum
          .spec()
          .get('/data-sensor/country-sensors')
          .expectStatus(401);
      });

      it('Should throw error if no country code is present', () => {
        return pactum
          .spec()
          .get('/data-sensor/country-sensors')
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(500);
      });

      it('Should throw error if sensors exist within country', () => {
        return pactum
          .spec()
          .get('/data-sensor/country-sensors')
          .withBody({
            countryCode: 'ZZ',
          })
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(404);
      });

      it('Should receive country sensors.', () => {
        return pactum
          .spec()
          .get('/data-sensor/country-sensors')
          .withBody({
            countryCode: 'IE',
          })
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(200);
      });
    });

    describe('Get unique air sensors', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum
          .spec()
          .get('/data-sensor/unique-sensors')
          .expectStatus(401);
      });

      it('Should receive unique sensors', () => {
        return pactum
          .spec()
          .get('/data-sensor/unique-sensors')
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(200);
      });
    });

    describe('Get air sensors grouped by country', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum
          .spec()
          .get('/data-sensor/grouped-sensors')
          .expectStatus(401);
      });

      it('Should receive sensors grouped by country', () => {
        return pactum
          .spec()
          .get('/data-sensor/grouped-sensors')
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(200);
      });
    });

    describe('Get closest air sensor', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum
          .spec()
          .post('/data-sensor/closest-sensor')
          .expectStatus(401);
      });

      it('Should throw error if no latitude is present', () => {
        return pactum
          .spec()
          .post('/data-sensor/closest-sensor')
          .withBody({
            longitude: '-6.4421888',
          })
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(500);
      });

      it('Should throw error if no longitude is present', () => {
        return pactum
          .spec()
          .post('/data-sensor/closest-sensor')
          .withBody({
            latitude: '53.3987328',
          })
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(500);
      });

      it('Should throw error if no sensors are within proximity.', () => {
        return pactum
          .spec()
          .post('/data-sensor/closest-sensor')
          .withBody({
            latitude: '0.3987328',
            longitude: '0.4421888',
          })
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(404);
      });

      it('Should receive closest sensor.', () => {
        return pactum
          .spec()
          .post('/data-sensor/closest-sensor')
          .withBody({
            latitude: '53.3987328',
            longitude: '-6.4421888',
          })
          .withHeaders({
            Authorization: 'Bearer $S{participant-jwt}',
          })
          .expectStatus(201);
      });
    });
  });
}
