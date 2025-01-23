import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, UseInterceptors } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { CreateNgoDto, UpdateNGODtoClient } from './dtos/request/create_ngo.dto';
import { isMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('NGO')
@Controller('ngo')
export class NgoController {

    constructor(private ngo_service: NgoService) { }

    @HttpCode(HttpStatus.OK)
    @Post('create')
    create_ngo(@Body() ngo: any) {
        return this.ngo_service.create_s(ngo)
    }

    @HttpCode(HttpStatus.OK)
    @Post('update')
    update_ngo(@Body() ngo: UpdateNGODtoClient, @Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.ngo_service.update(ngo, new Types.ObjectId(id))
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    delete_ngo(@Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.ngo_service.delete_ngo_by_id(new Types.ObjectId(id))
    }

    @HttpCode(HttpStatus.OK)
    @Get('get_one_by_id')
    get_ngo_by_id(@Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.ngo_service.get_ngo_by_id(id)
    }

    @HttpCode(HttpStatus.OK)
    @Get('get_all')
    get_all_ngos(@Query("page_no") page_no: number) {
        return this.ngo_service.get_all_ngos(page_no)
    }

    @HttpCode(HttpStatus.OK)
    @Get('get_ngo_dashboard_data')
    some(@Query("month") month: number, @Query("year") year: number, @Query("ngo_id") ngo_id: string) {
        if (!isMongoId(ngo_id)) throw new BadRequestException("invalid mongo id")
        return this.ngo_service.get_ngo_dashboard_data(month, year, ngo_id)
    }


    @HttpCode(HttpStatus.OK)
    @Get('get_admin_dashboard_data')
    async asd(@Query("month") month: number, @Query("year") year: number) {
        const donation_data = await this.ngo_service.get_donation_dashboard_data(month, year)
        const ngo_data = await this.ngo_service.get_all_ngo_dashboard_data(month, year)
        const user_data = await this.ngo_service.get_all_user_dashboard_data(month, year)

        return { donation_data, ngo_data, user_data }
    }


}
