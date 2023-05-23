import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ResultsDto {
  @IsNotEmpty()
  @IsString()
  study: string;
  
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  answers: Array<{ question: string; answer: string }>;
}
