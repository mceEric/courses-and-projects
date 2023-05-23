import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next: NextFunction) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (error: Error, newSalt: string) => {
    if (error) return next(error);
    bcrypt.hash(this.password, newSalt, (error: Error, newHash: string) => {
      if (error) return next(error);
      this.password = newHash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (
  givenPassword: string,
  userPassword: string,
) {
  try {
    const auth = await bcrypt.compare(givenPassword, userPassword);
    return auth;
  } catch (error) {
    console.log(error);
    return error;
  }
};
