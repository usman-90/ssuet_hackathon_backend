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
    @IsNotEmpty()
    address: string | Coordinates;

    @IsString()
    donation_mechanism: string

    @IsString()
    donation_mechanism_type: string

    @Type(() => DonationItems)
    donation_items: DonationItems

    @IsDate()
    pickup_date: Date

    @IsString()
    pickup_time_slot: string

    @IsString()
    pickup_notes: string

    @IsString()
    promo_code: string
}

export class UpdateDonationDto extends PartialType(CreateDonationDto) { }

