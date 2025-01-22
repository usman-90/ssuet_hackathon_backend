import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Donation } from 'src/schemas/donation.schema';
import { CreateDonationDto, UpdateDonationDto } from './dto/request_dto/donation.dto';
import { DEFAULT_DOCUMENTS_LIMIT } from 'src/constants';

@Injectable()
export class DonationService {
    constructor(@InjectModel(Donation.name) private donation_model: Model<Donation>) { }

    create(dto: CreateDonationDto) {
        const created_don = new this.donation_model(dto);
        return created_don.save();
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

    async get_all_donations(page_no: number, dto?: UpdateDonationDto) {
        try {
            const skip = (page_no - 1) * DEFAULT_DOCUMENTS_LIMIT;
            return await this.donation_model.find({ dto }).skip(skip).limit(DEFAULT_DOCUMENTS_LIMIT)
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


}

