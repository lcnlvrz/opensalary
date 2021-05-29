import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalRegisterRepository } from './local-register.repository';
import { LocalRegisterService } from './local-register.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalRegisterRepository])],
  providers: [LocalRegisterService],
  exports: [LocalRegisterService],
})
export class LocalRegisterModule {}
