import { IsString } from 'class-validator';

export class LoginReqDto {
  @IsString()
  identifier: string;

  @IsString()
  password: string;
}