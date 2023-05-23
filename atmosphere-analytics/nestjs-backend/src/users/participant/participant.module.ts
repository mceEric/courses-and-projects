import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantsController } from './participant.controller';
import { ParticipantsService } from './participant.service';
import { Participant, ParticipantSchema } from '../schemas/paticipant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService],
})
export class ParticipantModule {}
