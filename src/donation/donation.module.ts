import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from 'src/schemas/donation.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema}]),
  ],
  controllers: [DonationController],
  providers: [DonationService, JwtService]
})
export class DonationModule {}
