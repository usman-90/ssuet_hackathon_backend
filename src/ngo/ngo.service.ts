import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNgoDto, UpdateNGODtoClient, UpdateNgoDtoDB } from './dtos/request/create_ngo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NGO } from 'src/schemas/ngo/ngo.schema';
import { Model, Types } from 'mongoose';
import { hashPassword } from 'src/utils/data.encryption';
import { DEFAULT_DOCUMENTS_LIMIT } from 'src/constants';
import { Donation, DONATION_STATUS } from 'src/schemas/donation.schema';

@Injectable()
export class NgoService {
    constructor(@InjectModel(NGO.name) private ngo_model: Model<NGO>, @InjectModel(Donation.name) private donation_model: Model<Donation>) { }

    create(dto: CreateNgoDto) {
        const created_ngo = new this.ngo_model(dto);
        return created_ngo.save();
    }

    async create_s(dto: CreateNgoDto) {
        try {
            dto.password = await hashPassword(dto.password)
            return await this.create(dto)
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }


    async update(dto: UpdateNgoDtoDB | UpdateNGODtoClient, id: Types.ObjectId) {
        try {
            return await this.ngo_model.updateOne({ _id: id }, dto)
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }

    async delete_ngo_by_id(id: Types.ObjectId) {
        try {
            return await this.ngo_model.deleteOne({ _id: id })
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }


    async get_all_ngos(page_no: number) {
        try {
            const skip = (page_no - 1) * DEFAULT_DOCUMENTS_LIMIT;
            const total = await this.ngo_model.countDocuments({ }).skip(skip).limit(DEFAULT_DOCUMENTS_LIMIT)
            const ngos = await this.ngo_model.find({ }).skip(skip).limit(DEFAULT_DOCUMENTS_LIMIT)
            return { total, ngos }
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }

    async get_ngo_by_email(email: string) {
        try {
            return await this.ngo_model.findOne({ email })
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }

    async get_ngo_by_id(id: string) {
        try {
            return await this.ngo_model.findOne({ _id: new Types.ObjectId(id) })
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e)
        }
    }

    async get_ngo_dashboard_data(
        month: number,
        year: number,
        ngo_id: string
    ) {
        let startOfMonth = new Date(Date.UTC(year, month, 1)); // Start of the month
        let startOfNextMonth = new Date(Date.UTC(year, month + 1, 1)); // Start of the next month

        const total_donation = await this.donation_model
            .countDocuments({
                _id: new Types.ObjectId(ngo_id),
                created_at: {
                    $gte: startOfMonth,
                    $lt: startOfNextMonth,
                },
            })
            .exec();
        const active_donations = await this.donation_model
            .countDocuments({
                _id: new Types.ObjectId(ngo_id),
                $or: [
                    { status: DONATION_STATUS.PENDING },
                    { status: DONATION_STATUS.PICKED_UP}
                ]
            })
            .exec();

            return {total_donation, active_donations}
    }

}
