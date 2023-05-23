import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ParticipantModule } from './users/participant/participant.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ResearcherModule } from './users/researcher/researcher.module';
import { AdminModule } from './users/admin/admin.module';
import { NotificationsModule } from './notifications/notifications.module';
import { StudyModule } from './study/study.module';
import { InfluxDBModule } from './influxdb/influxdb.module';
import { DataSensorModule } from './data-sensor/data-sensor.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.test'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ParticipantModule,
    AuthModule,
    ResearcherModule,
    AdminModule,
    NotificationsModule,
    StudyModule,
    InfluxDBModule,
    DataSensorModule,
    ResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
