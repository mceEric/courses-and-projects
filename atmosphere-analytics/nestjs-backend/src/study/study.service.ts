import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudyDto } from './dto/study.dto';
import { Study, StudyDocument } from './schemas/study.schema';
import { ResultsService } from '../results/results.service';
import { ParticipantsService } from '../users/participant/participant.service';

@Injectable()
export class StudyService {
  constructor(
    @InjectModel(Study.name)
    private studyModel: Model<StudyDocument>,
    private participantService: ParticipantsService,
    @Inject(forwardRef(() => ResultsService))
    private resultsService: ResultsService,
  ) {}

  // Retreives all studies within the database
  async getAll() {
    const studies = await this.studyModel.find();
    return studies;
  }

  // Retrieves all necessarry metrics regarding a study 
  async getStudyData(id: string) {
    const study = await this.studyModel.findById(id);
    const participants = await this.participantService.findManyByAny({
      enrolledStudies: [id],
    });
    const results = await this.resultsService.getStudyResults(id);
    const studyData = { study, participants, results };

    return studyData;
  }

  // Finds a indivdual study by its name
  async findByName(name: string): Promise<StudyDocument> {
    const study = await this.studyModel.findOne({ name });

    return study;
  }

    // Finds a indivdual study by its id
  async findById(studyId: string): Promise<StudyDocument> {
    const study = await this.studyModel.findById(studyId);

    return study;
  }

  // Creates a study
  async create(dto: StudyDto): Promise<StudyDocument> {
    const study = await this.studyModel.create(dto);

    return study;
  }
}
