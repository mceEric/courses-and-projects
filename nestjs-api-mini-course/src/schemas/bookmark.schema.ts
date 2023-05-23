import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema()
export class Bookmark {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  userId: string;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
