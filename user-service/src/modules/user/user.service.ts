import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { LocalRegisterEntity } from '../local-register/local-register.entity';
import { SocialMediaRegisterEntity } from '../social-media-register/social-media-register.entity';
import { CreateUserLocalDto } from './dtos/CreateUserLocal.dto';
import { CreateUserSocialMediaDto } from './dtos/CreateUserSocialMedia.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUserLocal(
    dto: CreateUserLocalDto,
    localRegister: LocalRegisterEntity,
  ): Promise<UserEntity> {
    const user = this.userRepository.create(dto);
    user.localRegister = localRegister;
    return await this.userRepository.save(user);
  }

  async createUserSocialMedia(
    dto: CreateUserSocialMediaDto,
    socialMediaRegister: SocialMediaRegisterEntity,
  ): Promise<UserEntity> {
    const user = this.userRepository.create(dto);
    user.socialMediaRegister = socialMediaRegister;
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .leftJoinAndSelect('user.socialMediaRegister', 'socialMedia')
      .leftJoinAndSelect('user.localRegister', 'local')
      .getOne();
  }

  async findUserById(id: number): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.socialMediaRegister', 'socialMedia')
      .leftJoinAndSelect('user.localRegister', 'local')
      .getOne();
  }

  async validateUser(user: UserEntity, password: string): Promise<boolean> {
    return await compare(password, user.localRegister.password);
  }
}
