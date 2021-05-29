import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { ConfidenceResult } from 'src/source-of-truth/confidence-result';
import { currencies } from 'src/source-of-truth/currencies';
import { JobInterval } from 'src/source-of-truth/intervals';
import { occupations } from 'src/source-of-truth/occupations';
import { SalaryEntity } from '../salary.entity';

export class GetSalariesInputDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(occupations)
  @IsNotEmpty()
  occupation: string;

  @IsEnum(currencies)
  @IsString()
  @IsNotEmpty()
  currency: string;
}

export class GetSalariesOutputDto {
  quantitySalaries: number;
  lastUpdate: string;
  averageBasePay: number;
  currency: string;
  lowerSalary: number;
  higherSalary: number;
  location: string;
  interval: JobInterval;
  occupation: string;
  confidenceResult: ConfidenceResult;
  salaries: SalaryEntity[];
  meta: IPaginationMeta;
}
