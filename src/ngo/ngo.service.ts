import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNgoDto, UpdateNGODtoClient, UpdateNgoDtoDB } from './dtos/request/create_ngo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NGO } from 'src/schemas/ngo/ngo.schema';
import { Model, Types } from 'mongoose';
import { hashPassword } from 'src/utils/data.encryption';
import { DEFAULT_DOCUMENTS_LIMIT } from 'src/constants';

@Injectable()
export class NgoService {
    constructor(@InjectModel(NGO.name) private ngo_model: Model<NGO>) { }

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


    async get_all_ngos(page_no: number, dto?: UpdateNGODtoClient) {
        try {
            const skip = (page_no - 1) * DEFAULT_DOCUMENTS_LIMIT;
            return await this.ngo_model.find({ dto }).skip(skip).limit(DEFAULT_DOCUMENTS_LIMIT)
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

}
