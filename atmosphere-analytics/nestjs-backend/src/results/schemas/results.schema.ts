import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';

export type ResultsDocument = Results & Document;

//MongoDB schema for a study
@Schema()
export class Results {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Study',
    required: true,
    unique: false,
    default: '',
  })
  study: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
    required: true,
    unique: false,
    default: '',
  })
  participant: string;

  @Prop({ required: true, default: [] })
  answers: Array<{ question: string; answer: string }>;

  @Prop({ required: true, default: 0 })
  index: number;

  @Prop({ required: true, type: Date })
  date: Date;
}

export const ResultsSchema = SchemaFactory.createForClass(Results);
