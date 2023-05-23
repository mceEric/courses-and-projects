import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export type ResearcherDocument = Researcher & Document;

//MongoDB schema for a researcher
@Schema()
export class Researcher {
  @Prop({ required: true, unique: true })
  username: string; //This is email, decalred as username

  @Prop({ required: true, unique: false })
  password: string;

  @Prop({ required: true, unique: false })
  firstName: string;

  @Prop({ required: true, unique: false })
  lastName: string;

  @Prop({ required: true, unique: false, default: false })
  isAdmin: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Study',
    required: false,
    unique: false,
  })
  createdStudy: string;
}

export const ResearcherSchema = SchemaFactory.createForClass(Researcher);

//This function will encrypt a password before it is registerd to the database
ResearcherSchema.pre('save', function (next: NextFunction) {
  if (!this.isModified('password')) {
    return next();
  }

  //Uses a salt value of 10
  bcrypt.genSalt(10, (error: Error, newSalt: string) => {
    if (error) return next(error);
    bcrypt.hash(this.password, newSalt, (error: Error, newHash: string) => {
      if (error) return next(error);
      this.password = newHash;
      next();
    });
  });
});
