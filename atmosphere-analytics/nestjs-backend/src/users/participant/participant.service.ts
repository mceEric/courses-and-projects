import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Participant, ParticipantDocument } from '../schemas/paticipant.schema';
import { UserDto } from '../dto/user.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
  ) {}

  //Registers a participant based on a given set of parameters
  async signup(dto: UserDto): Promise<ParticipantDocument> {
    const presentUsername = await this.findByEmail(dto.username);
    if (presentUsername) {
      throw new HttpException(
        'Participant email already exists.',
        HttpStatus.CONFLICT,
      );
    }
    const participantSignup = new this.participantModel(dto);
    return participantSignup.save();
  }

  //Finds a participant within database by their username
  async findByEmail(username: string): Promise<ParticipantDocument> {
    const participant = await this.participantModel
      .findOne({
        username: username,
      })
      .populate('enrolledStudies');

    return participant;
  }

  // Gets all participant notification tokens that are not null 
  async getNotificationTokens() {
    const notificationTokens = await this.participantModel.find(
      {
        notificationToken: { $ne: null },
      },
      {
        _id: 0,
        notificationToken: 1,
      },
    );

    return notificationTokens;
  }

  //Finds a participant within database by their mongodb ID
  async findByUserId(participantId: string): Promise<ParticipantDocument> {
    const participant = await this.participantModel
      .findById(participantId)
      .select('-password');

    return participant;
  }

  //Finds a participant within database by any requested value with respect to the participant model
  async findByAny(valueToFind: any): Promise<ParticipantDocument> {
    const participant = this.participantModel
      .findOne(valueToFind)
      .select('-password')
      .populate('enrolledStudies');

    return participant;
  }

  // Find many participants by any parameter provided
  async findManyByAny(valueToFind: any): Promise<Array<ParticipantDocument>> {
    const participant = this.participantModel
      .find(valueToFind)
      .select('-password')
      .populate('enrolledStudies');

    return participant;
  }

  //Updates a participant by their mongodb ID with any requested value with repect to the participant model
  async updateById(
    userId: string,
    valuesToUpdate: any,
  ): Promise<ParticipantDocument> {
    const participant = await this.participantModel
      .findByIdAndUpdate(userId, valuesToUpdate, { new: true })
      .select('-password')
      .populate('enrolledStudies');

    if (!participant) {
      throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);
    }

    return participant;
  }

  // Appends a new study ID to the requested participants model
  async appendEnrolledStudy(
    userId: string,
    studyId: string,
  ): Promise<ParticipantDocument> {
    const participant = await this.findByUserId(userId);

    if (participant.enrolledStudies.includes(studyId)) {
      throw new HttpException(
        'Participant is already enrolled in requested study.',
        HttpStatus.CONFLICT,
      );
    }

    participant.enrolledStudies = participant.enrolledStudies.concat([studyId]);
    await participant.save();
    return participant.populate('enrolledStudies');
  }

  // Removes an existing study ID from the requested participants model
  async removeEnrolledStudy(
    userId: string,
    studyId: string,
  ): Promise<ParticipantDocument> {
    const participant = await this.findByUserId(userId);

    if (!participant.enrolledStudies.includes(studyId)) {
      throw new HttpException(
        'Participant is not enrolled in requested study.',
        HttpStatus.NOT_FOUND,
      );
    }

    (participant.enrolledStudies = participant.enrolledStudies.filter(
      (study) => {
        return !new mongoose.Types.ObjectId(study).equals(
          new mongoose.Types.ObjectId(studyId),
        );
      },
    )),
      await participant.save();
    return participant.populate('enrolledStudies');
  }
}
