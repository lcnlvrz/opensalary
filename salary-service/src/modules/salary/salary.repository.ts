import { EntityRepository, Repository } from 'typeorm';
import { SalaryEntity } from './salary.entity';

@EntityRepository(SalaryEntity)
export class SalaryRepository extends Repository<SalaryEntity> {}
