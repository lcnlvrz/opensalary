import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryController } from './salary.controller';
import { SalaryRepository } from './salary.repository';
import { SalaryService } from './salary.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalaryRepository])],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}
