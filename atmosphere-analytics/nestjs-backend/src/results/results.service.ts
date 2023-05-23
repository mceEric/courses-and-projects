import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultsDto } from './dto/results.dto';
import { Results, ResultsDocument } from './schemas/results.schema';
import { ParticipantsService } from '../users/participant/participant.service';
import { StudyService } from '../study/study.service';
import { InfluxDBService } from '../influxdb/influxdb.service';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Results.name)
    private resultsModel: Model<ResultsDocument>,
    private participantService: ParticipantsService,
    @Inject(forwardRef(() => StudyService))
    private studyService: StudyService,
    private influxService: InfluxDBService,
  ) {}

  // returns a participants results based on ID parameter
  async getParticipantsResults(id: string): Promise<Array<ResultsDocument>> {
    const results = await this.resultsModel.find({ participant: id });

    return results;
  }

  // returns a all results for a study based on ID parameter
  async getStudyResults(id: string): Promise<Array<ResultsDocument>> {
    const results = await this.resultsModel
      .find({ study: id })
      .populate('participant');
    return results;
  }

  // Returns the overall consensus value quantile of the questionnaire answers
  getValuationQuantile(totalAnswers: number, totalValuationPoints: number) {
    for (let i = 0; i < 5; i++) {
      if (totalAnswers * (0.2 * i) >= totalValuationPoints) {
        if (i == 0) {
          return 0;
        }
        return Math.abs(totalValuationPoints - totalAnswers * (0.2 * (i - 1))) >
          Math.abs(totalValuationPoints - totalAnswers * (0.2 * i))
          ? i
          : i - 1;
      }
    }
    return 4;
  }

  // Creates a result for a user
  async createResult(userId: string, dto: ResultsDto) {
    const user = await this.participantService.findByUserId(userId);
    const study = await this.studyService.findById(dto.study);
    study.questionnaire;

    let totalValuationPoints = 0;
    let totalAnswers = 0;

    for (let i = 0; i < dto.answers.length; i++) {
      totalValuationPoints += study.questionnaire[i].answers.indexOf(
        dto.answers[i].answer,
      );
      totalAnswers += study.questionnaire[i].answers.length;
    }

    const range = this.getValuationQuantile(totalAnswers, totalValuationPoints);

    const newPm = user.pm + (range - 2);

    await this.resultsModel.create({
      study: dto.study,
      participant: userId,
      answers: dto.answers,
      date: dto.date,
      index: range,
    });

    user.lastCheck = null;
    if (newPm >= 0 && user.pm != newPm) {
      user.pm = newPm;
      this.influxService.createCheck(
        user.airSensorId,
        study.frequency,
        newPm,
        user,
      );
    }
    user.lastResultSubmission = dto.date;
    await user.save();

    return user.populate('enrolledStudies');
  }
}
