import { Module } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NGO, NGOSchema } from 'src/schemas/ngo/ngo.schema';
import { Donation, DonationSchema } from 'src/schemas/donation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NGO.name, schema: NGOSchema}]),
    MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema}]),
  ],
  providers: [NgoService]
})
export class NgoModule {}
