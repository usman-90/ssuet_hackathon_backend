import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, UseInterceptors } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { CreateNgoDto, UpdateNGODtoClient } from './dtos/request/create_ngo.dto';
import { isMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('NGO')
@Controller('ngo')
export class NgoController {

    constructor(private ngo_service: NgoService) { }

    @HttpCode(HttpStatus.OK)
    @Post('ngo/create')
    create_ngo(@Body() ngo: CreateNgoDto) {
        return this.ngo_service.create_s(ngo)
    }

    @HttpCode(HttpStatus.OK)
    @Post('ngo/update')
    update_ngo(@Body() ngo: UpdateNGODtoClient, @Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.ngo_service.update(ngo, new Types.ObjectId(id))
    }

    @HttpCode(HttpStatus.OK)
    @Delete('ngo/delete')
    delete_ngo(@Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.ngo_service.delete_ngo_by_id(new Types.ObjectId(id))
    }

    @HttpCode(HttpStatus.OK)
    @Get('ngo/get_one_by_id')
    get_ngo_by_id(@Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.ngo_service.get_ngo_by_id(id)
    }

    @HttpCode(HttpStatus.OK)
    @Get('ngo/get_all')
    get_all_ngos(@Query("page_no") page_no: number, @Query() q?: UpdateNGODtoClient) {
        return this.ngo_service.get_all_ngos(page_no, q)
    }

}
