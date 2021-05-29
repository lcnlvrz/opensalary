import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';
import { currencies } from 'src/source-of-truth/currencies';
import { JobInterval } from 'src/source-of-truth/intervals';
import { occupations } from 'src/source-of-truth/occupations';
import { LocationValidator } from '../../../custom-validators/location.validator';

export class CreateSalaryDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(occupations)
  @IsString()
  @IsNotEmpty()
  occupation: string;

  @IsEnum(JobInterval)
  @IsString()
  @IsNotEmpty()
  interval: JobInterval;

  @IsEnum(currencies)
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsPositive()
  yearsOfExperience: number;

  @IsString()
  @IsNotEmpty()
  @Validate(LocationValidator)
  location: string;

  @IsString()
  @IsNotEmpty()
  company: string;
}
