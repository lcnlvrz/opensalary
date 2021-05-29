import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateLocalRegisterDto } from './dtos/CreateLocalRegister.dto';
import { LocalRegisterEntity } from './local-register.entity';
import { LocalRegisterRepository } from './local-register.repository';

@Injectable()
export class LocalRegisterService {
  constructor(
    private readonly localRegisterRepository: LocalRegisterRepository,
  ) {}

  async create(dto: CreateLocalRegisterDto): Promise<LocalRegisterEntity> {
    const localRegister = this.localRegisterRepository.create(dto);
    localRegister.password = await hash(dto.password, 15);
    return await this.localRegisterRepository.save(localRegister);
  }
}
