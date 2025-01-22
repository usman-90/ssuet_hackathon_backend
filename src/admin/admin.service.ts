import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    CreateAdminDto,
  UpdateAdminDtoClient,
} from 'src/auth/dtos/requestDtos/signup.dto';
import { Admin } from 'src/schemas/admin.schema';

@Injectable()
export class AdminService{
  constructor(@InjectModel(Admin.name) private admin_model: Model<Admin>) {}

  async create(dto: CreateAdminDto) {
    const created_user = new this.admin_model(dto);
    return created_user.save();
  }


  async get_one_admin_by_email(email: string) {
    return this.admin_model.findOne({ email }).exec();
  }

  async update_one_by_email(email: string, dto: UpdateAdminDtoClient) {
    return this.admin_model.updateOne({ email }, dto).exec();
  }
}
