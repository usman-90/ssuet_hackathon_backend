import { Optional } from "@nestjs/common";
import { OmitType, PartialType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumberString, IsString } from "class-validator";
import { NGO_TYPES } from "src/schemas/ngo/ngo.schema";


export class CreateNgoDto{
    @IsString()
    name: string;

    @IsNumberString()
    registration_no: string;

    @IsEnum(NGO_TYPES)
    type: NGO_TYPES;

    @IsString()
    @Optional()
    purpose: string;

    @IsString()
    country: string;

    @IsNumberString()
    phone_number: string;

    @IsString()
    address: string;

    @IsString()
    contact_person_name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class UpdateNGODtoClient extends PartialType(
  OmitType(CreateNgoDto, ['password'] as const),
) {}

export class UpdateNgoDtoDB extends PartialType(CreateNgoDto) { }
