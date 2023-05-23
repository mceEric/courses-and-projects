import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.userModel.findOne({ username: dto.username });
    if (!user) {
      throw new Error('username was not found, please try again.');
    }

    const passwordMatch = await user.schema.methods.comparePassword(
      dto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new Error('Password was incorrect, please try again.');
    }

    return this.signJwt(user._id, user.email);
  }

  async signup(dto: AuthDto) {
    const userSignup = new this.userModel(dto);
    return userSignup.save();
  }

  async signJwt(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = process.env.JWT_SECRET;

    const jwtToken = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return { accessToken: jwtToken };
  }
}
