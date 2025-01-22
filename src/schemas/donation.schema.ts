import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Coordinates } from 'src/commons/common.class';
import { IsString } from 'class-validator';

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

@Schema()
export class Donation {
    @Prop({ required: true })
    address: string | Coordinates

    @Prop({ required: true })
    donation_mechanism: string

    @Prop({ required: true })
    donation_mechanism_type: string

    @Prop({required: true})
    donation_items : DonationItems

    @Prop({required: true})
    pickup_date:Date

    @Prop({required: true})
    pickup_time:string

    @Prop({required: true})
    pickup_notes:string


    @Prop({required: true})
    promo_code:string
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
