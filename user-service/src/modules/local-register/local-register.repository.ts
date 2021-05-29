import { EntityRepository, Repository } from 'typeorm';
import { LocalRegisterEntity } from './local-register.entity';

@EntityRepository(LocalRegisterEntity)
export class LocalRegisterRepository extends Repository<LocalRegisterEntity> {}
