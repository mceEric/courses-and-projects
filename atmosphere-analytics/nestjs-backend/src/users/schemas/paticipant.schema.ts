import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export type ParticipantDocument = Participant & Document;

//MongoDB schema for a participant
@Schema()
export class Participant {
  @Prop({ required: true, unique: true })
  username: string; //This is email, decalred as username

  @Prop({ required: true, unique: false })
  password: string;

  @Prop({ required: true, unique: false })
  firstName: string;

  @Prop({ required: true, unique: false })
  lastName: string;

  @Prop({ unique: false, default: null })
  notificationToken: string;

  @Prop({ unique: false, default: null })
  airSensorId: string;

  @Prop({ unique: false, default: 10 })
  pm: number;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Study',
    required: true,
    unique: false,
    default: [],
  })
  enrolledStudies: Array<string>;

  @Prop({ required: false, unique: false })
  lastCheck: string;

  @Prop({ required: false, unique: false, type: Date, default: Date.now })
  lastResultSubmission: Date;

  @Prop({ required: true, unique: false, default: false })
  isAdmin: boolean;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

//This function will encrypt a password before it is registerd to the database
ParticipantSchema.pre('save', function (next: NextFunction) {
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
