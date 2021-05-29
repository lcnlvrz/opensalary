import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export abstract class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
