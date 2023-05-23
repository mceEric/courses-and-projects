import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearcherController } from './researcher.controller';
import { ResearcherService } from './researcher.service';
import { Researcher, ResearcherSchema } from '../schemas/researcher.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Researcher.name, schema: ResearcherSchema },
    ]),
  ],
  controllers: [ResearcherController],
  providers: [ResearcherService],
  exports: [ResearcherService],
})
export class ResearcherModule {}
