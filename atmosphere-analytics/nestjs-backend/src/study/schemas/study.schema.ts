import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudyDocument = Study & Document;

//MongoDB schema for a study
@Schema()
export class Study {
  @Prop({ unique: true, required: true, default: '' })
  name: string;

  @Prop({ required: true, default: '' })
  shortName: string;

  @Prop({ required: true, defualt: '' })
  description: string;

  @Prop({ required: true, default: '' })
  objective: string;

  @Prop({ required: true, default: '' })
  frequency: string;

  @Prop({ required: true, default: [] })
  questionnaire: Array<{ question: string; answers: Array<string> }>;
}

export const StudySchema = SchemaFactory.createForClass(Study);
