import { Injectable } from '@nestjs/common';
import { ParticipantsService } from '../participant/participant.service';
import { StudyService } from '../../study/study.service';
import { StudyDto } from '../../study/dto/study.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { StudyDocument } from '../../study/schemas/study.schema';
import { ResearcherService } from '../researcher/researcher.service';
import { ResearcherDocument } from '../schemas/researcher.shema';

@Injectable({})
export class AdminService {
  constructor(
    private participantService: ParticipantsService,
    private researcherService: ResearcherService,
    private studyService: StudyService,
  ) {}

  // Deletes a participant by their mongodb ID, if and only if the requested user is an admin
  async deleteParticipant(user: any, participantId: string) {
    if (!user.isAdmin) {
      throw new HttpException(
        'Admin access required in order to perform this action.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const participant = await this.participantService.findByUserId(
      participantId,
    );
    if (!participant) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }
    return await participant.remove();
  }

  // Creates a study
  async createStudy(dto: StudyDto, user: any): Promise<ResearcherDocument> {
    const presentStudy = await this.studyService.findByName(dto.name);
    if (presentStudy) {
      throw new HttpException(
        'Study name already exists.',
        HttpStatus.CONFLICT,
      );
    }

    const createdStudy = await this.studyService.create(dto);
    const researcher = await this.researcherService.updateById(user._id, {
      createdStudy,
    });

    return researcher;
  }

  // Deletes a study based on its id
  async deleteStudy(studyId: string, user: any): Promise<any> {
    if (!user.isAdmin) {
      throw new HttpException(
        'Only admins are authorised to perform this action.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const researcher = await this.researcherService.findByEmail(user.username);
    const presentStudy = await this.studyService.findById(
      researcher.createdStudy,
    );
    if (!presentStudy) {
      throw new HttpException('Study does not exist.', HttpStatus.NOT_FOUND);
    }

    const deletedStudy = await presentStudy.delete();
    await this.researcherService.updateById(user._id, { createdStudy: null });
    return deletedStudy;
  }
}
