import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocalRegisterDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
