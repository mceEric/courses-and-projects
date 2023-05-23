import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as dotenv from 'dotenv';
import { participantTests } from './e2e-test-utils/participant.e2e';
import { authTests } from './e2e-test-utils/auth.e2e';
import { adminTests } from './e2e-test-utils/admin.e2e';
import { notificationsTests } from './e2e-test-utils/notifications.e2e';
import { dataSensorTests } from './e2e-test-utils/data-sensor.e2e';
import { studyTests } from './e2e-test-utils/study.e2e';
import { resultsTests } from './e2e-test-utils/results.e2e';
import { influxDBTests } from './e2e-test-utils/influxdb-e2e-';
dotenv.config();

describe('AppController (e2e)', () => {
  describe('App e2e', function () {
    let app: INestApplication;
    beforeAll(async () => {
      jest.setTimeout(60000);
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = moduleRef.createNestApplication();
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
      await app.init();
      await app.listen(3001);
      pactum.request.setBaseUrl('http://127.0.0.1:3001');
    });
    afterAll(() => {
      app.close();
    });

    authTests();

    participantTests();

    notificationsTests();

    dataSensorTests();

    studyTests();

    resultsTests();

    influxDBTests();

    adminTests();
  });
});
