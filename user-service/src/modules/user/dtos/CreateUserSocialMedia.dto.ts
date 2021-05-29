import { IsNotEmpty, IsString } from 'class-validator';
import { RegisterDto } from 'src/common/dtos/register.dto';

export class CreateUserSocialMediaDto extends RegisterDto {
  @IsString()
  @IsNotEmpty()
  externalId: string;
}
