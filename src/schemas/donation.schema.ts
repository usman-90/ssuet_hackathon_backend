import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { Coordinates } from 'src/commons/common.class';
import { IsString } from 'class-validator';
import { User } from './user_panel/user.schema';

export type DonationDocument = HydratedDocument<Donation>;

export class DonationMechanism {
    @IsString()
    donation_mechanism: string
    @IsString()
    donation_mechanism_type: string
}

export class DonationItems {
    clothes: number
    footwear: number
    stationery: number
    toys: number
    books: number
    clean_hygiene: number
    sanitizer_masks: number
    essential_staples: number
    packaged_goods: number
    baby_care: number
}

export enum DONATION_STATUS{
    PENDING="pending",
    PICKED_UP="picked_up",
    DELIVERED="delivered"
}

@Schema()
export class Donation {
    @Prop({ required: true, type: SchemaTypes.Mixed})
    address: string | Coordinates

    @Prop({required: true})
    donation_items : DonationItems

    @Prop({required: true})
    pickup_date:string

    @Prop({required: true})
    pickup_time_slot:string

    @Prop({required: true})
    pickup_notes:string

    @Prop({required: true})
    promo_code:string

    @Prop({required: true, type:String})
    status:DONATION_STATUS

    @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User | mongoose.Types.ObjectId;

}

export const DonationSchema = SchemaFactory.createForClass(Donation);
