import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from 'notifications/notifications.module';
import { NotificationsService } from 'notifications/notifications.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, NotificationsModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
