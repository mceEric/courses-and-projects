import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Researcher, ResearcherDocument } from '../schemas/researcher.shema';
import { UserDto } from '../dto/user.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable({})
export class ResearcherService {
  constructor(
    @InjectModel(Researcher.name)
    private researcherModel: Model<ResearcherDocument>,
  ) {}

  //Registers a researcher based on a given set of parameters
  async signup(dto: UserDto): Promise<ResearcherDocument> {
    const presentUsername = await this.findByEmail(dto.username);
    if (presentUsername) {
      throw new HttpException(
        'Participant email already exists.',
        HttpStatus.CONFLICT,
      );
    }
    const researcherSignup = new this.researcherModel(dto);
    return researcherSignup.save();
  }

  //Finds a researcher within database by their username
  async findByEmail(username: string): Promise<ResearcherDocument> {
    const researcher = await this.researcherModel.findOne({
      username: username,
    });
    return researcher;
  }

  //Finds a researcher within database by their mongodb ID
  async findByUserId(researcherId: string): Promise<ResearcherDocument> {
    const researcher = await this.researcherModel
      .findById(researcherId)
      .select('-password')
      .populate('createdStudy');

    return researcher;
  }

  //Finds a researcher within database by any requested value with respect to the researcher model
  async findByAny(valueToFind: any): Promise<ResearcherDocument> {
    const researcher = this.researcherModel
      .findOne(valueToFind)
      .select('-password');

    return researcher;
  }

  //Updates a researcher by their mongodb ID with any requested value with repect to the researcher model
  async updateById(
    userId: string,
    valuesToUpdate: any,
  ): Promise<ResearcherDocument> {
    const researcher = await this.researcherModel
      .findByIdAndUpdate(userId, valuesToUpdate, { new: true })
      .select('-password')
      .populate('createdStudy');

    return researcher;
  }
}
