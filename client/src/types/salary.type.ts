import { IAbstractEntity } from "../common/abstract.type";
import { ConfidenceResult } from "./confidence-result.type";
import { IPaginationLinks, IPaginationMeta } from "./pagination.type";

export enum JobInterval {
  PER_HOUR = "Per Hour",
  MONTHLY = "Monthly",
  ANNUALY = "Annualy",
}

export interface ICreateSalary {
  amount: number;
  interval: JobInterval;
  currency: string;
  yearsOfExperience: number;
  location: string;
  occupation: string;
  company: string;
}

export type ISalaryEntity = IAbstractEntity & ICreateSalary;

export interface ISalariesResult {
  quantitySalaries: number;
  lastUpdate: string;
  averageBasePay: number;
  currency: string;
  lowerSalary: number;
  higherSalary: number;
  location: string;
  occupation: string;
  interval: JobInterval;
  confidenceResult: ConfidenceResult;
  salaries: ISalaryEntity[];
  meta: IPaginationMeta;
}

export interface ISalariesResultPagination {
  items: ISalaryEntity[];
  meta: IPaginationMeta;
}
