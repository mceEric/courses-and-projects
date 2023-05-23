import * as pactum from 'pactum';

export function influxDBTests() {
  describe('InfluxDB', function () {
    describe('Creating a notification check', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum
          .spec()
          .post('/influxdb/checks')
          .withBody({
            airSensorId: 'dsa',
            frequency: '1d',
            pm: 12,
          })
          .expectStatus(401);
      });

      it('Should create notification check', () => {
        return pactum
          .spec()
          .post('/influxdb/checks')
          .withBody({
            airSensorId: 'dsa',
            frequency: '1d',
            pm: 12,
          })
          .withHeaders({ Authorization: 'Bearer $S{participant-jwt}' })
          .expectStatus(422);
      });
    });

    describe('Getting a notification check', function () {
      it('Should get check', () => {
        return pactum
          .spec()
          .get('/influxdb/checks/63dbff7f30fa6f9904095eb4')
          .expectStatus(200);
      });
    });

    describe('Deleting a notification check', function () {
      it('Should throw error if no bearer token is sent', () => {
        return pactum.spec().delete('/influxdb/checks').expectStatus(401);
      });

      it('Should delete notification check', () => {
        return pactum
          .spec()
          .delete('/influxdb/checks')
          .withHeaders({ Authorization: 'Bearer $S{participant-jwt}' })
          .expectStatus(200);
      });
    });
  });
}
