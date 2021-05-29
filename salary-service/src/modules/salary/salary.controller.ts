import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JobInterval } from 'src/source-of-truth/intervals';
import { ReqUser, UserPayloadDto } from '../auth/decorators/req-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateSalaryDto } from './dtos/create-salary.dto';
import {
  GetSalariesInputDto,
  GetSalariesOutputDto,
} from './dtos/get-salaries.dto';
import { SalaryEntity } from './salary.entity';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @UseGuards(JwtGuard)
  @Post()
  async executeCreateSalaryService(
    @Body() dto: CreateSalaryDto,
    @ReqUser() payload: UserPayloadDto,
  ): Promise<SalaryEntity> {
    return await this.salaryService.createSalary(dto, payload.userId);
  }

  @UseGuards(JwtGuard)
  @Get()
  async executeGetSalaries(
    @Query() query: GetSalariesInputDto,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<GetSalariesOutputDto> {
    const salaries =
      await this.salaryService.getManySalariesByOccupationLocationAndPagination(
        query.location,
        query.occupation,
        limit,
        page,
      );
    if (!salaries.items.length)
      throw new NotFoundException({
        code: 'not_found_salaries',
        detail: 'Your search did not match with any results',
      });
    const salariesWithSameCurrency =
      await this.salaryService.parseSalariesAmount(
        query.currency,
        salaries.items,
      );
    const salariesParsed = this.salaryService.convertAllSalariesMonthlyInterval(
      salariesWithSameCurrency,
    );
    const quantitySalaries = salariesParsed.length;
    const lastUpdate = this.salaryService.getLastUpdateSalary(salariesParsed);
    const averageBasePay =
      this.salaryService.calculateAverageBasePay(salariesParsed);
    const { higherSalary, lowerSalary } =
      this.salaryService.getLowerAndHigherSalary(salariesParsed);
    const confidenceResult =
      this.salaryService.getConfidenceResult(salariesParsed);
    return {
      occupation: query.occupation,
      averageBasePay,
      currency: query.currency,
      lowerSalary,
      higherSalary,
      meta: salaries.meta,
      interval: JobInterval.MONTHLY,
      lastUpdate,
      location: query.location,
      quantitySalaries,
      salaries: salariesParsed,
      confidenceResult,
    };
  }

  @UseGuards(JwtGuard)
  @Get('pagination')
  async executeGetSalariesByPagination(
    @Query() query: GetSalariesInputDto,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('company') company: string,
  ): Promise<Pagination<SalaryEntity>> {
    return await this.salaryService.getManySalariesByOccupationLocationCompanyAndPagination(
      query.location,
      query.occupation,
      limit,
      page,
      company,
    );
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async executeGetLastFiveOwnSalaries(
    @ReqUser() payload: UserPayloadDto,
  ): Promise<SalaryEntity[]> {
    return await this.salaryService.getLastFiveSalaries(payload.userId);
  }
}
