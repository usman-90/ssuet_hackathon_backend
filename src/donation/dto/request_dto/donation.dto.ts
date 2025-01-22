import { PartialType } from '@nestjs/swagger';
import {
    IsEnum,
    IsInt,
    IsMongoId,
    IsOptional,
    IsString,
} from 'class-validator';
import { DONATION_TYPE } from 'src/schemas/donation.schema';

export class CreateDonationDto {
    @IsString()
    address: string 

    @IsEnum(DONATION_TYPE)
    @IsString()
    donation_type: DONATION_TYPE

    @IsString()
    item_type:string

    @IsInt()
    quantity:number

    @IsString()
    description:string

    @IsString()
    condition:string

    @IsMongoId()
    selected_ngo: string

    @IsString()
    selected_range:string

    @IsString()
    start_date:string

    @IsString()
    end_date:string

    @IsOptional()
    @IsString()
    notes:string
}

export class UpdateDonationDto extends PartialType(CreateDonationDto) { }

