import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaRegisterRepository } from './social-media-register.repository';
import { SocialMediaRegisterService } from './social-media-register.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocialMediaRegisterRepository])],
  providers: [SocialMediaRegisterService],
  exports: [SocialMediaRegisterService],
})
export class SocialMediaRegisterModule {}
