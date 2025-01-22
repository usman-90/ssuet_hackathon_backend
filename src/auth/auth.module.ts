import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user_panel/user.schema';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminService } from 'src/admin/admin.service';
import { Admin, AdminSchema } from 'src/schemas/admin.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Admin.name, schema: AdminSchema}]),
        UserModule,
    ],
    providers: [AuthService, UserService, JwtService, NotificationsService, AdminService],
})
export class AuthModule { }
