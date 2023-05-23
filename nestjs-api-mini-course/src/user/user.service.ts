import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, dto)
      .setOptions({ overwrite: true, new: true });

    if (!user) {
      throw new Error('User was not found!');
    }
    return user;
  }
}
