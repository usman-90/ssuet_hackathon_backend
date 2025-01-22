import { BadRequestException, Controller, Delete, Get, HttpCode, HttpStatus, Put, Query } from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { UserService } from './user.service';
import { UpdateUserDtoClient } from 'src/auth/dtos/requestDtos/signup.dto';

@Controller('user')
export class UserController {

    constructor(private user_service: UserService) { }

    @HttpCode(HttpStatus.OK)
    @Get('get_one_by_id')
    get_ngo_by_id(@Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.user_service.get_one_user_by_id(id)
    }


    @HttpCode(HttpStatus.OK)
    @Get('get_one_by_email')
    get_ngo_by_email(@Query("email") email: string) {
        return this.user_service.get_one_user_by_email(email)
    }

    @HttpCode(HttpStatus.OK)
    @Put('update_one_by_id')
    update_ngo_by_id(@Query("email") email: string, dto: UpdateUserDtoClient) {
        return this.user_service.update_one_by_email(email, dto)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete_one_by_email')
    delete_ngo_by_email(@Query("email") email: string) {
        return this.user_service.delete_one_by_email(email)
    }
}
