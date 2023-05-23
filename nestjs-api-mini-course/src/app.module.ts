import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
