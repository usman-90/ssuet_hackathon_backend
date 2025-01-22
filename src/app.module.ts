import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://nomansiddique12424:bigetron123@cluster0.efzjjpk.mongodb.net/?retryWrites=true&w=majority/HeartHand'), AuthModule, NotificationsModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
