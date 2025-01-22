import { Module } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NGO, NGOSchema } from 'src/schemas/ngo/ngo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NGO.name, schema: NGOSchema}]),
  ],
  providers: [NgoService]
})
export class NgoModule {}
