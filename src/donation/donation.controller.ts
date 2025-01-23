import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DonationService } from './donation.service';
import {  CreateDonationDto, UpdateDonationDto } from './dto/request_dto/donation.dto';
import { UserPayloadRequest } from 'src/commons/interfaces/user_payload_request.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Donations')
@Controller('donation')
export class DonationController {

    constructor(private donation_service: DonationService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('create')
    create_donation(@Body() d: CreateDonationDto, @Req() req: UserPayloadRequest) {
        return this.donation_service.create({ user: new Types.ObjectId(req.user.id), ...d })
    }

    @HttpCode(HttpStatus.OK)
    @Post('update')
    update_donation(@Body() d: UpdateDonationDto, @Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.donation_service.update(d, new Types.ObjectId(id))
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    delete_ngo(@Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.donation_service.delete_donation_by_id(new Types.ObjectId(id))
    }

    @HttpCode(HttpStatus.OK)
    @Get('get_one_by_id')
    get_ngo_by_id(@Query("id") id: string) {
        if (!isMongoId(id)) throw new BadRequestException("invalid mongo id")
        return this.donation_service.get_donation_by_id(id)
    }

    @HttpCode(HttpStatus.OK)
    @Get('get_all')
    get_all_ngos(@Query("page_no") page_no: number) {
        return this.donation_service.get_all_donations(page_no)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('get_all_user_donations')
    get_all_user_donation(@Query("page_no") page_no: number, @Req() req: UserPayloadRequest) {
        return this.donation_service.get_all_user_donations(req.user.id, page_no)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('get_user_donation_by_id')
    get_user_donation_by_id(@Query("donation_id") id: string, @Req() req: UserPayloadRequest) {
        return this.donation_service.get_donation_by_user_id(id, req.user.id)
    }

    @HttpCode(HttpStatus.OK)
    @Get('get_all_ngo_donations')
    get_all_ngo_donation(@Query("page_no") page_no: number, @Query("ngo_id") ngo_id : string) {
        return this.donation_service.get_all_ngo_donations(ngo_id, page_no)
    }

    @HttpCode(HttpStatus.OK)
    @Get('admin/get_all_user_donations')
    get_all_user_donation_admin(@Query("page_no") page_no: number,@Query("user_id") user_id:string) {
        return this.donation_service.get_all_user_donations(user_id, page_no)
    }

    @HttpCode(HttpStatus.OK)
    @Get('get_donation_no_by_status')
    siasodfn() {
        return this.donation_service.get_donation_no_by_status()
    }

}
