import { IsNotEmpty, IsString } from 'class-validator';
import { RegisterDto } from 'src/common/dtos/register.dto';

export class CreateUserLocalDto extends RegisterDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
