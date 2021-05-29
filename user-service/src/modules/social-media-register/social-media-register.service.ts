import { Injectable } from '@nestjs/common';
import { CreateSocialMediaRegisterDto } from './dtos/CreateSocialMediaRegister.dto';
import { SocialMediaRegisterEntity } from './social-media-register.entity';
import { SocialMediaRegisterRepository } from './social-media-register.repository';

@Injectable()
export class SocialMediaRegisterService {
  constructor(
    private readonly socialMediaRegisterRepository: SocialMediaRegisterRepository,
  ) {}

  async create(
    dto: CreateSocialMediaRegisterDto,
  ): Promise<SocialMediaRegisterEntity> {
    const socialMediaRegister = this.socialMediaRegisterRepository.create(dto);
    return await this.socialMediaRegisterRepository.save(socialMediaRegister);
  }
}
