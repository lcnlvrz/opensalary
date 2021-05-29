import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ReqUser } from '../auth/decorator/auth.decorator';
import { LocalRegisterService } from '../local-register/local-register.service';
import { SocialMediaRegisterService } from '../social-media-register/social-media-register.service';
import { CreateUserLocalDto } from './dtos/CreateUserLocal.dto';
import { CreateUserSocialMediaDto } from './dtos/CreateUserSocialMedia.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly localRegisterService: LocalRegisterService,
    private readonly socialMediaRegisterService: SocialMediaRegisterService,
    private readonly authService: AuthService,
  ) {}

  @Post('local')
  async executeLocalUser(
    @Body() dto: CreateUserLocalDto,
  ): Promise<{ user: UserEntity; accessToken: string }> {
    let user = await this.userService.findUserByEmail(dto.email);
    if (!user) {
      const localRegister = await this.localRegisterService.create({
        password: dto.password,
      });
      user = await this.userService.createUserLocal(dto, localRegister);
    } else if (user.socialMediaRegister) {
      throw new ConflictException({
        code: 'user_already_exist',
        detail: 'The user provided already exist',
      });
    } else {
      const isPasswordValid = await this.userService.validateUser(
        user,
        dto.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException({
          code: 'bad_credentials',
          detail: 'The credentials provided are invalid',
        });
      }
    }
    delete user.localRegister.password;
    const accessToken = this.authService.login(user);
    return { user, accessToken };
  }

  @Post('social-media')
  async executeSocialMedia(
    @Body() dto: CreateUserSocialMediaDto,
  ): Promise<{ user: UserEntity; accessToken: string }> {
    const userStored = await this.userService.findUserByEmail(dto.email);
    if (!userStored) {
      const socialMediaRegister = await this.socialMediaRegisterService.create({
        externalId: dto.externalId,
      });
      const userCreated = await this.userService.createUserSocialMedia(
        dto,
        socialMediaRegister,
      );
      const accessToken = this.authService.login(userCreated);
      return { user: userCreated, accessToken };
    } else {
      if (userStored.localRegister) delete userStored.localRegister.password;
      const accessToken = this.authService.login(userStored);
      return { user: userStored, accessToken };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async executeCreateSocialMedia(
    @ReqUser() user: UserEntity,
  ): Promise<UserEntity> {
    if (user.localRegister) delete user.localRegister.password;
    return user;
  }
}
