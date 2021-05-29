import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'user-only-social-media-register', async: true })
@Injectable()
export class UserOnlySocialMediaRegister
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  async validate(email: string): Promise<boolean> {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (user.socialMediaRegister) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'User already registered with some social media';
  }
}
