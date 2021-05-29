import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSocialMediaRegisterDto {
  @IsString()
  @IsNotEmpty()
  externalId: string;
}
