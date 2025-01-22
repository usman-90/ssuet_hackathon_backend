import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user_panel/user.schema';
import { NGO } from './ngo/ngo.schema';

export type DonationDocument = HydratedDocument<Donation>;

export enum DONATION_TYPE{
    DISPOSE_CLOTHE="disposal",
    DONATE_CLOTHES="donation"
}

export enum DONATION_STATUS{
    PENDING="pending",
    PICKED_UP="picked_up",
    DELIVERED="delivered"
}

@Schema()
export class Donation {
    @Prop({ required: true, type: String})
    address: string 

    @Prop({required: true})
    donation_type: DONATION_TYPE

    @Prop({required: true})
    item_type:string


    @Prop({required: true})
    quantity:number

    @Prop({required: true})
    description:string

    @Prop({required: true})
    condition:string

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId , ref:"NGO"})
    selected_ngo:NGO | mongoose.Types.ObjectId

    @Prop({required: true})
    selected_range:string

    @Prop({required: true})
    start_date:string

    @Prop({required: true})
    end_date:string

    @Prop({required: true})
    notes:string

    @Prop({required: true, type:String, default: DONATION_STATUS.PENDING})
    status:DONATION_STATUS

    @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User | mongoose.Types.ObjectId;

    @Prop({default: new Date()})
    created_at: Date

}

export const DonationSchema = SchemaFactory.createForClass(Donation);
