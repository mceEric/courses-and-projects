import { IsNotEmpty, IsString } from 'class-validator';

export class StudyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  objective: string;

  @IsNotEmpty()
  @IsString()
  frequency: string;

  @IsNotEmpty()
  questionnaire: Array<{ question: string; answers: Array<string> }>;
}
