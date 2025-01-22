import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { Coordinates } from 'src/commons/common.class';
import { DonationItems } from 'src/schemas/donation.schema';

export class CreateDonationDto {
    /*
    * address me address ki string bhi bhej skte hen
    *
    */
    address: string | Coordinates;

    donation_items: DonationItems

    @IsString()
    pickup_date: string

    @IsString()
    pickup_time_slot: string

    @IsString()
    pickup_notes: string

    @IsString()
    promo_code: string
}

export class UpdateDonationDto extends PartialType(CreateDonationDto) { }

