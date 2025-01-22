import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Donation } from 'src/schemas/donation.schema';
import { CreateDonationDto, UpdateDonationDto } from './dto/request_dto/donation.dto';
import { DEFAULT_DOCUMENTS_LIMIT } from 'src/constants';

@Injectable()
export class DonationService {
    constructor(@InjectModel(Donation.name) private donation_model: Model<Donation>) { }

    async create(dto: CreateDonationDto) {
        const created_don = new this.donation_model(dto);
        return await created_don.save();
    }

    async update(dto: UpdateDonationDto, id: Types.ObjectId) {
        try {
            return await this.donation_model.updateOne({ _id: id }, dto)
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }


    async delete_donation_by_id(id: Types.ObjectId) {
        try {
            return await this.donation_model.deleteOne({ _id: id })
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }

    async get_all_donations(page_no: number) {
        try {
            const skip = (page_no - 1) * DEFAULT_DOCUMENTS_LIMIT;
            return await this.donation_model.find({}).skip(skip).limit(DEFAULT_DOCUMENTS_LIMIT)
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }


    async get_donation_by_id(id: string) {
        try {
            return await this.donation_model.findOne({ _id: new Types.ObjectId(id) })
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }

    async get_donation_by_user_id(id: string, user_id: string) {
        try {
            return await this.donation_model.findOne({ _id: new Types.ObjectId(id), user: new Types.ObjectId(user_id) })
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }


    async get_all_user_donations(user_id: string, page_no: number) {
        try {
            const skip = (page_no - 1) * DEFAULT_DOCUMENTS_LIMIT;
            return await this.donation_model.find({ user: new Types.ObjectId(user_id) }).skip(skip).limit(DEFAULT_DOCUMENTS_LIMIT)
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }

}

