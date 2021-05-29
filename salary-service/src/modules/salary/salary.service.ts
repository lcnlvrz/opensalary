import { Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dtos/create-salary.dto';
import { SalaryEntity } from './salary.entity';
import { SalaryRepository } from './salary.repository';
import * as CC from 'currency-converter-lt';
import { JobInterval } from 'src/source-of-truth/intervals';

import { ConfidenceResult } from 'src/source-of-truth/confidence-result';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SalaryService {
  constructor(private readonly salaryRepository: SalaryRepository) {}

  async createSalary(
    dto: CreateSalaryDto,
    userId: number,
  ): Promise<SalaryEntity> {
    const salary = this.salaryRepository.create(dto);
    salary.userId = userId;
    return await this.salaryRepository.save(salary);
  }

  async getManySalariesByOccupationLocationAndPagination(
    location: string,
    occupation: string,
    limit: number,
    page: number,
  ): Promise<Pagination<SalaryEntity>> {
    const queryBuilder = await this.salaryRepository
      .createQueryBuilder('salary')
      .where('lower(salary.location) = :location', {
        location: location.toLowerCase(),
      })
      .andWhere('lower(salary.occupation) = :occupation', {
        occupation: occupation.toLowerCase(),
      })
      .orderBy('salary.updatedAt', 'DESC');

    return paginate<SalaryEntity>(queryBuilder, { limit, page });
  }

  async getManySalariesByOccupationLocationCompanyAndPagination(
    location: string,
    occupation: string,
    limit: number,
    page: number,
    company: string,
  ): Promise<Pagination<SalaryEntity>> {
    const queryBuilder = await this.salaryRepository
      .createQueryBuilder('salary')
      .where('lower(salary.location) = :location', {
        location: location.toLowerCase(),
      })
      .andWhere('lower(salary.occupation) = :occupation', {
        occupation: occupation.toLowerCase(),
      })
      .andWhere('lower(salary.company) like :company', {
        company: `%${company.toLowerCase()}%`,
      })
      .orderBy('salary.updatedAt', 'DESC');

    return paginate<SalaryEntity>(queryBuilder, { limit, page });
  }

  async getRelatedSalaries(
    location: string,
    occupation: string,
    currentSalaries: SalaryEntity[],
  ): Promise<SalaryEntity[]> {
    const query = await this.salaryRepository
      .createQueryBuilder('salary')
      .where('salary.location like :location', { location: `%${location}%` })
      .andWhere('salary.occupation like :occupation', {
        occupation: `%${occupation}%`,
      })
      .orderBy('salary.updatedAt', 'DESC');

    currentSalaries.map((salary, index) => {
      query.andWhere(`salary.id = :salaryId${index}`, {
        [`salaryId${index}`]: salary.id,
      });
    });

    return await query.getMany();
  }

  async parseSalariesAmount(
    to: string,
    salariesToParse: SalaryEntity[],
  ): Promise<SalaryEntity[]> {
    return await Promise.all(
      salariesToParse.map(async (salary) => {
        const currencyConverter = new CC({
          from: salary.currency,
          to,
          amount: Number(salary.amount),
        });
        try {
          const salaryAmountWithCurrencyRequired =
            await currencyConverter.convert();
          return { ...salary, amount: salaryAmountWithCurrencyRequired };
        } catch (err) {
          return salary;
        }
      }),
    );
  }

  getLastUpdateSalary(salaries: SalaryEntity[]): string {
    return salaries[0].updatedAt;
  }

  calculateAverageBasePay(salaries: SalaryEntity[]): number {
    return (
      salaries
        .map((salary) => salary.amount)
        .reduce((a, b) => {
          return a + b;
        }, 0) / salaries.length
    );
  }

  convertAllSalariesMonthlyInterval(salaries: SalaryEntity[]): SalaryEntity[] {
    return salaries.map((salary) => {
      switch (salary.interval) {
        case JobInterval.ANNUALY:
          return {
            ...salary,
            amount: Number((salary.amount / 12).toFixed(2)),
            interval: JobInterval.MONTHLY,
          };

        case JobInterval.PER_HOUR:
          return {
            ...salary,
            amount: Number((salary.amount * 8 * 4).toFixed(2)),
            interval: JobInterval.MONTHLY,
          };

        default:
          return salary;
      }
    });
  }

  getLowerAndHigherSalary(salaries: SalaryEntity[]): {
    lowerSalary: number;
    higherSalary: number;
  } {
    const salariesAmount = salaries.map((salary) => salary.amount);
    const lowerSalary = Math.min(...salariesAmount);
    const higherSalary = Math.max(...salariesAmount);
    return { lowerSalary, higherSalary };
  }

  async getLastFiveSalaries(userId: number): Promise<SalaryEntity[]> {
    return await this.salaryRepository
      .createQueryBuilder('salary')
      .where('salary.userId = :userId', { userId })
      .orderBy('salary.createdAt', 'DESC')
      .limit(5)
      .getMany();
  }

  getConfidenceResult(salaries: SalaryEntity[]): ConfidenceResult {
    const quantitySalaries = salaries.length;
    if (quantitySalaries < 10) return ConfidenceResult.LOW_CONFIDENCE;
    if (quantitySalaries < 20) return ConfidenceResult.MEDIUM_CONFIDENCE;
    return ConfidenceResult.HIGH_CONFIDENCE;
  }
}
