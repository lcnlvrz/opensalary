import { Entity, EntityRepository, Repository } from 'typeorm';
import { SocialMediaRegisterEntity } from './social-media-register.entity';

@EntityRepository(SocialMediaRegisterEntity)
export class SocialMediaRegisterRepository extends Repository<SocialMediaRegisterEntity> {}
